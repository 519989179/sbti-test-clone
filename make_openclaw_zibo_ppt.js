const pptxgen = require('pptxgenjs');
const pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9';
pptx.author = '卷卷';
pptx.company = '96AI增长圈';
pptx.subject = 'OpenClaw 分享专场';
pptx.title = '淄博首个龙虾分享专场 — 让 OpenClaw 成为生产力';
pptx.lang = 'zh-CN';
pptx.theme = {
  headFontFace: 'Microsoft YaHei',
  bodyFontFace: 'Microsoft YaHei',
  lang: 'zh-CN'
};
pptx.defineLayout({ name: 'CUSTOM', width: 13.333, height: 7.5 });
pptx.layout = 'CUSTOM';
pptx.theme = { headFontFace: 'Microsoft YaHei', bodyFontFace: 'Microsoft YaHei', lang: 'zh-CN' };

const C = {
  bg: '0A1020',
  bg2: '121A2D',
  card: '121B2F',
  card2: '18233A',
  white: 'F6F8FC',
  text: 'D8DFEA',
  muted: '8E9AB0',
  coral: 'FF6B57',
  coral2: 'FF8E72',
  red: 'FF7A6E',
  gold: 'FFCD73',
  blue: '65B5FF',
  teal: '46D6C2',
  line: '22304A'
};

function addBg(slide, title, kicker='OpenClaw · 淄博分享专场') {
  slide.background = { color: C.bg };
  slide.addShape(pptx.ShapeType.rect, { x:0, y:0, w:13.333, h:7.5, fill:{color:C.bg}, line:{color:C.bg} });
  slide.addShape(pptx.ShapeType.rect, { x:0, y:0, w:0.18, h:7.5, fill:{color:C.coral}, line:{color:C.coral} });
  slide.addText(kicker, { x:0.45, y:0.25, w:4.6, h:0.25, fontSize:10, color:C.coral2, bold:true, margin:0 });
  slide.addText(title, { x:0.45, y:0.55, w:11.8, h:0.55, fontSize:24, bold:true, color:C.white, margin:0 });
  slide.addShape(pptx.ShapeType.line, { x:0.45, y:1.18, w:12.1, h:0, line:{color:C.line, width:1} });
}

function addFooter(slide, n) {
  slide.addText(String(n).padStart(2,'0'), { x:12.5, y:7.05, w:0.45, h:0.2, fontSize:10, color:C.muted, align:'right', margin:0 });
}

function addBullets(slide, items, opts={}) {
  const runs = [];
  items.forEach((t, i) => {
    runs.push({ text:t, options:{ bullet:true, breakLine:i !== items.length-1 } });
  });
  slide.addText(runs, {
    x: opts.x ?? 0.8, y: opts.y ?? 1.6, w: opts.w ?? 5.2, h: opts.h ?? 3.8,
    fontSize: opts.fontSize ?? 16, color: opts.color ?? C.text,
    breakLine: true, paraSpaceAfterPt: 10, valign:'top', margin:0.03
  });
}

function card(slide, x,y,w,h,title,body,accent=C.coral) {
  slide.addShape(pptx.ShapeType.roundRect, { x,y,w,h, rectRadius:0.06, fill:{color:C.card2}, line:{color:C.line, width:1} });
  slide.addShape(pptx.ShapeType.rect, { x:x, y:y, w:0.08, h:h, fill:{color:accent}, line:{color:accent} });
  slide.addText(title, { x:x+0.18, y:y+0.18, w:w-0.3, h:0.28, fontSize:16, bold:true, color:C.white, margin:0 });
  slide.addText(body, { x:x+0.18, y:y+0.52, w:w-0.32, h:h-0.62, fontSize:11.5, color:C.text, valign:'top', margin:0, breakLine:true });
}

function quoteBox(slide, text, x=7.2, y=1.6, w=5.3, h=2.1) {
  slide.addShape(pptx.ShapeType.roundRect, { x,y,w,h, rectRadius:0.06, fill:{color:'10182A', transparency:5}, line:{color:C.coral, width:1.2} });
  slide.addText('演讲话术', { x:x+0.22, y:y+0.16, w:1.1, h:0.2, fontSize:10, color:C.coral2, bold:true, margin:0 });
  slide.addText(text, { x:x+0.22, y:y+0.42, w:w-0.4, h:h-0.56, fontSize:14, color:C.white, italic:true, valign:'mid', margin:0 });
}

