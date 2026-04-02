import argparse
import os
import re
import zipfile
from xml.sax.saxutils import escape

W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
XMLNS = 'xmlns:w="%s"' % W


def parse_markdown(md_path):
    with open(md_path, 'r', encoding='utf-8') as f:
        lines = f.read().splitlines()

    blocks = []
    buf = []

    def flush_para():
        nonlocal buf
        if buf:
            text = ''.join(s.strip() for s in buf if s.strip())
            if text:
                blocks.append(('p', text))
            buf = []

    for line in lines:
        s = line.rstrip()
        st = s.strip()
        if not st:
            flush_para()
            continue
        if st.startswith('# '):
            flush_para()
            blocks.append(('title', st[2:].strip()))
        elif st.startswith('## '):
            flush_para()
            blocks.append(('h1', st[3:].strip()))
        elif st.startswith('### '):
            flush_para()
            blocks.append(('h2', st[4:].strip()))
        elif st.startswith('- '):
            flush_para()
            blocks.append(('bullet', st[2:].strip()))
        elif st.startswith('**') and st.endswith('**') and st.count('**') == 2:
            flush_para()
            blocks.append(('quote', st[2:-2].strip()))
        else:
            buf.append(st)
    flush_para()
    return blocks


def run_props(font='宋体', east='宋体', size=24, bold=False, italic=False):
    parts = [
        '<w:rPr>',
        f'<w:rFonts w:ascii="{font}" w:hAnsi="{font}" w:eastAsia="{east}" w:cs="{font}"/>',
        f'<w:sz w:val="{size}"/>',
        f'<w:szCs w:val="{size}"/>',
    ]
    if bold:
        parts.append('<w:b/>')
        parts.append('<w:bCs/>')
    if italic:
        parts.append('<w:i/>')
        parts.append('<w:iCs/>')
    parts.append('</w:rPr>')
    return ''.join(parts)


def parse_bold_runs(text, font='宋体', east='宋体', size=24, bold=False, italic=False):
    chunks = re.split(r'(\*\*.*?\*\*)', text)
    out = []
    for ch in chunks:
        if not ch:
            continue
        is_bold = ch.startswith('**') and ch.endswith('**')
        content = ch[2:-2] if is_bold else ch
        if not content:
            continue
        rp = run_props(font=font, east=east, size=size, bold=(bold or is_bold), italic=italic)
        out.append(f'<w:r>{rp}<w:t xml:space="preserve">{escape(content)}</w:t></w:r>')
    return ''.join(out)


def paragraph(text, kind='p'):
    if kind == 'title':
        ppr = '<w:pPr><w:jc w:val="center"/><w:spacing w:before="240" w:after="240" w:line="480" w:lineRule="auto"/></w:pPr>'
        runs = parse_bold_runs(text, font='黑体', east='黑体', size=32, bold=True)
    elif kind == 'quote':
        ppr = '<w:pPr><w:jc w:val="center"/><w:spacing w:before="60" w:after="180" w:line="360" w:lineRule="auto"/></w:pPr>'
        runs = parse_bold_runs(text, font='楷体', east='楷体', size=22)
    elif kind == 'h1':
        ppr = '<w:pPr><w:spacing w:before="220" w:after="120" w:line="360" w:lineRule="auto"/><w:outlineLvl w:val="0"/></w:pPr>'
        runs = parse_bold_runs(text, font='黑体', east='黑体', size=28, bold=True)
    elif kind == 'h2':
        ppr = '<w:pPr><w:spacing w:before="160" w:after="80" w:line="360" w:lineRule="auto"/><w:outlineLvl w:val="1"/></w:pPr>'
        runs = parse_bold_runs(text, font='黑体', east='黑体', size=24, bold=True)
    elif kind == 'bullet':
        ppr = '<w:pPr><w:ind w:left="420" w:hanging="210"/><w:spacing w:before="0" w:after="0" w:line="420" w:lineRule="auto"/></w:pPr>'
        runs = f'<w:r>{run_props(font="宋体", east="宋体", size=24)}<w:t>• </w:t></w:r>' + parse_bold_runs(text, font='宋体', east='宋体', size=24)
    else:
        ppr = '<w:pPr><w:ind w:firstLine="420"/><w:spacing w:before="0" w:after="0" w:line="420" w:lineRule="auto"/></w:pPr>'
        runs = parse_bold_runs(text, font='宋体', east='宋体', size=24)
    return f'<w:p>{ppr}{runs}</w:p>'


def build_document_xml(blocks):
    body_parts = [paragraph(text, kind) for kind, text in blocks]
    sect = (
        '<w:sectPr>'
        '<w:pgSz w:w="11906" w:h="16838"/>'
        '<w:pgMar w:top="1440" w:right="1800" w:bottom="1440" w:left="1800" w:header="708" w:footer="708" w:gutter="0"/>'
        '<w:cols w:space="425"/>'
        '<w:docGrid w:linePitch="312"/>'
        '</w:sectPr>'
    )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        f'<w:document {XMLNS}>'
        '<w:body>' + ''.join(body_parts) + sect + '</w:body></w:document>'
    )


def render(md_path, template_docx, out_docx):
    blocks = parse_markdown(md_path)
    document_xml = build_document_xml(blocks)
    os.makedirs(os.path.dirname(out_docx), exist_ok=True)
    with zipfile.ZipFile(template_docx, 'r') as zin, zipfile.ZipFile(out_docx, 'w', zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename == 'word/document.xml':
                data = document_xml.encode('utf-8')
            zout.writestr(item, data)
    return len(blocks)


def main():
    ap = argparse.ArgumentParser(description='Render markdown into unified book-style docx using an existing docx as shell.')
    ap.add_argument('--md', required=True, help='Absolute path to source markdown file')
    ap.add_argument('--template', required=True, help='Absolute path to template/original docx shell')
    ap.add_argument('--out', required=True, help='Absolute path to output docx')
    args = ap.parse_args()

    count = render(args.md, args.template, args.out)
    print(args.out)
    print(f'blocks= {count}')


if __name__ == '__main__':
    main()
