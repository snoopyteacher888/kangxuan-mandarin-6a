/* 第 10 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'infer', qe: 'infer', qf: 'infer', qg: 'interpret', qh: 'interpret',
      qi: 'evaluate', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qg: { think: ['姐妹們一開始在抱怨什麼？', '後來她們決定把錢花在誰身上？'], why: '一開始大家都在抱怨沒有禮物、日子辛苦；聽了二姐為父親說話後，大家想到了媽媽，決定把錢拿來買禮物送給媽媽。她們從只想到自己，變成會替家人著想。' },
      qh: { think: ['爸爸在信裡有沒有寫戰場有多危險？', '他為什麼只寫好的事？'], why: '爸爸不想讓家人擔心，所以只寫軍中生活和對女兒的關心，還鼓勵她們做個懂事的小婦人。這表示他非常愛家人。' },
      qi: { think: ['二姐說有錢不一定幸福，你同意嗎？', '你覺得什麼會讓一家人感到幸福？'], why: '可以同意，也可以有不同想法。很多人覺得家人彼此關心、在一起，比有很多錢更幸福。說出你的理由就可以。' },
      qj: { think: ['四姐妹後來決定怎麼過這個節日？', '如果是你，你會怎麼讓家人開心？'], why: '她們決定用自己的零用錢買禮物給媽媽，也決定要更努力、不再抱怨。你也可以想想：不花大錢，能為家人做哪些貼心的小事。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['我會親手做一張卡片，寫下對媽媽的感謝。', '我會幫忙做家事，讓爸媽可以休息。'], bad: ['我只想要別人送我禮物。', '我會一直抱怨沒有禮物。'], why: '題目問的是你可以怎麼讓家人開心。親手做卡片、幫忙做家事，都是貼心的方法。只想要禮物、一直抱怨，都沒有替家人著想。' },
      k2: { good: ['我覺得家人在一起最幸福，錢不是最重要的。', '我覺得有錢可以讓生活方便，但家人的關心更重要。'], bad: ['只要有錢，家人吵架也沒關係。', '我覺得什麼都不重要。'], why: '題目問的是你覺得什麼讓人幸福。說出你重視的東西和理由，就是好回答。只看錢、什麼都不在乎，都沒有好好想。' }
    },
    hanzi: [
      { id: 'h-耶', combo: { layout: 'lr', parts: [['耳', 's', ''], ['阝', 'm', '城鎮']] }, char: '耶', zhuyin: 'ㄧㄝ', radical: '耳', strokes: 9, words: ['耶誕節', '耶穌'], say: '耶，耶穌的耶', cloze: '＿穌', img: 'xmas-tree.png', options: ['耶', '爺', '椰', '郁'], clue: '這個字的左邊是「耳」，右邊是右耳旁。', explain: '答案是「耶」；「爺」的上面是「父」，「椰」的左邊是木字旁。', parts: ['耳', '阝'], story: '左邊是「耳」，右邊是右耳旁。常用在外國的名字，像「耶穌」；紀念耶穌出生的節日，叫「耶誕節」。', sentence: '十二月二十五日是耶誕節。', build: { layout: 'lr', show: ['耳', '？'], answer: '阝', options: ['阝', '卩', '刂', '攵'], clue: '想一想：「耳」的右邊放什麼，才是這個字？' } },
      { id: 'h-郊', combo: { layout: 'lr', parts: [['交', 's', ''], ['阝', 'm', '城鎮']] }, char: '郊', zhuyin: 'ㄐㄧㄠ', radical: '邑', strokes: 9, words: ['郊外', '郊遊'], say: '郊，郊遊的郊', cloze: '＿遊', img: 'countryside.png', options: ['郊', '校', '交', '效'], clue: '這個字的右邊是右耳旁。', explain: '答案是「郊」，右邊是右耳旁；「校」的左邊是木字旁，「效」的右邊是「攵」。', parts: ['交', '阝'], story: '左邊的「交」念起來像「郊」，右邊的「阝」和城鎮有關。城市外面、和鄉下交界的地方，就是「郊外」。', sentence: '週末我們全家到郊外野餐。', build: { layout: 'lr', show: ['交', '？'], answer: '阝', options: ['阝', '木', '攵', '亻'], clue: '想一想：和城鎮有關的部首放在右邊，是哪一個？' } },
      { id: 'h-慈', combo: { layout: 'tb', parts: [['茲', 's', ''], ['心', 'm', '心']] }, char: '慈', zhuyin: 'ㄘˊ', radical: '心', strokes: 13, words: ['慈祥', '慈愛'], say: '慈，慈愛的慈', cloze: '＿愛', img: 'kind-elder.png', options: ['慈', '磁', '茲', '滋'], clue: '這個字的下面是「心」。', explain: '答案是「慈」，下面是「心」；「磁」的左邊是石字旁，「滋」的左邊是三點水。', parts: ['茲', '心'], story: '上面的「茲」念起來像「慈」，下面是心。用溫柔的心去疼愛別人，就是「慈愛」。', sentence: '外婆慈愛的摸摸我的頭。', build: { layout: 'tb', show: ['茲', '？'], answer: '心', options: ['心', '石', '氵', '女'], clue: '想一想：疼愛別人是用什麼去疼？' } },
      { id: 'h-祥', combo: { layout: 'lr', parts: [['礻', 'm', '祭拜'], ['羊', 's', '']] }, char: '祥', zhuyin: 'ㄒㄧㄤˊ', radical: '示', strokes: 10, words: ['慈祥', '吉祥'], say: '祥，吉祥的祥', cloze: '吉＿', img: 'lucky-charm.png', options: ['祥', '詳', '洋', '翔'], clue: '這個字的左邊是示字旁。', explain: '答案是「祥」，左邊是示字旁；「詳」的左邊是言字旁，「洋」的左邊是三點水。', parts: ['礻', '羊'], story: '左邊和祭拜有關，右邊的「羊」念起來有點像「祥」。古人拿羊祭拜，祈求好運，就是「吉祥」。', sentence: '過年時，大家互相說吉祥話。', build: { layout: 'lr', show: ['？', '羊'], answer: '礻', options: ['礻', '言', '氵', '亻'], clue: '想一想：祈求好運和什麼有關？' } },
      { id: 'h-劈', combo: { layout: 'tb', parts: [['辟', 's', ''], ['刀', 'm', '刀']] }, char: '劈', zhuyin: 'ㄆㄧ', radical: '刀', strokes: 15, words: ['劈啪', '劈柴'], say: '劈，劈柴的劈', cloze: '＿柴', img: 'chop-wood.png', options: ['劈', '壁', '避', '僻'], clue: '這個字的下面是「刀」。', explain: '答案是「劈」，下面是「刀」；「壁」的下面是「土」，「避」有辵字旁。', parts: ['辟', '刀'], story: '上面的「辟」念起來像「劈」，下面是刀。用刀用力往下砍開，就是「劈」。', sentence: '爺爺用斧頭劈柴生火。', build: { layout: 'tb', show: ['辟', '？'], answer: '刀', options: ['刀', '土', '辶', '亻'], clue: '想一想：把木頭砍開要用什麼工具？' } },
      { id: 'h-啪', combo: { layout: 'lr', parts: [['口', 'm', '聲音'], ['拍', 's', '']] }, char: '啪', zhuyin: 'ㄆㄚ', radical: '口', strokes: 11, words: ['劈啪', '啪啦'], say: '啪，啪啦的啪', cloze: '＿啦', img: 'fireplace.png', options: ['啪', '拍', '怕', '帕'], clue: '這個字的左邊是口字旁。', explain: '答案是「啪」，左邊是口字旁；「拍」的左邊是提手旁，「怕」的左邊是豎心旁。', parts: ['口', '拍'], story: '左邊是口，表示聲音；右邊的「拍」念起來像「啪」。東西打在一起、裂開時發出的聲音，就是「啪」。', sentence: '杯子掉到地上，啪啦一聲碎了。', build: { layout: 'lr', show: ['？', '拍'], answer: '口', options: ['口', '扌', '忄', '巾'], clue: '想一想：表示聲音的字，左邊常放哪一個？' } },
      { id: 'h-零', combo: { layout: 'tb', parts: [['雨', 'm', '雨'], ['令', 's', '']] }, char: '零', zhuyin: 'ㄌㄧㄥˊ', radical: '雨', strokes: 13, words: ['零用錢', '零食'], say: '零，零食的零', cloze: '＿食', img: 'piggy-bank.png', options: ['零', '鈴', '玲', '令'], clue: '這個字的上面是雨字頭。', explain: '答案是「零」，上面是雨字頭；「鈴」的左邊是金字旁，「玲」的左邊是「王」。', parts: ['雨', '令'], story: '上面是雨，下面的「令」念起來像「零」。小雨一點一點落下，表示零碎、很少；一點一點的小錢，叫「零用錢」。', sentence: '媽媽說零食不要吃太多。', build: { layout: 'tb', show: ['？', '令'], answer: '雨', options: ['雨', '金', '王', '竹'], clue: '想一想：一點一點落下來的是什麼？' } },
      { id: 'h-厭', combo: { type: '形聲字', pict: '外面是「厂」，裡面是「猒」，表示吃得太飽、不想再吃。吃膩了不想要，就是「厭」。' }, char: '厭', zhuyin: 'ㄧㄢˋ', radical: '厂', strokes: 14, words: ['厭倦', '討厭'], say: '厭，討厭的厭', cloze: '討＿', img: 'bored-kid.png', options: ['厭', '壓', '歷', '廚'], clue: '這個字的外面是「厂」，下面沒有「土」。', explain: '答案是「厭」；「壓」的下面多了「土」，「廚」的外面是「广」。', parts: ['厂', '猒'], story: '外面是「厂」，裡面像吃得飽飽的狗。吃太多吃膩了，不想再要，就是「討厭」、「厭倦」。', sentence: '我討厭被別人插隊。' },
      { id: 'h-倦', combo: { layout: 'lr', parts: [['亻', 'm', '人'], ['卷', 's', '']] }, char: '倦', zhuyin: 'ㄐㄩㄢˋ', radical: '人', strokes: 10, words: ['厭倦', '疲倦'], say: '倦，疲倦的倦', cloze: '疲＿', img: 'tired-kid.png', options: ['倦', '捲', '圈', '卷'], clue: '這個字的左邊是單人旁。', explain: '答案是「倦」，左邊是單人旁；「捲」的左邊是提手旁，「圈」的外面是大口框。', parts: ['亻', '卷'], story: '左邊是人，右邊的「卷」像一個人捲曲著身體。人累得縮成一團，就是「疲倦」。', sentence: '爬完山，大家都很疲倦。', build: { layout: 'lr', show: ['？', '卷'], answer: '亻', options: ['亻', '扌', '口', '糸'], clue: '想一想：累得縮成一團的是誰？' } },
      { id: 'h-辯', combo: { type: '形聲字', pict: '兩邊是兩個「辛」，中間是「言」。兩個人吵起來，在中間用話說清楚道理，就是「辯」。' }, char: '辯', zhuyin: 'ㄅㄧㄢˋ', radical: '辛', strokes: 21, words: ['辯護', '辯論'], say: '辯，辯論的辯', cloze: '＿論', img: 'debate.png', options: ['辯', '辨', '辮', '瓣'], clue: '這個字的中間是「言」。', explain: '答案是「辯」，中間是「言」；「辨」的中間是一點一撇，「辮」的中間是「糸」。', parts: ['辛', '言', '辛'], story: '兩邊是「辛」，中間是說話的「言」。用話說出道理，和別人爭論，就是「辯論」。', sentence: '班上舉辦了一場辯論比賽。' },
      { id: 'h-私', combo: { layout: 'lr', parts: [['禾', 'm', '稻禾'], ['厶', 's', '']] }, char: '私', zhuyin: 'ㄙ', radical: '禾', strokes: 7, words: ['自私自利', '私人'], say: '私，私人的私', cloze: '＿人', img: 'my-box.png', options: ['私', '秘', '和', '科'], clue: '這個字的左邊是禾字旁，右邊是「厶」。', explain: '答案是「私」；「秘」的右邊是「必」，「和」的右邊是「口」。', parts: ['禾', '厶'], story: '左邊是稻禾，右邊的「厶」像把東西圍起來。把稻子圍起來只給自己，就是「私」。', sentence: '這是私人的房間，請不要隨便進來。', build: { layout: 'lr', show: ['？', '厶'], answer: '禾', options: ['禾', '木', '糸', '亻'], clue: '想一想：圍起來只給自己的，是什麼農作物？' } },
      { id: 'h-貧', combo: { layout: 'tb', parts: [['分', 's', ''], ['貝', 'm', '錢']] }, char: '貧', zhuyin: 'ㄆㄧㄣˊ', radical: '貝', strokes: 11, words: ['貧窮', '貧困'], say: '貧，貧困的貧', cloze: '＿困', img: 'poor-family.png', options: ['貧', '貪', '賓', '分'], clue: '這個字的上面是「分」，下面是「貝」。', explain: '答案是「貧」；「貪」的上面是「今」，「賓」的上面是寶蓋頭。', parts: ['分', '貝'], story: '上面是「分」，下面是「貝」，貝殼是古時候的錢。錢被分掉、越來越少，就是「貧窮」。', sentence: '他小時候家裡很貧困，但他很努力。', build: { layout: 'tb', show: ['分', '？'], answer: '貝', options: ['貝', '心', '皿', '女'], clue: '想一想：古時候的錢，放在下面是哪一個？' } },
      { id: 'h-係', combo: { layout: 'lr', parts: [['亻', 'm', '人'], ['系', 's', '']] }, char: '係', zhuyin: 'ㄒㄧˋ', radical: '人', strokes: 9, words: ['關係', '沒關係'], say: '係，關係的係', cloze: '關＿', img: 'linked-hands.png', options: ['係', '系', '孫', '絲'], clue: '這個字的左邊是單人旁。', explain: '答案是「係」，左邊是單人旁；「系」沒有偏旁，「孫」的左邊是子字旁。', parts: ['亻', '系'], story: '左邊是人，右邊的「系」像一條繩子。人和人之間像有繩子連著，就是「關係」。', sentence: '不小心撞到你，對不起！沒關係。', build: { layout: 'lr', show: ['？', '系'], answer: '亻', options: ['亻', '子', '糸', '氵'], clue: '想一想：被繩子連在一起的是誰？' } },
      { id: 'h-趁', combo: { type: '形聲字', pict: '左邊是「走」，右邊念起來有點像「趁」。抓住好機會，快點走去做，就是「趁」。' }, char: '趁', zhuyin: 'ㄔㄣˋ', radical: '走', strokes: 12, words: ['趁機', '趁早'], say: '趁，趁早的趁', cloze: '＿早', img: 'run-early.png', options: ['趁', '珍', '診', '疹'], clue: '這個字的左邊是「走」。', explain: '答案是「趁」，左邊是「走」；「珍」的左邊是「王」，「診」的左邊是言字旁。', parts: ['走', '㐱'], story: '左邊是「走」，右邊念起來有點像「趁」。抓住時機快點去做，就是「趁早」。', sentence: '雨停了，我們趁機出門散步。' },
      { id: 'h-稍', combo: { layout: 'lr', parts: [['禾', 'm', '稻禾'], ['肖', 's', '']] }, char: '稍', zhuyin: 'ㄕㄠ', radical: '禾', strokes: 12, words: ['稍微', '稍等'], say: '稍，稍等的稍', cloze: '＿等', img: 'wait-moment.png', options: ['稍', '梢', '哨', '消'], clue: '這個字的左邊是禾字旁。', explain: '答案是「稍」，左邊是禾字旁；「梢」的左邊是木字旁，「哨」的左邊是口字旁。', parts: ['禾', '肖'], story: '左邊是稻禾，右邊的「肖」有小的意思。稻子尖端小小的一點，表示「一點點」，就是「稍微」。', sentence: '請稍等一下，我馬上來。', build: { layout: 'lr', show: ['？', '肖'], answer: '禾', options: ['禾', '木', '口', '氵'], clue: '想一想：和稻子有關的部首是哪一個？' } },
      { id: 'h-罕', combo: { type: '形聲字', pict: '上面像一張網，下面的「干」念起來有點像「罕」。用網子去捕捉，很少捉得到，就是「罕」。' }, char: '罕', zhuyin: 'ㄏㄢˇ', radical: '网', strokes: 7, words: ['罕見', '稀罕'], say: '罕，稀罕的罕', cloze: '稀＿', img: 'rare-flower.png', options: ['罕', '竿', '汗', '旱'], clue: '這個字的上面像一張網，下面是「干」。', explain: '答案是「罕」；「竿」的上面是竹字頭，「汗」的左邊是三點水。', parts: ['罒', '干'], story: '上面像一張網，下面念起來有點像「罕」。很少看到、很難遇見，就是「罕見」。', sentence: '這種鳥很罕見，大家都搶著拍照。' },
      { id: 'h-烘', combo: { layout: 'lr', parts: [['火', 'm', '火'], ['共', 's', '']] }, char: '烘', zhuyin: 'ㄏㄨㄥ', radical: '火', strokes: 10, words: ['暖烘烘', '烘乾'], say: '烘，烘乾的烘', cloze: '＿乾', img: 'warm-bed.png', options: ['烘', '洪', '哄', '拱'], clue: '這個字的左邊是火字旁。', explain: '答案是「烘」，左邊是火字旁；「洪」的左邊是三點水，「哄」的左邊是口字旁。', parts: ['火', '共'], story: '左邊是火，右邊的「共」念起來像「烘」。用火的熱氣把東西弄乾、弄暖，就是「烘」。', sentence: '溼衣服放進烘衣機裡烘乾。', build: { layout: 'lr', show: ['？', '共'], answer: '火', options: ['火', '氵', '口', '扌'], clue: '想一想：把東西弄乾弄暖要靠什麼？' } },
      { id: 'h-衷', combo: { type: '形聲字', pict: '外面是「衣」，中間是「中」。穿在最裡面、貼著身體的衣服，引申為心裡面，就是「衷」。' }, char: '衷', zhuyin: 'ㄓㄨㄥ', radical: '衣', strokes: 10, words: ['衷心', '苦衷'], say: '衷，苦衷的衷', cloze: '苦＿', img: 'heart-thanks.png', options: ['衷', '哀', '衰', '表'], clue: '這個字是「衣」的中間放一個「中」。', explain: '答案是「衷」；「哀」的中間是「口」，「表」的上面不一樣。', parts: ['衣', '中'], story: '「衣」的中間放一個「中」，像貼身穿在最裡面的衣服。從心裡最深處發出來的，就是「衷心」。', sentence: '我衷心感謝老師的照顧。' },
      { id: 'h-鋼', combo: { layout: 'lr', parts: [['金', 'm', '金屬'], ['岡', 's', '']] }, char: '鋼', zhuyin: 'ㄍㄤ', radical: '金', strokes: 16, words: ['鋼琴', '鋼鐵'], say: '鋼，鋼鐵的鋼', cloze: '＿鐵', img: 'piano.png', options: ['鋼', '崗', '綱', '剛'], clue: '這個字的左邊是金字旁。', explain: '答案是「鋼」，左邊是金字旁；「崗」的上面是「山」，「綱」的左邊是糸字旁。', parts: ['金', '岡'], story: '左邊是金屬，右邊的「岡」念起來像「鋼」。非常堅硬的金屬，就是「鋼鐵」。', sentence: '這座橋是用鋼鐵蓋的。', build: { layout: 'lr', show: ['？', '岡'], answer: '金', options: ['金', '山', '糸', '刂'], clue: '想一想：很硬的材料，左邊放哪一個？' } }
    ],
    vocab: [
      { id: 'v-耶誕節', cloze: true, clozeOptions: ['耶誕節', '端午節', '中秋節', '清明節'], word: '耶誕節', meaning: '十二月二十五日，西方人紀念一位宗教領袖出生的日子。', example: '＿＿＿到了，大家在樹上掛滿燈飾。', img: 'xmas-tree.png', options: ['耶誕節', '郊外', '鋼琴', '零用錢'] },
      { id: 'v-郊外', cloze: true, clozeOptions: ['郊外', '市中心', '大樓裡', '地下室'], word: '郊外', meaning: '城市旁邊、靠近鄉下的地方。', example: '週末我們到＿＿騎腳踏車。', img: 'countryside.png', options: ['郊外', '耶誕節', '鋼琴', '薄暮'] },
      { id: 'v-慈祥', cloze: true, clozeOptions: ['慈祥', '凶惡', '冷漠', '嚴厲'], word: '慈祥', meaning: '樣子溫和，讓人覺得很親切。', example: '奶奶＿＿的對我笑。', img: 'kind-elder.png', options: ['慈祥', '罕見', '稍微', '貧窮'] },
      { id: 'v-劈啪', cloze: true, clozeOptions: ['劈啪', '安靜', '無聲', '寂靜'], word: '劈啪', meaning: '東西燒起來或裂開時發出的聲音。', example: '柴火燒得＿＿作響。', img: 'fireplace.png', options: ['劈啪', '暖烘烘', '罕見', '慈祥'] },
      { id: 'v-零用錢', cloze: true, clozeOptions: ['零用錢', '大石頭', '舊報紙', '空瓶子'], word: '零用錢', meaning: '平常可以自己花的少量金額。', example: '我把＿＿＿存起來買故事書。', img: 'piggy-bank.png', options: ['零用錢', '鋼琴', '耶誕節', '郊外'] },
      { id: 'v-厭倦', cloze: true, clozeOptions: ['厭倦', '喜歡', '熱愛', '期待'], word: '厭倦', meaning: '不再喜歡，提不起興趣。', example: '每天吃一樣的菜，他已經＿＿了。', img: 'bored-kid.png', options: ['厭倦', '辯護', '衷心', '慈祥'] },
      { id: 'v-辯護', cloze: true, clozeOptions: ['辯護', '責罵', '批評', '嘲笑'], word: '辯護', meaning: '說出理由，幫別人說話。', example: '弟弟被誤會時，哥哥站出來為他＿＿。', img: 'debate.png', options: ['辯護', '厭倦', '點醒', '衷心'] },
      { id: 'v-自私自利', cloze: true, clozeOptions: ['自私自利', '樂於助人', '大方分享', '熱心公益'], word: '自私自利', meaning: '只想到對本身有好處，不管別人。', example: '他只顧自己吃，真是＿＿＿＿。', img: 'my-box.png', options: ['自私自利', '貧窮', '罕見', '暖烘烘'] },
      { id: 'v-貧窮', cloze: true, clozeOptions: ['貧窮', '富有', '有錢', '豪華'], word: '貧窮', meaning: '錢很少，生活很辛苦。', example: '他雖然＿＿，卻很樂意幫助別人。', img: 'poor-family.png', options: ['貧窮', '慈祥', '罕見', '自私自利'] },
      { id: 'v-關係', cloze: true, clozeOptions: ['關係', '天氣', '顏色', '形狀'], word: '關係', meaning: '人和人、事和事之間的連結。', example: '我們兩個是表兄弟的＿＿。', img: 'linked-hands.png', options: ['關係', '郊外', '薄暮', '鋼琴'] },
      { id: 'v-趁機', cloze: true, clozeOptions: ['趁機', '錯過', '放棄', '拒絕'], word: '趁機', meaning: '抓住好時候去做事。', example: '老師不在，他＿＿偷吃餅乾。', img: 'run-early.png', options: ['趁機', '稍微', '點醒', '辯護'] },
      { id: 'v-稍微', cloze: true, clozeOptions: ['稍微', '非常', '極度', '十分'], word: '稍微', meaning: '一點點、不多。', example: '請把聲音＿＿調小一點。', img: 'wait-moment.png', options: ['稍微', '罕見', '衷心', '趁機'] },
      { id: 'v-罕見', cloze: true, clozeOptions: ['罕見', '常見', '到處都有', '隨處可見'], word: '罕見', meaning: '很少看到，難得碰上。', example: '今年冬天下了一場＿＿的大雪。', img: 'rare-flower.png', options: ['罕見', '稍微', '慈祥', '貧窮'] },
      { id: 'v-暖烘烘', cloze: true, clozeOptions: ['暖烘烘', '冷冰冰', '溼答答', '涼颼颼'], word: '暖烘烘', meaning: '很溫熱、很舒服的樣子。', example: '晒過太陽的被子＿＿＿的。', img: 'warm-bed.png', options: ['暖烘烘', '劈啪', '罕見', '慈祥'] },
      { id: 'v-衷心', cloze: true, clozeOptions: ['衷心', '假裝', '隨便', '敷衍'], word: '衷心', meaning: '從肺腑深處發出來的。', example: '我＿＿祝福你生日快樂。', img: 'heart-thanks.png', options: ['衷心', '厭倦', '稍微', '辯護'] },
      { id: 'v-鋼琴', cloze: true, clozeOptions: ['鋼琴', '冰箱', '電視', '沙發'], word: '鋼琴', meaning: '有黑白鍵、用手指按下去發出聲音的大樂器。', example: '姊姊每天練習彈＿＿。', img: 'piano.png', options: ['鋼琴', '零用錢', '耶誕節', '郊外'] },
      { id: 'v-薄暮', cloze: true, clozeOptions: ['薄暮', '清晨', '中午', '半夜'], word: '薄暮', meaning: '傍晚，太陽快要下山的時候。', example: '＿＿時分，炊煙從屋頂升起。', img: 'sunset-home.png', options: ['薄暮', '郊外', '罕見', '暖烘烘'] },
      { id: 'v-點醒', cloze: true, clozeOptions: ['點醒', '弄糊塗', '騙倒', '嚇壞'], word: '點醒', meaning: '提示別人，讓他突然想明白。', example: '老師的一句話＿＿了我。', img: 'try-idea.png', options: ['點醒', '辯護', '厭倦', '趁機'] }
    ],
    charwords: [
      { id: 'cw-耶', char: '耶', img: 'xmas-tree.png', charMeaning: '用在外國的名字。', word: '耶穌', meaning: '基督教信仰中的救世主。', example: '耶誕節是紀念＿＿出生的節日。', options: ['耶穌', '郊遊', '慈愛', '吉祥'] },
      { id: 'cw-郊', char: '郊', img: 'countryside.png', charMeaning: '城市外面的地方。', word: '郊遊', meaning: '到城市外面遊玩。', example: '春天最適合去＿＿。', options: ['郊遊', '劈柴', '啪啦', '零食'] },
      { id: 'cw-慈', char: '慈', img: 'kind-elder.png', charMeaning: '疼愛、溫和。', word: '慈愛', meaning: '溫柔的疼愛。', example: '媽媽用＿＿的眼光看著寶寶。', options: ['慈愛', '討厭', '疲倦', '辯論'] },
      { id: 'cw-祥', char: '祥', img: 'lucky-charm.png', charMeaning: '好運、平安。', word: '吉祥', meaning: '好運、幸福。', example: '紅色在過年代表＿＿。', options: ['吉祥', '私人', '貧困', '關係'] },
      { id: 'cw-劈', char: '劈', img: 'chop-wood.png', charMeaning: '用刀斧砍開。', word: '劈柴', meaning: '把木頭砍成小塊當柴燒。', example: '爸爸在院子裡＿＿。', options: ['劈柴', '趁早', '稍等', '稀罕'] },
      { id: 'cw-啪', char: '啪', img: 'fireplace.png', charMeaning: '東西碰撞或裂開的聲音。', word: '啪啦', meaning: '東西碎掉或拍打時的聲音。', example: '碗掉在地上，＿＿一聲破了。', options: ['啪啦', '烘乾', '苦衷', '鋼鐵'] },
      { id: 'cw-零', char: '零', img: 'piggy-bank.png', charMeaning: '零碎、很少。', word: '零食', meaning: '正餐以外吃的小點心。', example: '餅乾和糖果都是＿＿。', options: ['零食', '耶穌', '郊遊', '慈愛'] },
      { id: 'cw-厭', char: '厭', img: 'bored-kid.png', charMeaning: '不喜歡、膩了。', word: '討厭', meaning: '不喜歡。', example: '我最＿＿吃苦瓜了。', options: ['討厭', '吉祥', '劈柴', '啪啦'] },
      { id: 'cw-倦', char: '倦', img: 'tired-kid.png', charMeaning: '累。', word: '疲倦', meaning: '很累，沒有力氣。', example: '跑完馬拉松，他看起來很＿＿。', options: ['疲倦', '零食', '私人', '貧困'] },
      { id: 'cw-辯', char: '辯', img: 'debate.png', charMeaning: '用話說出道理、爭論。', word: '辯論', meaning: '雙方說出理由，互相討論誰對。', example: '兩隊在臺上＿＿，非常精采。', options: ['辯論', '關係', '趁早', '稍等'] },
      { id: 'cw-私', char: '私', img: 'my-box.png', charMeaning: '自己的、不公開的。', word: '私人', meaning: '屬於自己個人的。', example: '日記是很＿＿的東西。', options: ['私人', '稀罕', '烘乾', '苦衷'] },
      { id: 'cw-貧', char: '貧', img: 'poor-family.png', charMeaning: '錢很少。', word: '貧困', meaning: '很窮，生活很困難。', example: '他捐錢幫助＿＿的家庭。', options: ['貧困', '鋼鐵', '耶穌', '郊遊'] },
      { id: 'cw-係', char: '係', img: 'linked-hands.png', charMeaning: '連結。', word: '沒關係', meaning: '不要緊。', example: '你不小心弄倒我的水，＿＿＿。', options: ['沒關係', '慈愛', '吉祥', '劈柴'] },
      { id: 'cw-趁', char: '趁', img: 'run-early.png', charMeaning: '利用機會。', word: '趁早', meaning: '把握時間，早一點做。', example: '天快黑了，我們＿＿回家吧。', options: ['趁早', '啪啦', '零食', '討厭'] },
      { id: 'cw-稍', char: '稍', img: 'wait-moment.png', charMeaning: '一點點。', word: '稍等', meaning: '等一下下。', example: '請＿＿，我去拿書。', options: ['稍等', '疲倦', '辯論', '私人'] },
      { id: 'cw-罕', char: '罕', img: 'rare-flower.png', charMeaning: '很少。', word: '稀罕', meaning: '很少見、很珍貴。', example: '這種花在平地很＿＿。', options: ['稀罕', '貧困', '沒關係', '趁早'] },
      { id: 'cw-烘', char: '烘', img: 'warm-bed.png', charMeaning: '用火或熱氣弄乾、弄暖。', word: '烘乾', meaning: '用熱氣把東西弄乾。', example: '把頭髮＿＿再睡覺。', options: ['烘乾', '稍等', '耶穌', '郊遊'] },
      { id: 'cw-衷', char: '衷', img: 'heart-thanks.png', charMeaning: '內心。', word: '苦衷', meaning: '心裡說不出來的難處。', example: '他遲到一定有他的＿＿。', options: ['苦衷', '慈愛', '吉祥', '劈柴'] },
      { id: 'cw-鋼', char: '鋼', img: 'piano.png', charMeaning: '很硬的金屬。', word: '鋼鐵', meaning: '很堅硬的金屬材料。', example: '這艘大船是用＿＿做的。', options: ['鋼鐵', '啪啦', '零食', '討厭'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-感激涕零', situationImg: 'id-grateful-tears.png',
        anim: { bg: 'room', a: { old: ['👵', 30, 60, 13], kid: ['🧒', 66, 64, 11], bag: ['👜', 50, 66, 9], tear: ['😭', 30, 36, 9, 'h'], heart: ['💗', 50, 36, 9, 'h'] },
          s: [['奶奶的錢包掉在路上。', [['bob', 'bag']]],
            ['小明撿到後，跑了好遠把錢包還給她。', [['mv', 'kid', [44, 64, 700]]]],
            ['奶奶感動得流下眼淚，一直說謝謝。', [['in', 'tear'], ['in', 'heart']]],
            ['感謝到流下眼淚，就是感激涕零。', [['pop', 'heart']]]] },
        idiom: '感激涕零', char: '零', meaning: '非常感謝，感動得流下眼淚。', example: '受到大家的幫忙，災民感激涕零。', situation: '小明把撿到的錢包還給奶奶，奶奶感動得流淚道謝。',
        fill: { options: ['醫生救了他的孩子，他＿＿＿＿。', '他打翻了我的飲料，我＿＿＿＿。'], clue: '提示：哪一句是非常感謝、感動得流淚？', explain: '第一句用得對：孩子被救，非常感謝。飲料被打翻，不會感謝得流淚。' } },
      { id: 'i-孜孜不倦', situationImg: 'id-study-hard.png',
        anim: { bg: 'room', a: { kid: ['🧒', 40, 62, 12], book: ['📚', 60, 64, 10], moon: ['🌙', 84, 16, 9, 'h'], sun: ['☀️', 84, 16, 9] },
          s: [['小芳每天早上讀書，', [['bob', 'book']]],
            ['晚上也還在讀，', [['out', 'sun'], ['in', 'moon']]],
            ['一點也不覺得累。', [['bob', 'kid']]],
            ['勤勞努力、一點也不疲倦，就是孜孜不倦。', [['jump', 'kid']]]] },
        idiom: '孜孜不倦', char: '倦', meaning: '非常勤勞努力，一點也不覺得累。', example: '老師孜孜不倦的教導我們。', situation: '小芳從早到晚讀書，一點也不覺得累。',
        fill: { options: ['科學家＿＿＿＿的做實驗，終於成功了。', '他讀了五分鐘就睡著了，真是＿＿＿＿。'], clue: '提示：哪一句是勤勞努力、不怕累？', explain: '第一句用得對：一直努力做實驗。讀五分鐘就睡，剛好相反。' } },
      { id: 'i-大公無私', situationImg: 'id-fair-judge.png',
        anim: { bg: 'school', a: { judge: ['🧑‍⚖️', 50, 56, 13], a: ['🧒', 24, 66, 10], b: ['👦', 76, 66, 10], scale: ['⚖️', 50, 32, 10, 'h'] },
          s: [['比賽的裁判是小明的爸爸。', [['bob', 'judge']]],
            ['小明犯規了，', [['shake', 'a']]],
            ['爸爸還是照規定處罰他，一點也不偏心。', [['in', 'scale']]],
            ['處理事情公正，不偏私，就是大公無私。', [['pop', 'scale']]]] },
        idiom: '大公無私', char: '私', meaning: '處理事情非常公正，一點也不偏心。', example: '班長大公無私，好朋友犯錯也一樣登記。', situation: '當裁判的爸爸，照樣處罰犯規的兒子。',
        fill: { options: ['法官＿＿＿＿，判決讓大家都服氣。', '他只幫自己的好朋友加分，真是＿＿＿＿。'], clue: '提示：哪一句是公正不偏心？', explain: '第一句用得對：判決公正。只幫好朋友，是偏心。' } },
      { id: 'i-趁火打劫', situationImg: 'id-take-advantage.png',
        anim: { bg: 'room', a: { house: ['🏠', 40, 58, 14], fire: ['🔥', 40, 40, 10], thief: ['🦹', 78, 64, 11, 'h'], bag: ['💰', 60, 64, 8, 'h'] },
          s: [['一戶人家失火了，大家忙著救火。', [['wig', 'fire']]],
            ['有一個壞人偷偷溜進去，', [['in', 'thief'], ['mv', 'thief', [60, 64, 700]]]],
            ['搶走了屋裡的錢！', [['in', 'bag'], ['mv', 'bag', [86, 64, 600]]]],
            ['趁別人有困難時占便宜，就是趁火打劫。', [['shake', 'thief']]]] },
        idiom: '趁火打劫', char: '趁', meaning: '趁別人遇到困難的時候，占他的便宜。', example: '颱風過後，有些商人把菜價拉高，真是趁火打劫。', situation: '有一家人失火，壞人趁大家救火時溜進去搶錢。',
        fill: { options: ['停水時，有人把一瓶水賣一百元，簡直是＿＿＿＿。', '鄰居淹水時，他趕快去幫忙清理，這就是＿＿＿＿。'], clue: '提示：哪一句是趁別人有困難占便宜？', explain: '第一句用得對：趁停水賣高價。去幫忙清理，剛好相反。' } },
      { id: 'i-言不由衷', situationImg: 'id-fake-smile.png',
        anim: { bg: 'room', a: { kid: ['🧒', 40, 62, 12], gift: ['🧦', 66, 62, 9], smile: ['🙂', 40, 36, 9], think: ['💭', 60, 30, 10, 'h'] },
          s: [['小華收到一雙他不喜歡的襪子。', [['bob', 'gift']]],
            ['他嘴巴說：「好棒喔，我很喜歡！」', [['wig', 'smile']]],
            ['可是心裡想：「好醜喔……」', [['in', 'think']]],
            ['嘴上說的和心裡想的不一樣，就是言不由衷。', [['shake', 'kid']]]] },
        idiom: '言不由衷', char: '衷', meaning: '說的話不是心裡真正的想法。', example: '他說不在乎輸贏，其實是言不由衷。', situation: '小華嘴上說喜歡禮物，心裡卻覺得很醜。',
        fill: { options: ['他嘴上說沒關係，眼睛卻紅了，顯然＿＿＿＿。', '他把心裡的話全說出來，一點也不＿＿＿＿。'], clue: '提示：哪一句是嘴上說的和心裡想的不一樣？', explain: '第一句用得對：說沒關係卻很難過。把真心話說出來，就不是言不由衷。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-耶', char: '耶', wrong: '爺', sentence: '教堂裡擺著耶誕樹。', options: ['耶', '爺', '椰'], clue: '這裡說的是十二月的西方節日，想一想，哪一個字的左邊是「耳」？', explain: '要改成「耶」。西方節日是「耶誕」；「爺」是爺爺的爺。' },
      { id: 'fx-郊', char: '郊', wrong: '校', sentence: '春天到了，我們去郊遊。', options: ['郊', '校', '效'], clue: '這裡是說到城市外面玩，想一想，哪一個字有右耳旁？', explain: '要改成「郊」。到城外玩是「郊遊」；「校」是學校的校。' },
      { id: 'fx-慈', char: '慈', wrong: '磁', sentence: '老爺爺的臉很慈祥。', options: ['慈', '磁', '滋'], clue: '這裡是說溫和親切，想一想，哪一個字的下面是「心」？', explain: '要改成「慈」。溫和是「慈祥」；「磁」是磁鐵的磁。' },
      { id: 'fx-祥', char: '祥', wrong: '詳', sentence: '紅燈籠代表吉祥。', options: ['祥', '詳', '洋'], clue: '這裡是說好運，想一想，哪一個字有示字旁？', explain: '要改成「祥」。好運是「吉祥」；「詳」是詳細的詳。' },
      { id: 'fx-劈', char: '劈', wrong: '壁', sentence: '一道閃電劈開了大樹。', options: ['劈', '壁', '避'], clue: '這裡是說用力砍開，想一想，哪一個字的下面是「刀」？', explain: '要改成「劈」。砍開是「劈」；「壁」是牆壁的壁。' },
      { id: 'fx-零', char: '零', wrong: '鈴', sentence: '我用零用錢買了一本書。', options: ['零', '鈴', '令'], clue: '這裡說的是自己可以花的小錢，想一想，哪一個字有雨字頭？', explain: '要改成「零」。小錢是「零用錢」；「鈴」是鈴鐺的鈴。' },
      { id: 'fx-倦', char: '倦', wrong: '捲', sentence: '他一臉倦容，好像沒睡飽。', options: ['倦', '捲', '圈'], clue: '這裡是說很累的樣子，想一想，哪一個字有單人旁？', explain: '要改成「倦」。很累是「倦」；「捲」是捲起來的捲。' },
      { id: 'fx-辯', char: '辯', wrong: '辨', sentence: '他為自己的行為辯解。', options: ['辯', '辨', '辮'], clue: '這裡是說用話說出理由，想一想，哪一個字的中間是「言」？', explain: '要改成「辯」。用話解釋是「辯解」；「辨」是分辨的辨。' },
      { id: 'fx-貧', char: '貧', wrong: '貪', sentence: '這個村子以前很貧窮。', options: ['貧', '貪', '分'], clue: '這裡是說錢很少，想一想，哪一個字的上面是「分」？', explain: '要改成「貧」。錢很少是「貧窮」；「貪」是貪心的貪。' },
      { id: 'fx-係', char: '係', wrong: '系', sentence: '他們兩個人的關係很好。', options: ['係', '系', '孫'], clue: '這裡是說人和人之間的連結，想一想，哪一個字有單人旁？', explain: '要改成「係」。連結是「關係」；「系」是系統的系。' },
      { id: 'fx-趁', char: '趁', wrong: '珍', sentence: '趁熱把湯喝了吧。', options: ['趁', '珍', '診'], clue: '這裡是說把握時候，想一想，哪一個字的左邊是「走」？', explain: '要改成「趁」。把握時候是「趁」；「珍」是珍珠的珍。' },
      { id: 'fx-稍', char: '稍', wrong: '梢', sentence: '請稍微往左邊移一點。', options: ['稍', '梢', '哨'], clue: '這裡是說一點點，想一想，哪一個字有禾字旁？', explain: '要改成「稍」。一點點是「稍微」；「梢」是樹梢的梢。' },
      { id: 'fx-烘', char: '烘', wrong: '洪', sentence: '剛烘好的餅乾好香。', options: ['烘', '洪', '哄'], clue: '這裡是說用熱氣烤，想一想，哪一個字有火字旁？', explain: '要改成「烘」。用熱氣烤是「烘」；「洪」是洪水的洪。' },
      { id: 'fx-衷', char: '衷', wrong: '哀', sentence: '這是我的肺腑之言，出自衷心。', options: ['衷', '哀', '衰'], clue: '這裡是說從內心發出，想一想，哪一個字的中間是「中」？', explain: '要改成「衷」。內心是「衷心」；「哀」是悲哀的哀。' },
      { id: 'fx-鋼', char: '鋼', wrong: '綱', sentence: '音樂教室裡有一架鋼琴。', options: ['鋼', '綱', '剛'], clue: '這裡說的是有黑白鍵的樂器，想一想，哪一個字有金字旁？', explain: '要改成「鋼」。樂器是「鋼琴」；「綱」是大綱的綱。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿子」是長在熱帶海邊、有硬殼和汁水的果實。', sentence: '海邊的＿子樹長得好高。', frame: '＿子', options: ['椰', '耶'], answer: '椰', clue: '提示：這是一種樹，左邊是木字旁。', explain: '答案是「椰」；「耶」是耶誕節的耶。' },
      { id: 's2', meaning: '「學＿」是學生上課的地方。', sentence: '我每天走路去學＿。', frame: '學＿', options: ['校', '郊'], answer: '校', clue: '提示：這個字的左邊是木字旁。', explain: '答案是「校」；「郊」是郊外的郊。' },
      { id: 's3', meaning: '「＿鐵」是會吸住鐵釘的東西。', sentence: '冰箱上貼著一塊＿鐵。', frame: '＿鐵', options: ['磁', '慈'], answer: '磁', clue: '提示：和石頭有關，左邊是石字旁。', explain: '答案是「磁」；「慈」是慈祥的慈。' },
      { id: 's4', meaning: '「＿細」是說得很清楚、很仔細。', sentence: '老師＿細的說明作業規定。', frame: '＿細', options: ['詳', '祥'], answer: '詳', clue: '提示：和說話有關，左邊是言字旁。', explain: '答案是「詳」；「祥」是吉祥的祥。' },
      { id: 's5', meaning: '「牆＿」是房子四周立起來的面。', sentence: '牆＿上掛著一幅畫。', frame: '牆＿', options: ['壁', '劈'], answer: '壁', clue: '提示：這個字的下面是「土」。', explain: '答案是「壁」；「劈」是劈柴的劈。' },
      { id: 's6', meaning: '「＿手」是兩隻手掌互相碰出聲音。', sentence: '表演結束，大家熱烈的＿手。', frame: '＿手', options: ['拍', '啪'], answer: '拍', clue: '提示：要用手，左邊是提手旁。', explain: '答案是「拍」；「啪」是劈啪的啪。' },
      { id: 's7', meaning: '「門＿」是按了會叮咚響的東西。', sentence: '有人按門＿，我去開門。', frame: '門＿', options: ['鈴', '零'], answer: '鈴', clue: '提示：和金屬有關，左邊是金字旁。', explain: '答案是「鈴」；「零」是零食的零。' },
      { id: 's8', meaning: '「＿力」是用力往下推、往下按。', sentence: '他用手＿住紙，不讓風吹走。', frame: '＿住', options: ['壓', '厭'], answer: '壓', clue: '提示：這個字的下面有「土」。', explain: '答案是「壓」；「厭」是討厭的厭。' },
      { id: 's9', meaning: '「＿起」是把東西一圈一圈的繞成筒狀。', sentence: '請把海報＿起來。', frame: '＿起', options: ['捲', '倦'], answer: '捲', clue: '提示：要用手，左邊是提手旁。', explain: '答案是「捲」；「倦」是疲倦的倦。' },
      { id: 's10', meaning: '「分＿」是看出兩樣東西哪裡不同。', sentence: '你能分＿這兩隻雙胞胎貓嗎？', frame: '分＿', options: ['辨', '辯'], answer: '辨', clue: '提示：這個字的中間是一點一撇，不是「言」。', explain: '答案是「辨」；「辯」是辯論的辯。' },
      { id: 's11', meaning: '「＿心」是什麼都想要，想要很多。', sentence: '他太＿心了，拿了好多糖。', frame: '＿心', options: ['貪', '貧'], answer: '貪', clue: '提示：這個字的上面是「今」。', explain: '答案是「貪」；「貧」是貧窮的貧。' },
      { id: 's12', meaning: '「＿子」是兒子或女兒生的孩子。', sentence: '爺爺最疼他的小＿子。', frame: '＿子', options: ['孫', '係'], answer: '孫', clue: '提示：這個字的左邊是子字旁。', explain: '答案是「孫」；「係」是關係的係。' },
      { id: 's13', meaning: '「＿水」是大雨後很大很急的水。', sentence: '大雨過後，河裡的＿水很急。', frame: '＿水', options: ['洪', '烘'], answer: '洪', clue: '提示：和水有關，左邊是三點水。', explain: '答案是「洪」；「烘」是烘乾的烘。' },
      { id: 's14', meaning: '「＿才」是不久之前、一下子之前。', sentence: '他＿才還在這裡。', frame: '＿才', options: ['剛', '鋼'], answer: '剛', clue: '提示：這個字的右邊是立刀旁。', explain: '答案是「剛」；「鋼」是鋼琴的鋼。' }
    ],
    listen: [
      { id: 'l1', text: '奶奶溫和的對我笑，讓我覺得好親切。', answer: 0, options: [{ text: '慈祥', img: 'kind-elder.png' }, { text: '罕見', img: 'rare-flower.png' }, { text: '貧窮', img: 'poor-family.png' }, { text: '厭倦', img: 'bored-kid.png' }] },
      { id: 'l2', text: '柴火燒起來，發出一陣陣爆裂的聲音。', answer: 0, options: [{ text: '劈啪', img: 'fireplace.png' }, { text: '暖烘烘', img: 'warm-bed.png' }, { text: '鋼琴', img: 'piano.png' }, { text: '薄暮', img: 'sunset-home.png' }] },
      { id: 'l3', text: '每天做一樣的事，他已經提不起興趣了。', answer: 0, options: [{ text: '厭倦', img: 'bored-kid.png' }, { text: '衷心', img: 'heart-thanks.png' }, { text: '辯護', img: 'debate.png' }, { text: '點醒', img: 'try-idea.png' }] },
      { id: 'l4', text: '他只想到自己，完全不管別人。', answer: 0, options: [{ text: '自私自利', img: 'my-box.png' }, { text: '慈祥', img: 'kind-elder.png' }, { text: '衷心', img: 'heart-thanks.png' }, { text: '罕見', img: 'rare-flower.png' }] },
      { id: 'l5', text: '這種花很少看到，很難得遇見。', answer: 0, options: [{ text: '罕見', img: 'rare-flower.png' }, { text: '稍微', img: 'wait-moment.png' }, { text: '貧窮', img: 'poor-family.png' }, { text: '郊外', img: 'countryside.png' }] },
      { id: 'l6', text: '太陽快要下山的傍晚時候。', answer: 0, options: [{ text: '薄暮', img: 'sunset-home.png' }, { text: '郊外', img: 'countryside.png' }, { text: '耶誕節', img: 'xmas-tree.png' }, { text: '劈啪', img: 'fireplace.png' }] },
      { id: 'l7', text: '老師的一句話，讓我突然想明白了。', answer: 0, options: [{ text: '點醒', img: 'try-idea.png' }, { text: '辯護', img: 'debate.png' }, { text: '趁機', img: 'run-early.png' }, { text: '厭倦', img: 'bored-kid.png' }] },
      { id: 'l8', text: '晒過太陽的被子，蓋起來好溫暖。', answer: 0, options: [{ text: '暖烘烘', img: 'warm-bed.png' }, { text: '劈啪', img: 'fireplace.png' }, { text: '慈祥', img: 'kind-elder.png' }, { text: '罕見', img: 'rare-flower.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '做什麼', answer: '怎麼樣', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的疊字詞，說說看是什麼樣的東西。',
      /* 短語：動詞＋疊字形容詞＋的＋名詞（句子都是自己寫的） */
      intro: { example: '捧著熱騰騰的可可', img: 'pr-cocoa.png',
        parts: [{ text: '捧著', role: '做什麼' }, { text: '熱騰騰', role: '怎麼樣' }, { text: '的' }, { text: '可可', role: '什麼東西' }],
        explain: '先說做什麼，再用一個疊字的詞說出東西的樣子，加上「的」，最後說是什麼東西。' },
      pick: [
        { id: 'ph1', img: 'pr-dinner.png', before: '端出', noun: '晚飯', ask: '端出什麼樣的晚飯', look: '再看看圖片，飯菜有沒有冒煙？', options: ['熱騰騰', '冷冰冰', '硬梆梆', '乾巴巴'], clue: '提示：剛煮好，還冒著白煙。', explain: '答案是「熱騰騰」，完整的短語是「端出熱騰騰的晚飯」。' },
        { id: 'ph2', img: 'warm-bed.png', before: '蓋著', noun: '被子', ask: '蓋著什麼樣的被子', look: '再看看圖片，被子晒過太陽了嗎？', options: ['暖烘烘', '冷冰冰', '溼答答', '髒兮兮'], clue: '提示：晒過太陽，蓋起來好舒服。', explain: '答案是「暖烘烘」，完整的短語是「蓋著暖烘烘的被子」。' },
        { id: 'ph3', img: 'pr-snow.png', before: '踩著', noun: '雪地', ask: '踩著什麼樣的雪地', look: '再看看圖片，地上是什麼顏色？', options: ['白茫茫', '黑漆漆', '綠油油', '紅通通'], clue: '提示：放眼望去，像鋪了一層厚棉被。', explain: '答案是「白茫茫」，完整的短語是「踩著白茫茫的雪地」。' },
        { id: 'ph4', img: 'fireplace.png', before: '看著', noun: '爐火', ask: '看著什麼樣的爐火', look: '再看看圖片，火燒得旺不旺？', options: ['紅通通', '白茫茫', '黑漆漆', '綠油油'], clue: '提示：火燒得很旺，照亮整個房間。', explain: '答案是「紅通通」，完整的短語是「看著紅通通的爐火」。' },
        { id: 'ph5', img: 'pr-candy.png', before: '咬著', noun: '糖果', ask: '咬著什麼樣的糖果', look: '再看看圖片，吃糖的人表情怎麼樣？', options: ['甜滋滋', '苦哈哈', '酸溜溜', '鹹巴巴'], clue: '提示：吃一口，嘴裡都是蜂蜜的味道。', explain: '答案是「甜滋滋」，完整的短語是「咬著甜滋滋的糖果」。' },
        { id: 'ph6', img: 'pr-kitten.png', before: '抱著', noun: '小貓', ask: '抱著什麼樣的小貓', look: '再看看圖片，小貓的毛多不多？', options: ['毛茸茸', '光溜溜', '硬梆梆', '溼答答'], clue: '提示：摸起來軟軟的，像一團棉花。', explain: '答案是「毛茸茸」，完整的短語是「抱著毛茸茸的小貓」。' }
      ],
      say: [],
      words: [
        { word: '薄暮', meaning: '傍晚，太陽快要下山的時候。', img: 'sunset-home.png' },
        { word: '自私自利', meaning: '只想到對本身有好處，不管別人。', img: 'my-box.png' },
        { word: '點醒', meaning: '提示別人，讓他突然想明白。', img: 'try-idea.png' },
        { word: '罕見', meaning: '很少看到，難得碰上。', img: 'rare-flower.png' }
      ],
      choose: [
        { id: 'pw1', word: '薄暮', options: ['薄暮的時候，路燈一盞盞亮起來。', '薄暮的時候，太陽剛從東邊升起。'], clue: '提示：想一想，「薄暮」是傍晚，還是早上？', explain: '第一句用得對：傍晚路燈亮起。太陽升起是早上。' },
        { id: 'pw2', word: '自私自利', options: ['他把好東西都藏起來，真是自私自利。', '他把點心分給大家，真是自私自利。'], clue: '提示：想一想，「自私自利」是只想自己，還是會分享？', explain: '第一句用得對：只想到自己。分給大家，剛好相反。' },
        { id: 'pw3', word: '點醒', options: ['媽媽的話點醒了我，我決定向弟弟道歉。', '他睡得很熟，媽媽輕輕點醒了他的夢，他繼續睡。'], clue: '提示：想一想，「點醒」是讓人想明白，還是叫人起床？', explain: '第一句用得對：讓我想明白。這裡的點醒不是叫人起床。' },
        { id: 'pw4', word: '罕見', options: ['沙漠裡下大雨，是很罕見的事。', '臺灣的夏天很熱，這是很罕見的事。'], clue: '提示：想一想，「罕見」是很少發生，還是常常發生？', explain: '第一句用得對：沙漠下大雨很少見。臺灣夏天熱是常有的事。' }
      ],
      make: [
        { id: 'pm1', word: '薄暮', clue: '提示：想想看，傍晚時你看到什麼景色？', model: '薄暮的時候，天空被染成橘紅色。' },
        { id: 'pm2', word: '自私自利', clue: '提示：想想看，怎樣的人是只想到自己？', model: '自私自利的人很難交到好朋友。' },
        { id: 'pm3', word: '點醒', clue: '提示：想想看，誰說過讓你突然想通的話？', model: '朋友的一句話點醒了我，讓我不再生氣。' },
        { id: 'pm4', word: '罕見', clue: '提示：想想看，你看過什麼很少見的東西？', model: '我在山上看到一隻罕見的藍鵲。' }
      ]
    },
    pattern: [
      { key: 'yaoshi', id: 'ys', title: '要是……那麼……', img: 'yaoshi.png',
        meaning: '用「要是」、「那麼」，先假設一個情況，再說會有什麼結果。',
        examples: ['要是明天放晴，那麼我們就去露營。'],
        match: [
          { id: 'pt-ys-m1', img: 'pt-snow-day.png', front: '要是明天下雪，', options: ['那麼我們就去堆雪人。', '那麼我們就去游泳。', '那麼天氣會很熱。'], clue: '提示：看看圖片，下雪天可以玩什麼？', explain: '答案是「那麼我們就去堆雪人」：下雪就堆雪人，前後合理。' },
          { id: 'pt-ys-m2', img: 'pt-save-money.png', front: '要是我存夠了零用錢，', options: ['那麼我要買禮物送媽媽。', '那麼我就沒有錢了。', '那麼錢會變少。'], clue: '提示：看看圖片，存夠錢可以做什麼？', explain: '答案是「那麼我要買禮物送媽媽」：存夠錢就買禮物，前後合理。' },
          { id: 'pt-ys-m3', img: 'pt-umbrella.png', front: '要是你忘了帶傘，', options: ['那麼就會被雨淋溼。', '那麼就會很乾爽。', '那麼太陽就出來。'], clue: '提示：看看圖片，沒帶傘遇到下雨會怎樣？', explain: '答案是「那麼就會被雨淋溼」：沒帶傘就會淋溼。' }
        ],
        conj: [
          { id: 'pt-ys-c1', full: '要是大家一起努力，那麼一定能成功。', img: 'pt-teamwork.png', sentence: '＿＿大家一起努力，＿＿一定能成功。', options: ['要是……那麼……', '不但……還……', '有的……有的……有的……'], clue: '提示：先假設，再說結果。數數看有幾個空格。', explain: '答案是「要是……那麼……」：要是大家一起努力，那麼一定能成功。' },
          { id: 'pt-ys-c2', full: '要是天氣好，那麼我們就去放風箏。', img: 'pt-kite.png', sentence: '＿＿天氣好，＿＿我們就去放風箏。', options: ['要是……那麼……', '不但……還……', '有的……有的……有的……'], clue: '提示：先假設，再說結果。數數看有幾個空格。', explain: '答案是「要是……那麼……」：要是天氣好，那麼我們就去放風箏。' }
        ],
        half: [
          { id: 'pt-ys-h1', front: '要是我會變魔術，', clue: '提示：會變魔術以後，你想做什麼？記得要說「那麼」。', model: '那麼我要變出一座遊樂園。' },
          { id: 'pt-ys-h2', front: '要是每個人都節約用水，', clue: '提示：大家節約用水，會有什麼好結果？記得要說「那麼」。', model: '那麼就不怕缺水了。' }
        ],
        whole: [
          { id: 'pt-ys-w1', clue: '提示：用「要是」、「那麼」先假設，再說結果。想想看：要是你有一天可以當老師，你會做什麼？', model: '要是我當一天老師，那麼我要帶大家去戶外上課。' }
        ] },
      { key: 'budanhai', id: 'bh', title: '不但……還……', img: 'budanhai.png',
        meaning: '用「不但」、「還」，先說一件事，再說更多、更進一步的事。',
        examples: ['哥哥不但會煮飯，還會洗衣服。'],
        match: [
          { id: 'pt-bh-m1', img: 'pt-warm-home.png', front: '家裡不但有暖暖的火爐，', options: ['還有好吃的晚餐。', '卻冷得發抖。', '所以大家很冷。'], clue: '提示：看看圖片，家裡還有什麼？', explain: '答案是「還有好吃的晚餐」：火爐之外，還有晚餐。' },
          { id: 'pt-bh-m2', img: 'pt-kind-girl.png', front: '妹妹不但會整理房間，', options: ['還會幫忙洗碗。', '卻不會整理。', '所以很懶。'], clue: '提示：看看圖片，妹妹還會做什麼？', explain: '答案是「還會幫忙洗碗」：整理房間之外，還會洗碗。' },
          { id: 'pt-bh-m3', img: 'pt-gift-card.png', front: '她不但送我禮物，', options: ['還寫了一張卡片。', '卻沒有禮物。', '所以很生氣。'], clue: '提示：看看圖片，除了禮物還有什麼？', explain: '答案是「還寫了一張卡片」：禮物之外，還有卡片。' }
        ],
        conj: [
          { id: 'pt-bh-c1', full: '弟弟不但會彈鋼琴，還會拉小提琴。', img: 'piano.png', sentence: '弟弟＿＿會彈鋼琴，＿會拉小提琴。', options: ['不但……還……', '要是……那麼……', '有的……有的……有的……'], clue: '提示：先說一件事，再說更多。數數看有幾個空格。', explain: '答案是「不但……還……」：弟弟不但會彈鋼琴，還會拉小提琴。' },
          { id: 'pt-bh-c2', full: '這家店不但蛋糕好吃，還送飲料。', img: 'pr-cake.png', sentence: '這家店＿＿蛋糕好吃，＿送飲料。', options: ['不但……還……', '要是……那麼……', '有的……有的……有的……'], clue: '提示：先說一件事，再說更多。數數看有幾個空格。', explain: '答案是「不但……還……」：這家店不但蛋糕好吃，還送飲料。' }
        ],
        half: [
          { id: 'pt-bh-h1', front: '耶誕節晚上，我們不但交換禮物，', clue: '提示：交換禮物之外，還做了什麼？記得要說「還」。', model: '還一起唱歌。' },
          { id: 'pt-bh-h2', front: '我的好朋友不但很會畫畫，', clue: '提示：會畫畫之外，他還會什麼？記得要說「還」。', model: '還很會說故事。' }
        ],
        whole: [
          { id: 'pt-bh-w1', clue: '提示：用「不但」、「還」先說一件事，再說更多。想想看：你的家人有什麼優點？', model: '媽媽不但很會做菜，還很會唱歌。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'sense', name: '摹寫', meaning: '把看到、聽到、聞到、吃到、摸到的感覺，仔細的寫出來，讓人好像也感受到。', example: '課文寫爐火燒得發出爆裂的聲響，讓人好像聽到、也感覺到房間裡的溫暖。',
          show: { sentence: '雪花輕輕飄落，地上一片白茫茫。', mark: ['白茫茫'] },
          yesno: [
            { id: 'rh-se-y1', sentence: '剛烤好的麵包散發出濃濃的奶油香。', answer: true, mark: ['濃濃的奶油香'], clue: '提示：這句話有沒有寫出聞到的味道？', explain: '是摹寫：寫出聞到的香味。' },
            { id: 'rh-se-y2', sentence: '我吃了一個麵包。', answer: false, clue: '提示：這句話有沒有寫出看到、聞到、吃到的感覺？', explain: '不是摹寫：這句話只是說吃了麵包。' }
          ],
          pick: [
            { id: 'rh-se-p1', mark: ['叮噹叮噹'], options: ['鈴鐺叮噹叮噹的響。', '樹上掛著鈴鐺。'], clue: '提示：哪一句寫出了聽到的聲音？', explain: '「叮噹叮噹」是摹寫：寫出聽到的聲音。' },
            { id: 'rh-se-p2', mark: ['金黃色'], options: ['金黃色的燈光照亮客廳。', '客廳開著燈。'], clue: '提示：哪一句寫出了看到的顏色？', explain: '「金黃色」是摹寫：寫出看到的顏色。' },
            { id: 'rh-se-p3', mark: ['冰冰涼涼'], options: ['雪花落在臉上冰冰涼涼的。', '外面在下雪。', '我穿了外套。'], clue: '提示：哪一句寫出了摸到的感覺？', explain: '「冰冰涼涼」是摹寫：寫出摸到的感覺。' },
            { id: 'rh-se-p4', mark: ['甜甜的'], options: ['熱可可喝起來甜甜的。', '我點了一杯熱飲。', '杯子是紅色的。'], clue: '提示：哪一句寫出了喝到的味道？', explain: '「甜甜的」是摹寫：寫出喝到的味道。' },
            { id: 'rh-se-p5', mark: ['香噴噴'], options: ['烤雞香噴噴的。', '桌上有烤雞。', '晚餐快好了。', '父親在切肉。'], clue: '提示：哪一句寫出了聞到的味道？', explain: '「香噴噴」是摹寫：寫出聞到的味道。' },
            { id: 'rh-se-p6', mark: ['沙沙沙'], options: ['風吹過樹葉，沙沙沙的響。', '外面在颳風。', '樹很高。', '我關上窗戶。'], clue: '提示：哪一句寫出了聽到的聲音？', explain: '「沙沙沙」是摹寫：寫出聽到的聲音。' }
          ] },
        { key: 'question', name: '設問', meaning: '用問句來說話，引起大家注意。有時自己問、自己回答；有時只問不答，答案就藏在問題裡。', example: '姐妹們問：沒有禮物的節日，還算是節日嗎？用問題說出心裡的不滿，答案就藏在問題裡。',
          show: { sentence: '什麼是最好的禮物？是家人的陪伴。' },
          yesno: [
            { id: 'rh-qu-y1', sentence: '你知道冬天為什麼會下雪嗎？因為天氣太冷，水氣結成冰了。', answer: true, clue: '提示：這句話是不是先問一個問題，再自己回答？', explain: '是設問：先問一個問題，再自己回答。' },
            { id: 'rh-qu-y2', sentence: '冬天會下雪。', answer: false, clue: '提示：這句話裡有沒有問題？', explain: '不是設問：這句話沒有用問句。' }
          ],
          pick: [
            { id: 'rh-qu-p1', options: ['誰最疼我？是媽咪。', '媽咪很疼我。'], clue: '提示：哪一句先問問題，再自己回答？', explain: '先問「誰最疼我」，再回答，是設問。' },
            { id: 'rh-qu-p2', options: ['誰不想要一個溫暖的家呢？', '我有一個溫暖的家。'], clue: '提示：哪一句用問題來說話？', explain: '「誰不想要一個溫暖的家呢」是設問：答案藏在問題裡。' },
            { id: 'rh-qu-p3', options: ['為什麼要珍惜家人？因為家人最愛我們。', '我們要珍惜家人。', '家人很重要。'], clue: '提示：哪一句先問「為什麼」，再自己回答？', explain: '先問再答，是設問。' },
            { id: 'rh-qu-p4', options: ['你收過最特別的禮物是什麼？', '我收到一個禮物。', '禮物用紙包著。'], clue: '提示：哪一句用問題引起大家注意？', explain: '「你收過最特別的禮物是什麼」是設問。' },
            { id: 'rh-qu-p5', options: ['禮物一定要花錢嗎？不一定。', '禮物要花錢買。', '我去買禮物。', '店裡人很多。'], clue: '提示：哪一句先問問題，再說出答案？', explain: '先問「禮物一定要花錢嗎」，再回答，是設問。' },
            { id: 'rh-qu-p6', options: ['還有什麼比全家團聚更幸福呢？', '全家人在一起。', '晚餐很豐盛。', '桌上有蛋糕。'], clue: '提示：哪一句用問題來說話，答案藏在問題裡？', explain: '答案藏在問題裡：全家團聚最幸福，是設問。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '爐子裡的木頭劈劈啪啪的燒著。', answer: '摹寫', mark: ['劈劈啪啪'], clue: '提示：這句話有沒有寫出聽到的聲音？', explain: '答案是「摹寫」：寫出燒木頭的聲音。' },
        { id: 'rh2', sentence: '窗外的雪地白得發亮。', answer: '摹寫', mark: ['白得發亮'], clue: '提示：這句話有沒有寫出看到的顏色？', explain: '答案是「摹寫」：寫出看到的顏色。' },
        { id: 'rh3', sentence: '什麼最讓人開心？就是收到家人的信。', answer: '設問', clue: '提示：這句話是不是先問問題，再自己回答？', explain: '答案是「設問」：先問再答。' },
        { id: 'rh4', sentence: '沒有禮物的節日，還能快樂嗎？', answer: '設問', clue: '提示：這句話是不是用問題來說話？', explain: '答案是「設問」：用問題說出想法。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L10 = d; }
})(this);