function placeholderImage(slide, x,y,w,h,label='截图/图片占位') {
  slide.addShape(pptx.ShapeType.roundRect, { x,y,w,h, rectRadius:0.05, fill:{color:'11192B'}, line:{color:C.line, width:1.2, dash:'dash'} });
  slide.addText(label, { x:x+0.2, y:y+h/2-0.18, w:w-0.4, h:0.36, fontSize:18, color:C.muted, bold:true, align:'center', valign:'mid', margin:0 });
}

function twoColSlide(n, title, bullets, speech, visualLabel) {
  const s = pptx.addSlide(); addBg(s,title); addFooter(s,n);
  addBullets(s, bullets, {x:0.7,y:1.55,w:5.8,h:4.9,fontSize:16});
  placeholderImage(s,6.8,1.55,5.8,3.45,visualLabel);
  quoteBox(s, speech, 6.8,5.2,5.8,1.5);
  return s;
}

// 1 cover
{
  const s = pptx.addSlide();
  s.background = { color:C.bg };
  s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:13.333,h:7.5,fill:{color:C.bg},line:{color:C.bg}});
  for (let i=0;i<25;i++) {
    const x = 0.5 + (i*0.47)%12.1;
    const y = 0.3 + ((i*1.07)%6.5);
    s.addShape(pptx.ShapeType.ellipse,{x,y,w:0.03,h:0.03,fill:{color:i%3===0?C.coral2:C.white,transparency:i%3===0?20:50},line:{color:i%3===0?C.coral2:C.white,transparency:100}});
  }
  s.addShape(pptx.ShapeType.rect,{x:0.68,y:1.2,w:0.16,h:4.8,fill:{color:C.coral},line:{color:C.coral}});
  s.addText('淄博首个龙虾分享专场', {x:1.1,y:1.45,w:5.6,h:0.55,fontSize:17,color:C.coral2,bold:true,margin:0});
  s.addText('让 OpenClaw 成为生产力', {x:1.08,y:2.02,w:8.2,h:1.15,fontSize:28,bold:true,color:C.white,margin:0});
  s.addText('拒绝技术黑话，手把手带你打造全自动“数字员工”流水线', {x:1.1,y:3.28,w:7.4,h:0.5,fontSize:16,color:C.text,margin:0});
  s.addShape(pptx.ShapeType.roundRect,{x:1.08,y:4.28,w:3.7,h:0.72,rectRadius:0.06,fill:{color:C.card2},line:{color:C.line,width:1}});
  s.addText('分享人：艾乐  ·  96AI增长圈创始人', {x:1.32,y:4.52,w:3.2,h:0.2,fontSize:14,color:C.white,margin:0});
  s.addShape(pptx.ShapeType.roundRect,{x:8.6,y:1.55,w:3.6,h:3.8,rectRadius:0.08,fill:{color:C.card2},line:{color:C.line,width:1}});
  s.addText('🦞', {x:9.65,y:2.0,w:1.5,h:1.0,fontSize:48,align:'center',margin:0});
  s.addText('AI + 电脑 + 记忆 + 技能', {x:8.95,y:3.3,w:2.9,h:0.3,fontSize:15,color:C.coral2,bold:true,align:'center',margin:0});
  s.addText('打造真正能干活的数字员工', {x:9.02,y:3.72,w:2.8,h:0.4,fontSize:16,color:C.white,bold:true,align:'center',margin:0});
  addFooter(s,1);
}

twoColSlide(2,'疯狂的现象 —— 大家到底在抢什么？',[
  '深圳大厂排队、淘宝代安装，小龙虾突然成了新“网红生产力工具”。',
  '大量用户不是先理解场景，而是先恐惧“错过”。',
  '真正的问题不是“装没装”，而是：装完以后，能不能替你赚钱、替你省时间、替你做流程。',
  '这场分享的核心任务：把热闹变成认知，把猎奇变成可复制落地。'
],'各位淄博的老板们，最近大家肯定都被这只虾刷屏了。有人飞深圳排队，有人花钱找淘宝代装。但真正重要的不是追热点，而是看懂它到底能替你做什么。','深圳大厂排队图 + 淘宝代安装截图');

