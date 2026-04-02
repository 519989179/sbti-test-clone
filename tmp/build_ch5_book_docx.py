import os, re, zipfile
from xml.sax.saxutils import escape

SRC_MD = '/Users/zhaiyongqiang/.openclaw/workspace/一个人就是一个团队/02-章节稿/第5章/第5章-变现闭环——一个人如何完成“从流量到收入”的最后一跃.md'
TEMPLATE_DOCX = '/Users/zhaiyongqiang/.openclaw/workspace/一个人就是一个团队/02-章节稿/第5章/第5章-变现闭环——一个人如何完成“从流量到收入”的最后一跃.docx'
OUT_DOCX = '/Users/zhaiyongqiang/.openclaw/workspace/一个人就是一个团队/02-章节稿/第5章/第5章-变现闭环——一个人如何完成“从流量到收入”的最后一跃-出书排版版.docx'

with open(SRC_MD, 'r', encoding='utf-8') as f:
    lines = f.read().splitlines()

blocks = []
buf = []

def flush_para():
    global buf
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

W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
XMLNS = 'xmlns:w="%s"' % W


def run_props(font='宋体', east='宋体', size=24, bold=False, italic=False):
    parts = ['<w:rPr>', f'<w:rFonts w:ascii="{font}" w:hAnsi="{font}" w:eastAsia="{east}" w:cs="{font}"/>', f'<w:sz w:val="{size}"/>', f'<w:szCs w:val="{size}"/>']
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
        runs = parse_bold_runs(text, font='楷体', east='楷体', size=22, italic=False)
    elif kind == 'h1':
        ppr = '<w:pPr><w:spacing w:before="220" w:after="120" w:line="360" w:lineRule="auto"/><w:outlineLvl w:val="0"/></w:pPr>'
        runs = parse_bold_runs(text, font='黑体', east='黑体', size=28, bold=True)
    elif kind == 'h2':
        ppr = '<w:pPr><w:spacing w:before="160" w:after="80" w:line="360" w:lineRule="auto"/><w:outlineLvl w:val="1"/></w:pPr>'
        runs = parse_bold_runs(text, font='黑体', east='黑体', size=24, bold=True)
    elif kind == 'bullet':
        ppr = '<w:pPr><w:ind w:left="420" w:hanging="210"/><w:spacing w:before="0" w:after="0" w:line="420" w:lineRule="auto"/></w:pPr>'
        runs = f'<w:r>{run_props(font="宋体", east="宋体", size=24, bold=False)}<w:t>• </w:t></w:r>' + parse_bold_runs(text, font='宋体', east='宋体', size=24)
    else:
        ppr = '<w:pPr><w:ind w:firstLine="420"/><w:spacing w:before="0" w:after="0" w:line="420" w:lineRule="auto"/></w:pPr>'
        runs = parse_bold_runs(text, font='宋体', east='宋体', size=24)
    return f'<w:p>{ppr}{runs}</w:p>'

body_parts = [paragraph(text, kind) for kind, text in blocks]
sect = (
    '<w:sectPr>'
    '<w:pgSz w:w="11906" w:h="16838"/>'
    '<w:pgMar w:top="1440" w:right="1800" w:bottom="1440" w:left="1800" w:header="708" w:footer="708" w:gutter="0"/>'
    '<w:cols w:space="425"/>'
    '<w:docGrid w:linePitch="312"/>'
    '</w:sectPr>'
)

document_xml = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    f'<w:document {XMLNS}>'
    '<w:body>' + ''.join(body_parts) + sect + '</w:body></w:document>'
)

os.makedirs(os.path.dirname(OUT_DOCX), exist_ok=True)
with zipfile.ZipFile(TEMPLATE_DOCX, 'r') as zin, zipfile.ZipFile(OUT_DOCX, 'w', zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename == 'word/document.xml':
            data = document_xml.encode('utf-8')
        zout.writestr(item, data)

print(OUT_DOCX)
print('blocks=', len(blocks))