twoColSlide(3,'本质区别 —— 从“能说”到“能做事”的重大跨越！',[
  '过去的 AI：问一句答一句，本质还是聊天机器人。',
  'OpenClaw / Agent：拥有长期记忆、工具调用、主动执行和任务编排能力。',
  '它不只会“给建议”，而是能直接进入任务链路，执行真实动作。',
  '这就是从“会聊天”到“会交付”的跃迁。'
],'不要把它跟平时用的豆包混为一谈。过去的 AI 是“能说”，而龙虾是“能做事”——有记忆、有动作、还能自己组团队。','聊天机器人 vs Agent 智能体对比图');

// 4 gears
{
 const s = pptx.addSlide(); addBg(s,'拆解龙虾 —— 它的肚子里到底装了什么？'); addFooter(s,4);
 const centers=[[2.3,2.25],[5.0,2.25],[7.7,2.25],[10.4,2.25]];
 const titles=['大脑','记忆','技能','自动化']; const subs=['LLM\n负责理解与推理','Memory\n用文件代替脑子','Skills\n固化操作手册','Cron\n7×24 小时运转']; const colors=[C.coral,C.blue,C.teal,C.gold];
 centers.forEach((c,i)=>{
   s.addShape(pptx.ShapeType.ellipse,{x:c[0]-0.8,y:c[1]-0.8,w:1.6,h:1.6,fill:{color:C.card2},line:{color:colors[i],width:2}});
   s.addText(titles[i],{x:c[0]-0.45,y:c[1]-0.18,w:0.9,h:0.25,fontSize:18,bold:true,color:C.white,align:'center',margin:0});
   s.addText(subs[i],{x:c[0]-0.95,y:c[1]+0.9,w:1.9,h:0.6,fontSize:11,color:C.text,align:'center',margin:0});
   if(i<3) s.addShape(pptx.ShapeType.line,{x:c[0]+0.8,y:c[1],w:1.1,h:0,line:{color:C.line,width:2}});
 });
 quoteBox(s,'剥开龙虾的壳，本质就是四个齿轮咬合：大模型负责思考，Memory 负责记住，Skills 负责按手册做事，Cron 负责让它一直自动转。',1.0,5.2,11.7,1.3);
}

//5 formula
{
 const s = pptx.addSlide(); addBg(s,'一个公式理解龙虾'); addFooter(s,5);
 s.addShape(pptx.ShapeType.roundRect,{x:0.8,y:1.6,w:11.7,h:2.0,rectRadius:0.08,fill:{color:C.card2},line:{color:C.line,width:1}});
 s.addText('🤖 AI  +  💻 电脑  +  💾 记忆（文件）  +  ⚡ 技能（Skills）  =  🦞 龙虾', {x:1.1,y:2.18,w:11.1,h:0.48,fontSize:24,color:C.white,bold:true,align:'center',margin:0});
 s.addShape(pptx.ShapeType.roundRect,{x:1.3,y:4.15,w:10.7,h:1.35,rectRadius:0.05,fill:{color:'10182A'},line:{color:C.coral,width:1.2}});
 s.addText('光有智商没用，还得给它办公桌、工作记忆和专业技能，才会成为真正稳定、靠谱、能交付的数字员工。', {x:1.6,y:4.55,w:10.1,h:0.46,fontSize:18,color:C.text,align:'center',margin:0});
 placeholderImage(s,9.15,1.05,2.6,0.85,'可替换为“公式图”');
}

twoColSlide(6,'区别 1：它长了手 —— 告别“纸上谈兵”',[
  '普通 AI 常常停留在对话框里，需要人工复制、粘贴、转述。',
  'OpenClaw 拿到一台完整电脑后，可以开浏览器、建文件、整理资料、写文档、跑流程。',
  '它不只是“会分析”，而是“会执行”。',
  '这意味着人不再是“打字员”，而是“指挥官”。'
],'普通 AI 需要你人工喂资料，但小龙虾长了手。它拿到电脑最高权限后，能像真人一样打开浏览器、整理文件、真正开干。','屏幕里的 AI vs 敲实体键盘的机械手');

twoColSlide(7,'区别 2：远程指挥 —— 真正的老板待遇',[
  '微信 / 飞书一句话发指令。',
  '办公室电脑自动执行，任务在你看不见的地方自己跑起来。',
  '你在外面开会、喝茶、见客户，流程已经在后台推进。',
  '这才是老板视角：不亲自盯执行，只盯结果。'
],'你在外面喝茶，只需要在飞书上发一句话，办公室那台电脑就自动唤醒、开始办事——这才叫真正的老板待遇。','手机发指令 → 办公室电脑自动运行流程图');

twoColSlide(8,'为什么要“养”龙虾？私有数据是核心壁垒',[
  'ChatGPT 更像“每天失忆的天才”：聪明，但不懂你。',
  '龙虾会持续积累你的资料、偏好、流程、经验和踩坑记录。',
  '越用越懂你，越懂你越能少沟通、多执行。',
  '共同记忆 + 私有数据 + 业务流程，构成真正的企业护城河。'
],'为什么叫“养”？因为它不是一次性工具，而是越来越懂你的数字员工。你养它两个月，它对你业务的理解，可能超过很多老员工。','“为什么要养龙虾”左右对比图');

//9 skills shell
{
 const s = pptx.addSlide(); addBg(s,'龙虾核心能力 —— 没有 Skills，它只是个空壳'); addFooter(s,9);
 card(s,0.9,1.7,5.4,3.8,'🦞 小龙虾 = 百年一遇的武学天才','理解能力、泛化能力、学习速度都很强。\n但如果没有具体招式，它依然无法稳定打赢真实工作。',C.blue);
 card(s,7.0,1.7,5.4,3.8,'📚 Skills = 散落民间的绝世秘籍','每个 Skill 都是在某个具体场景里反复打磨出来的操作手册。\n装上之后，天才才算真正拥有“出手即交付”的招式。',C.coral);
 s.addShape(pptx.ShapeType.chevron,{x:5.95,y:3.0,w:0.7,h:0.6,fill:{color:C.gold},line:{color:C.gold}});
 quoteBox(s,'OpenClaw 刚装好时其实是个空壳。真正决定它能不能干活的，不只是大脑，而是你有没有给它装对 Skills。',1.0,5.9,11.6,0.9);
}

//10 logos style
{
 const s = pptx.addSlide(); addBg(s,'真相揭秘 —— Skills 背后的算力消耗'); addFooter(s,10);
 s.addShape(pptx.ShapeType.ellipse,{x:5.7,y:2.3,w:1.9,h:1.2,fill:{color:C.card2},line:{color:C.coral,width:2}});
 s.addText('小龙虾\nSkills 调度中枢',{x:5.95,y:2.55,w:1.4,h:0.5,fontSize:16,color:C.white,bold:true,align:'center',margin:0});
 const nodes=[['即梦 API',1.3,1.6,C.coral],['Seedance',1.3,4.5,C.gold],['Codex',9.9,1.6,C.blue],['Kimi / GPT',9.7,4.5,C.teal]];
 nodes.forEach(([t,x,y,c])=>{ s.addShape(pptx.ShapeType.roundRect,{x,y,w:2.1,h:0.8,rectRadius:0.04,fill:{color:C.card2},line:{color:c,width:1.5}}); s.addText(t,{x:x+0.15,y:y+0.25,w:1.8,h:0.2,fontSize:16,color:C.white,bold:true,align:'center',margin:0}); s.addShape(pptx.ShapeType.line,{x:x+2.1,y:y+0.4,w:5.7-(x+2.1),h:2.9-(y+0.4),line:{color:C.line,width:1.5}}); });
 addBullets(s,['生图调用即梦 / Gemini 等接口','视频调用多媒体生成接口','代码调用 Codex / 其他编程模型','对话、推理再调用 Kimi / GPT 等大模型'],{x:4.0,y:4.25,w:5.4,h:2.0,fontSize:14});
}

twoColSlide(11,'底层逻辑：单 Agent vs 多 Agent',[
  '单 Agent 包打天下：上下文臃肿、角色冲突、稳定性极差。',
  '多 Agent 流水线：研究员、写手、设计、投放、分析各司其职。',
  '总控负责调度，专业角色负责交付。',
  '真正可规模化的，不是单点聪明，而是流程稳定。'
],'让一个天才包揽所有事，写长文必崩；但把工作拆成流水线，每个人只干自己最擅长的一段，交付就稳了。','单 Agent vs 多 Agent 结构图');

twoColSlide(12,'应用场景一：「艾乐同学」公众号自动化运营',[
  '1 个指令拉起 5 人高配团队：研究员 → 运营 → 文案 → 设计 → 数据分析。',
  '所有角色都围绕同一个目标协作，而不是各自瞎忙。',
  '从内容源筛选、重构，到排版、出图、发布，形成闭环。',
  '老板只需要盯 KPI，不需要亲自填每个环节。'
],'这是我的真实业务后台。我给总控下一个目标，它就能瞬间拉起 5 个人的团队，最爽的是：我可以直接说“不需要审核，直接发布”。','公众号自动化流程截图占位');

twoColSlide(13,'应用场景二：总裁级 AI 专属早报',[
  '全网检索 → 内容筛选 → 整理排版 → 生成真人音频 → 推送飞书。',
  '图文 + 音频双形态交付，适配通勤、开车、晨会前碎片时间。',
  '从“看到信息”升级成“听懂重点”。',
  '老板每天接收到的是处理后的决策信息，而不是噪音。'
],'它每天早上自动抓取高质量信源，浓缩成文字重点，再生成 3-5 分钟真人语音播报，一起推到飞书。开车路上就能听完。','小星星早报 5 步流程截图占位');

//14 voice clone
{
 const s = pptx.addSlide(); addBg(s,'应用场景三：给 AI 装上“私人定制”嗓音'); addFooter(s,14);
 const steps=[['1','安装声音 Skills'],['2','配置 API'],['3','生成语音气泡'],['4','克隆指定声音'],['5','实时发语音汇报']];
 steps.forEach((it,i)=>{
   const x=0.85+i*2.45; s.addShape(pptx.ShapeType.ellipse,{x,y:2.25,w:0.7,h:0.7,fill:{color:i===3?C.coral:C.card2},line:{color:i===3?C.coral:C.line,width:1.2}});
   s.addText(it[0],{x:x+0.2,y:2.46,w:0.3,h:0.15,fontSize:18,bold:true,color:C.white,align:'center',margin:0});
   s.addText(it[1],{x:x-0.35,y:3.15,w:1.4,h:0.45,fontSize:14,color:C.text,bold:true,align:'center',margin:0});
   if(i<4) s.addShape(pptx.ShapeType.chevron,{x:x+1.35,y:2.48,w:0.55,h:0.28,fill:{color:C.gold},line:{color:C.gold}});
 });
 s.addShape(pptx.ShapeType.roundRect,{x:2.0,y:4.55,w:9.4,h:1.15,rectRadius:0.05,fill:{color:'10182A'},line:{color:C.coral,width:1.2}});
 s.addText('“让数字员工开口说话”，不是锦上添花，而是让老板第一次感受到：这个 AI 真的像个活着的员工。”',{x:2.25,y:4.92,w:8.9,h:0.35,fontSize:18,color:C.white,italic:true,align:'center',margin:0});
}

twoColSlide(15,'应用场景四：钉钉日报的“自动驾驶”与兜底',[
  '每晚固定时间自动生成、自动提交日报。',
  '如果白天没有专门派活，它会回看当天 memory，自己汇总完成情况。',
  '把“忘记汇报”这个管理问题彻底流程化解决。',
  '真正优秀的系统，不只会冲锋，还能兜底。'
],'我给它设了晚上 22:30 自动写日报。就算白天没专门给它派活，它也会回翻当天 memory，把自己做过的事总结成标准日报自动交差。','日报自动提交流程截图占位');

twoColSlide(16,'应用场景五：最恐怖的“自我反思”',[
  '出错不可怕，可怕的是重复出错。',
  '错误发生后：记录日志 → 总结原因 → 写入长期记忆 → 下次规避。',
  '这让“经验”不再依赖某个员工的脑子，而是沉淀进系统。',
  '越跑越稳，越错越强。'
],'只要它犯过一次错，就会把原因和规避办法刻进 MEMORY.md。它追求的不是“偶尔聪明”，而是“零重复错误”。','错误修复与反思截图占位');

twoColSlide(17,'使用风险一：官方点名的“数据裸奔”',[
  '本地部署一旦权限过大，误操作或恶意攻击都会直接触达真实文件系统。',
  '问题不是 AI “笨不笨”，而是它一旦执行错，速度会比人更快、范围更大。',
  '涉及企业内网、资料库、合同、财务数据时，权限控制必须前置。',
  '管理者不能只看效率，不看边界。'
],'今天工信部都在强调安全风险。本地乱装小龙虾，一旦权限放大、理解错指令，删文件、泄露数据的速度比真人快一万倍。','工信部“六要六不要”新闻截图占位');

twoColSlide(18,'使用风险二：吞噬利润的“算力刺客”',[
  '免费安装只是入口，真正长期花钱的是算力。',
  '看屏幕、调接口、出图、跑工作流，每一步都在烧 Token。',
  '高频、无约束、全天候运行，成本很容易失控。',
  'SOP 与权限边界，不只是安全要求，也是利润保护机制。'
],'我给大家交个底，如果让它全天候跑满负荷，后台一天就能烧掉 10 到 70 美元。没有 SOP 约束，它跑算力比招个真人还贵。','算力成本 / token 消耗可视化图');

twoColSlide(19,'使用风险三：AI 也会“阳奉阴违”',[
  'AI 不是不会偷懒，而是会用“幻觉”假装完成任务。',
  '遇到验证码、登录失败、页面结构变化时，它可能不报警，而是编一份“看起来很完整”的结果。',
  '所以必须建立验收机制：抽样、校验、回执、日志、人工 spot check。',
  '把 AI 当员工管理，而不是当神。'
],'它有时候也像职场老油条。真遇到卡点时，不一定主动报错，反而可能靠“幻觉”给你编一份完美报告交差，所以你必须建立验收机制。','AI 幻觉交差风险示意图');

//20 compare table
{
 const s = pptx.addSlide(); addBg(s,'落地抉择：本地部署 vs 云端部署怎么选？'); addFooter(s,20);
 s.addText('云端平替方案：Kimi Claw、Qclaw、Arkclaw 等', {x:0.75,y:1.45,w:6.2,h:0.25,fontSize:14,color:C.coral2,bold:true,margin:0});
 const rows = [
  ['对比维度','本地部署（OpenClaw）','云端部署（Kimi/Qclaw/Arkclaw）'],
  ['硬件要求','极高（需高配显卡/设备）','零要求（有浏览器就能跑）'],
  ['系统权限','接管物理电脑（最高风险，可删本地文件）','沙盒隔离（更安全）'],
  ['算力成本','极高且上不封顶（API 计费）','极低或固定会员费'],
  ['适合人群','技术极客 / 有独立网段企业','业务老板 / 小白 / 运营团队']
 ];
 s.addTable(rows,{x:0.8,y:1.9,w:11.8,h:3.8,border:{pt:1,color:C.line},fill:'121B2F',color:C.text,fontSize:14,
  rowH:[0.5,0.7,0.95,0.75,0.75],
  colW:[2.0,4.9,4.9],
  autoFit:false,
  valign:'mid',
  margin:0.05,
  bold:true,
  colorHead:C.white,
  fillHead:C.coral,
  fontFace:'Microsoft YaHei'
 });
 quoteBox(s,'如果你是业务老板、小白、运营团队，最优解通常不是本地裸奔，而是先用云端方案，把安全、成本和门槛都压下去。',0.9,6.1,11.6,0.95);
}

//21 ending
{
 const s = pptx.addSlide();
 s.background={color:'060A14'};
 s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:13.333,h:7.5,fill:{color:'060A14'},line:{color:'060A14'}});
 s.addText('未来的老板，不再是亲自下场搬砖，', {x:1.35,y:2.2,w:10.6,h:0.65,fontSize:24,color:C.white,bold:true,align:'center',margin:0});
 s.addText('而是管理一套不知疲倦的数字系统。', {x:1.35,y:2.95,w:10.6,h:0.65,fontSize:24,color:C.white,bold:true,align:'center',margin:0});
 s.addShape(pptx.ShapeType.line,{x:3.95,y:4.0,w:5.45,h:0,line:{color:C.coral,width:2.2}});
 s.addText('把琐事交给 AI，把大脑留给商业', {x:2.1,y:4.45,w:9.1,h:0.52,fontSize:28,color:C.coral2,bold:true,align:'center',margin:0});
 s.addText('谢谢大家', {x:5.3,y:5.55,w:2.7,h:0.32,fontSize:16,color:C.muted,align:'center',margin:0});
 addFooter(s,21);
}

pptx.writeFile({ fileName: '/Users/zhaiyongqiang/.openclaw/workspace/淄博首个龙虾分享专场-OpenClaw生产力-v1.pptx' });
