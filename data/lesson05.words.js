/* 第 5 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'infer', qe: 'infer', qf: 'infer', qg: 'interpret', qh: 'interpret',
      qi: 'evaluate', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qg: { think: ['作者寫水果從發芽、開花到結果，要花多少時間？', '這和店裡很快調好的飲料有什麼不一樣？'], why: '作者想說：好吃的水果要經過陽光、黑夜和很長的時間才長成，味道是自然的；調出來的飲料靠化學香料和色素，沒有真正的食物味道。' },
      qh: { think: ['孩子們喝完果汁，還做了什麼動作？', '這個動作代表他們覺得果汁好不好喝？'], why: '孩子們連杯底剩下的一點點都不放過，表示他們非常喜歡；作者看到了，覺得自己的用心沒有白費，所以很開心。' },
      qi: { think: ['媽媽為什麼只讓作者試果醬的味道？', '被大人信任的時候，你有什麼感覺？'], why: '媽媽相信作者的判斷，讓她決定果醬什麼時候煮好。被信任、被肯定，會讓人覺得自己做得到，慢慢就有了自信。' },
      qj: { think: ['你喝過自己做的果汁嗎？和買來的有什麼不同？', '你覺得應該常常喝手搖飲嗎？為什麼？'], why: '自己做的果汁看得到用了什麼材料，味道比較自然；買來的飲料常加很多糖和香料。說出你的選擇和理由就可以。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['我記得外婆包的粽子，每次聞到就想起她。', '我記得爸爸煮的番茄蛋花湯，酸酸甜甜的。'], bad: ['我不記得吃過任何東西。', '我最喜歡的是電動玩具。'], why: '題目問的是讓你難忘的家鄉或家人的味道。說出一道食物和它讓你想起的人或事，就是好回答。說不記得、講玩具，都沒有回答到題目。' },
      k2: { good: ['我想做香蕉牛奶，因為簡單又營養。', '我想做西瓜汁，夏天喝很消暑。'], bad: ['我想買一杯色素很多的飲料就好。', '我什麼都不想做。'], why: '題目問的是你想親手做什麼天然的飲料或點心。說出做什麼和原因，就是好回答。只想買色素飲料、什麼都不做，都沒有回答到題目。' }
    },
    hanzi: [
      { id: 'h-削', combo: { layout: 'lr', parts: [['肖', 's', ''], ['刂', 'm', '刀']] }, char: '削', zhuyin: 'ㄒㄩㄝ', radical: '刀', strokes: 9, words: ['削皮', '削鉛筆'], say: '削，削鉛筆的削', cloze: '＿鉛筆', img: 'peel-fruit.png', options: ['削', '消', '肖', '銷'], clue: '這個字的右邊是立刀旁。', explain: '答案是「削」，右邊是立刀旁；「消」的左邊是三點水，「銷」的左邊是金字旁。', parts: ['肖', '刂'], story: '左邊的「肖」念起來有點像「削」，右邊是刀。用刀把東西的表面一片片去掉，就是「削」。', sentence: '我用削鉛筆機把鉛筆削尖。', build: { layout: 'lr', show: ['肖', '？'], answer: '刂', options: ['刂', '氵', '金', '亻'], clue: '想一想：把皮去掉要用什麼工具？' } },
      { id: 'h-沫', combo: { layout: 'lr', parts: [['氵', 'm', '水'], ['末', 's', '']] }, char: '沫', zhuyin: 'ㄇㄛˋ', radical: '水', strokes: 8, words: ['泡沫', '口沫'], say: '沫，泡沫的沫', cloze: '泡＿', img: 'soap-bubbles.png', options: ['沫', '末', '抹', '妹'], clue: '這個字的左邊是三點水。', explain: '答案是「沫」，左邊是三點水；「抹」的左邊是提手旁，「妹」的左邊是女字旁。', parts: ['氵', '末'], story: '左邊是水，右邊的「末」念起來像「沫」。水裡冒出一堆小氣泡，就是「泡沫」。', sentence: '洗碗精搓一搓，冒出好多白白的泡沫。', build: { layout: 'lr', show: ['？', '末'], answer: '氵', options: ['氵', '扌', '女', '木'], clue: '想一想：小氣泡是從什麼裡面冒出來的？' } },
      { id: 'h-茶', combo: { type: '形聲字', pict: '上面是草字頭，表示是植物；下面念起來有點像「茶」。用這種植物的葉子泡成的飲料，就是「茶」。' }, char: '茶', zhuyin: 'ㄔㄚˊ', radical: '艸', strokes: 10, words: ['下午茶', '茶葉'], say: '茶，茶葉的茶', cloze: '＿葉', img: 'tea-cup.png', options: ['茶', '荼', '查', '搽'], clue: '這個字的上面是草字頭，下面有「木」。', explain: '答案是「茶」；「荼」的下面是「余」，「查」的上面是「木」。', parts: ['艹', '人', '木'], story: '上面是草，中間是人，下面是木。人採下樹上的嫩葉，泡成好喝的飲料，就是「茶」。', sentence: '爺爺每天早上都要喝一杯熱茶。' },
      { id: 'h-嗅', combo: { layout: 'lr', parts: [['口', 'm', '嘴巴'], ['臭', 's', '']] }, char: '嗅', zhuyin: 'ㄒㄧㄡˋ', radical: '口', strokes: 13, words: ['嗅到', '嗅覺'], say: '嗅，嗅覺的嗅', cloze: '＿覺', img: 'dog-sniff.png', options: ['嗅', '臭', '糗', '齅'], clue: '這個字的左邊是口字旁。', explain: '答案是「嗅」，左邊是口字旁；「臭」沒有口字旁，「糗」的左邊是米字旁。', parts: ['口', '臭'], story: '左邊是口，右邊的「臭」原本是狗用鼻子聞東西的樣子。用鼻子去聞，就是「嗅」。', sentence: '小狗的嗅覺很靈敏。', build: { layout: 'lr', show: ['？', '臭'], answer: '口', options: ['口', '米', '氵', '扌'], clue: '想一想：聞東西時，鼻子下面張開的是什麼？' } },
      { id: 'h-按', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['安', 's', '']] }, char: '按', zhuyin: 'ㄢˋ', radical: '手', strokes: 9, words: ['按下', '按鈕'], say: '按，按鈕的按', cloze: '＿鈕', img: 'press-button.png', options: ['按', '安', '案', '鞍'], clue: '這個字的左邊是提手旁。', explain: '答案是「按」，左邊是提手旁；「安」沒有提手旁，「案」的下面是「木」。', parts: ['扌', '安'], story: '左邊是手，右邊的「安」念起來像「按」。用手指往下壓，就是「按」。', sentence: '我按下電梯的按鈕。', build: { layout: 'lr', show: ['？', '安'], answer: '扌', options: ['扌', '木', '革', '金'], clue: '想一想：往下壓要用身體的哪個部分？' } },
      { id: 'h-碎', combo: { layout: 'lr', parts: [['石', 'm', '石頭'], ['卒', 's', '']] }, char: '碎', zhuyin: 'ㄙㄨㄟˋ', radical: '石', strokes: 13, words: ['粉身碎骨', '碎片'], say: '碎，碎片的碎', cloze: '＿片', img: 'broken-cup.png', options: ['碎', '醉', '卒', '翠'], clue: '這個字的左邊是石字旁。', explain: '答案是「碎」，左邊是石字旁；「醉」的左邊是「酉」，「翠」的上面是「羽」。', parts: ['石', '卒'], story: '左邊是石頭，右邊的「卒」念起來有點像「碎」。石頭被敲成一小塊一小塊，就是「碎」。', sentence: '杯子掉在地上，摔成好多碎片。', build: { layout: 'lr', show: ['？', '卒'], answer: '石', options: ['石', '酉', '羽', '口'], clue: '想一想：被敲成一小塊一小塊的，常常是什麼？' } },
      { id: 'h-舍', combo: { type: '象形字', pict: '「舍」像一間有屋頂、有柱子的小房子，是讓人住下來休息的地方。' }, char: '舍', zhuyin: 'ㄕㄜˋ', radical: '舌', strokes: 8, words: ['退避三舍', '宿舍'], say: '舍，宿舍的舍', cloze: '宿＿', img: 'dormitory.png', options: ['舍', '捨', '舌', '拾'], clue: '這個字像一間有屋頂的小房子，左邊沒有提手旁。', explain: '答案是「舍」；「捨」的左邊多了提手旁，「舌」的上面只有一撇。', parts: ['人', '舌'], story: '上面像屋頂，下面像房子的柱子和門。讓人住的房子，就是「舍」；學生住的地方叫「宿舍」。', sentence: '哥哥上大學後住在學校的宿舍。' },
      { id: 'h-熬', combo: { layout: 'tb', parts: [['敖', 's', ''], ['灬', 'm', '火']] }, char: '熬', zhuyin: 'ㄠˊ', radical: '火', strokes: 15, words: ['熬煮', '熬夜'], say: '熬，熬夜的熬', cloze: '＿夜', img: 'slow-cook.png', options: ['熬', '敖', '傲', '遨'], clue: '這個字的下面是四點火。', explain: '答案是「熬」，下面是四點火；「傲」的左邊是單人旁，「遨」有辵字旁。', parts: ['敖', '灬'], story: '上面的「敖」念起來像「熬」，下面是火。用小火慢慢煮很久，就是「熬」；很晚還不睡，叫「熬夜」。', sentence: '外婆用大骨熬了一鍋湯。', build: { layout: 'tb', show: ['敖', '？'], answer: '灬', options: ['灬', '心', '木', '日'], clue: '想一想：鍋子下面燒的是什麼？' } },
      { id: 'h-砂', combo: { layout: 'lr', parts: [['石', 'm', '石頭'], ['少', 's', '']] }, char: '砂', zhuyin: 'ㄕㄚ', radical: '石', strokes: 9, words: ['砂糖', '砂紙'], say: '砂，砂紙的砂', cloze: '＿紙', img: 'sugar-bowl.png', options: ['砂', '沙', '吵', '炒'], clue: '這個字的左邊是石字旁。', explain: '答案是「砂」，左邊是石字旁；「沙」的左邊是三點水，「吵」的左邊是口字旁。', parts: ['石', '少'], story: '左邊是石頭，右邊是「少」。石頭變成很少很小的顆粒，就是「砂」；細細的糖叫「砂糖」。', sentence: '木工用砂紙把木板磨得光滑。', build: { layout: 'lr', show: ['？', '少'], answer: '石', options: ['石', '氵', '口', '火'], clue: '想一想：很小很小的顆粒，是從什麼磨下來的？' } },
      { id: 'h-混', combo: { layout: 'lr', parts: [['氵', 'm', '水'], ['昆', 's', '']] }, char: '混', zhuyin: 'ㄏㄨㄣˋ', radical: '水', strokes: 11, words: ['混合', '混亂'], say: '混，混亂的混', cloze: '＿亂', img: 'mix-colors.png', options: ['混', '昆', '棍', '餛'], clue: '這個字的左邊是三點水。', explain: '答案是「混」，左邊是三點水；「棍」的左邊是木字旁，「餛」的左邊是食字旁。', parts: ['氵', '昆'], story: '左邊是水，右邊的「昆」念起來有點像「混」。把水和別的東西攪在一起，分不清楚，就是「混」。', sentence: '紅色和黃色混在一起，變成橘色。', build: { layout: 'lr', show: ['？', '昆'], answer: '氵', options: ['氵', '木', '食', '言'], clue: '想一想：攪在一起分不清楚，常常和什麼有關？' } },
      { id: 'h-焦', combo: { type: '會意字', pict: '上面的「隹」是一隻短尾巴的鳥，下面是火。鳥放在火上烤，烤得黑黑的，就是「焦」。' }, char: '焦', zhuyin: 'ㄐㄧㄠ', radical: '火', strokes: 12, words: ['焦糖', '燒焦'], say: '焦，燒焦的焦', cloze: '燒＿', img: 'caramel.png', options: ['焦', '蕉', '礁', '瞧'], clue: '這個字的上面是「隹」，下面是四點火。', explain: '答案是「焦」；「蕉」的上面多了草字頭，「瞧」的左邊是目字旁。', parts: ['隹', '灬'], story: '上面是一隻鳥，下面是火。放在火上烤太久，變黑了，就是「燒焦」。', sentence: '麵包烤太久，邊邊都燒焦了。' },
      { id: 'h-舀', combo: { type: '會意字', pict: '上面的「爫」像一隻手，下面的「臼」像一個容器。用手從容器裡把東西挖出來，就是「舀」。' }, char: '舀', zhuyin: 'ㄧㄠˇ', radical: '臼', strokes: 10, words: ['舀湯', '舀水'], say: '舀，舀水的舀', cloze: '＿水', img: 'ladle-soup.png', options: ['舀', '稻', '蹈', '滔'], clue: '這個字的上面像一隻手，下面是「臼」。', explain: '答案是「舀」；「稻」的左邊是禾字旁，「蹈」的左邊是足字旁。', parts: ['爫', '臼'], story: '上面是手，下面是容器。用手拿勺子，從鍋裡把湯盛起來，就是「舀」。', sentence: '阿姨用大湯匙舀了一碗玉米濃湯。' },
      { id: 'h-勺', combo: { type: '象形字', pict: '「勺」像一支有長柄的湯匙，裡面那一點是盛著的東西。' }, char: '勺', zhuyin: 'ㄕㄠˊ', radical: '勹', strokes: 3, words: ['湯勺', '勺子'], say: '勺，勺子的勺', cloze: '＿子', img: 'ladle.png', options: ['勺', '匀', '句', '勾'], clue: '這個字只有三畫，裡面是一點。', explain: '答案是「勺」；「匀」裡面是兩橫，「勾」裡面是「厶」。', parts: ['勹', '丶'], story: '外面像彎彎的湯匙，裡面那一點是盛起來的湯。用來舀東西的器具，就是「勺子」。', sentence: '請把湯勺放回鍋子旁邊。' },
      { id: 'h-熄', combo: { layout: 'lr', parts: [['火', 'm', '火'], ['息', 's', '']] }, char: '熄', zhuyin: 'ㄒㄧˊ', radical: '火', strokes: 14, words: ['熄滅', '熄燈'], say: '熄，熄燈的熄', cloze: '＿燈', img: 'blow-candle.png', options: ['熄', '息', '媳', '瘜'], clue: '這個字的左邊是火字旁。', explain: '答案是「熄」，左邊是火字旁；「息」沒有火字旁，「媳」的左邊是女字旁。', parts: ['火', '息'], story: '左邊是火，右邊是「息」，有停下來的意思。火停下來不燒了，就是「熄」。', sentence: '晚上十點，宿舍準時熄燈。', build: { layout: 'lr', show: ['？', '息'], answer: '火', options: ['火', '女', '口', '木'], clue: '想一想：停下來不燒的是什麼？' } },
      { id: 'h-騰', combo: { type: '形聲字', pict: '右下角是「馬」，其他部分念起來像「騰」。馬兒跳起來往前奔跑，就是「騰」。' }, char: '騰', zhuyin: 'ㄊㄥˊ', radical: '馬', strokes: 20, words: ['熱騰騰', '奔騰'], say: '騰，奔騰的騰', cloze: '奔＿', img: 'running-horses.png', options: ['騰', '藤', '謄', '勝'], clue: '這個字的右下角是「馬」。', explain: '答案是「騰」，右下角是「馬」；「藤」的上面是草字頭，「謄」的下面是「言」。', parts: ['月', '龹', '馬'], story: '右下角是馬，其他部分念起來像「騰」。馬兒跳起來往前衝，就是「奔騰」；熱氣一直往上冒，叫「熱騰騰」。', sentence: '草原上有一群野馬在奔騰。' },
      { id: 'h-啜', combo: { layout: 'lr', parts: [['口', 'm', '嘴巴'], ['叕', 's', '']] }, char: '啜', zhuyin: 'ㄔㄨㄛˋ', radical: '口', strokes: 11, words: ['啜飲', '啜泣'], say: '啜，啜泣的啜', cloze: '＿泣', img: 'sip-drink.png', options: ['啜', '綴', '輟', '掇'], clue: '這個字的左邊是口字旁。', explain: '答案是「啜」，左邊是口字旁；「綴」的左邊是糸字旁，「輟」的左邊是車字旁。', parts: ['口', '叕'], story: '左邊是口，右邊的「叕」念起來有點像「啜」。用嘴巴一小口一小口的喝，就是「啜」；小聲的哭，叫「啜泣」。', sentence: '她躲在角落小聲的啜泣。', build: { layout: 'lr', show: ['？', '叕'], answer: '口', options: ['口', '糸', '車', '扌'], clue: '想一想：喝東西要用臉上的哪個部分？' } },
      { id: 'h-淌', combo: { layout: 'lr', parts: [['氵', 'm', '水'], ['尚', 's', '']] }, char: '淌', zhuyin: 'ㄊㄤˇ', radical: '水', strokes: 11, words: ['流淌', '淌下'], say: '淌，流淌的淌', cloze: '流＿', img: 'juice-flow.png', options: ['淌', '倘', '躺', '趟'], clue: '這個字的左邊是三點水。', explain: '答案是「淌」，左邊是三點水；「躺」的左邊是「身」，「倘」的左邊是單人旁。', parts: ['氵', '尚'], story: '左邊是水，右邊的「尚」念起來有點像「淌」。水往下流個不停，就是「淌」。', sentence: '熱得滿頭大汗，汗水不停的往下淌。', build: { layout: 'lr', show: ['？', '尚'], answer: '氵', options: ['氵', '身', '亻', '走'], clue: '想一想：往下流個不停的是什麼？' } },
      { id: 'h-沛', combo: { type: '形聲字', pict: '左邊是三點水，右邊的「巿」念起來有點像「沛」。水很多、很充足，就是「沛」。' }, char: '沛', zhuyin: 'ㄆㄟˋ', radical: '水', strokes: 7, words: ['豐沛', '充沛'], say: '沛，充沛的沛', cloze: '充＿', img: 'full-river.png', options: ['沛', '肺', '柿', '市'], clue: '這個字的左邊是三點水。', explain: '答案是「沛」，左邊是三點水；「肺」的左邊是月字旁，「柿」的左邊是木字旁。', parts: ['氵', '巿'], story: '左邊是水，右邊念起來有點像「沛」。水很多、滿滿的，就是「豐沛」；力氣很足，叫「精力充沛」。', sentence: '睡飽了，弟弟一整天精力充沛。' },
      { id: 'h-舔', combo: { layout: 'lr', parts: [['舌', 'm', '舌頭'], ['忝', 's', '']] }, char: '舔', zhuyin: 'ㄊㄧㄢˇ', radical: '舌', strokes: 14, words: ['舔乾淨', '舔嘴唇'], say: '舔，舔嘴唇的舔', cloze: '＿嘴唇', img: 'lick-icecream.png', options: ['舔', '添', '甜', '恬'], clue: '這個字的左邊是「舌」。', explain: '答案是「舔」，左邊是「舌」；「添」的左邊是三點水，「恬」的左邊是豎心旁。', parts: ['舌', '忝'], story: '左邊是舌頭，右邊的「忝」念起來像「舔」。伸出舌頭碰東西，就是「舔」。', sentence: '小貓伸出舌頭舔牛奶。', build: { layout: 'lr', show: ['？', '忝'], answer: '舌', options: ['舌', '氵', '忄', '口'], clue: '想一想：伸出來碰東西的是什麼？' } }
    ],
    vocab: [
      { id: 'v-削皮', cloze: true, clozeOptions: ['削皮', '曬衣', '寫字', '跑步'], word: '削皮', meaning: '用刀把水果外面那一層去掉。', example: '蘋果要先＿＿再切塊。', img: 'peel-fruit.png', options: ['削皮', '熬煮', '混合', '啜飲'] },
      { id: 'v-泡沫', cloze: true, clozeOptions: ['泡沫', '石頭', '木塊', '鐵釘'], word: '泡沫', meaning: '聚在一起的許多小氣球般的顆粒。', example: '洗澡時，身上都是肥皂＿＿。', img: 'soap-bubbles.png', options: ['泡沫', '砂糖', '焦糖', '豐沛'] },
      { id: 'v-下午茶', cloze: true, clozeOptions: ['下午茶', '早餐', '宵夜', '晚餐'], word: '下午茶', meaning: '中飯和晚飯之間吃的小點心和飲料。', example: '三點了，我們來吃＿＿＿吧。', img: 'tea-cup.png', options: ['下午茶', '泡沫', '砂糖', '焦糖'] },
      { id: 'v-嗅覺', cloze: true, clozeOptions: ['嗅覺', '聽力', '視力', '腳力'], word: '嗅覺', meaning: '用鼻子分辨氣味的能力。', example: '狗的＿＿很靈敏，可以幫忙找東西。', img: 'dog-sniff.png', options: ['嗅覺', '泡沫', '啜飲', '流淌'] },
      { id: 'v-按鈕', cloze: true, clozeOptions: ['按鈕', '窗戶', '樓梯', '屋頂'], word: '按鈕', meaning: '機器上用手指壓下去就能開關的小東西。', example: '只要壓一下＿＿，果汁機就會轉動。', img: 'press-button.png', options: ['按鈕', '湯勺', '砂糖', '泡沫'] },
      { id: 'v-粉身碎骨', cloze: true, clozeOptions: ['粉身碎骨', '完好如初', '毫髮無傷', '安然無恙'], word: '粉身碎骨', meaning: '整個被打得四分五裂；也比喻犧牲生命。', example: '花瓶從高處掉下來，摔得＿＿＿＿。', img: 'broken-cup.png', options: ['粉身碎骨', '退避三舍', '四面八方', '熱騰騰'] },
      { id: 'v-退避三舍', cloze: true, clozeOptions: ['退避三舍', '勇往直前', '迎頭趕上', '一馬當先'], word: '退避三舍', meaning: '害怕或為了不起衝突，主動躲開讓步。', example: '弟弟一看到苦瓜就＿＿＿＿。', img: 'kid-avoid.png', options: ['退避三舍', '粉身碎骨', '四面八方', '雀躍'] },
      { id: 'v-熬煮', cloze: true, clozeOptions: ['熬煮', '生吃', '冷凍', '丟掉'], word: '熬煮', meaning: '用小火慢慢加熱很久。', example: '這鍋湯＿＿了三個小時，好香。', img: 'slow-cook.png', options: ['熬煮', '削皮', '混合', '啜飲'] },
      { id: 'v-砂糖', cloze: true, clozeOptions: ['砂糖', '鹽巴', '醬油', '辣椒'], word: '砂糖', meaning: '一顆一顆細細的、吃起來甜甜的調味料。', example: '做蛋糕要加一點＿＿。', img: 'sugar-bowl.png', options: ['砂糖', '焦糖', '泡沫', '湯勺'] },
      { id: 'v-混合', cloze: true, clozeOptions: ['混合', '分開', '拆散', '隔離'], word: '混合', meaning: '把不同的東西攪在一起。', example: '把紅色和藍色顏料＿＿，就變成紫色。', img: 'mix-colors.png', options: ['混合', '熬煮', '削皮', '流淌'] },
      { id: 'v-焦糖', cloze: true, clozeOptions: ['焦糖', '冰塊', '牛奶', '開水'], word: '焦糖', meaning: '把甜的調味料加熱煮成的咖啡色物質，聞起來很香。', example: '布丁上面有一層＿＿。', img: 'caramel.png', options: ['焦糖', '砂糖', '泡沫', '下午茶'] },
      { id: 'v-湯勺', cloze: true, clozeOptions: ['湯勺', '剪刀', '鉛筆', '雨傘'], word: '湯勺', meaning: '有長柄、用來盛起液體的大匙子。', example: '媽媽用＿＿幫大家盛湯。', img: 'ladle.png', options: ['湯勺', '按鈕', '砂糖', '焦糖'] },
      { id: 'v-舀湯', cloze: true, clozeOptions: ['舀湯', '倒垃圾', '掃地', '關門'], word: '舀湯', meaning: '用大匙子把鍋裡的熱汁盛起來。', example: '阿姨拿起湯勺，幫我＿＿。', img: 'ladle-soup.png', options: ['舀湯', '熬煮', '削皮', '啜飲'] },
      { id: 'v-熄滅', cloze: true, clozeOptions: ['熄滅', '點燃', '燒起', '亮起'], word: '熄滅', meaning: '火或燈停止燃燒、不亮了。', example: '一陣風吹來，蠟燭就＿＿了。', img: 'blow-candle.png', options: ['熄滅', '熬煮', '混合', '流淌'] },
      { id: 'v-熱騰騰', cloze: true, clozeOptions: ['熱騰騰', '冷冰冰', '涼颼颼', '硬梆梆'], word: '熱騰騰', meaning: '很燙、一直冒著白煙的樣子。', example: '冬天喝一碗＿＿＿的湯，全身都暖了。', img: 'hot-soup.png', options: ['熱騰騰', '豐沛', '雀躍', '四面八方'] },
      { id: 'v-啜飲', cloze: true, clozeOptions: ['啜飲', '大吼', '奔跑', '跳舞'], word: '啜飲', meaning: '一小口一小口慢慢的喝。', example: '爺爺坐在窗邊，慢慢＿＿一杯熱茶。', img: 'sip-drink.png', options: ['啜飲', '熬煮', '削皮', '混合'] },
      { id: 'v-流淌', cloze: true, clozeOptions: ['流淌', '凍結', '停住', '乾掉'], word: '流淌', meaning: '液體不停的往下或往前移動。', example: '咬一口西瓜，甜甜的汁＿＿下來。', img: 'juice-flow.png', options: ['流淌', '熄滅', '混合', '熬煮'] },
      { id: 'v-豐沛', cloze: true, clozeOptions: ['豐沛', '缺乏', '稀少', '乾枯'], word: '豐沛', meaning: '非常多、非常充足。', example: '今年雨水＿＿，水庫都滿了。', img: 'full-river.png', options: ['豐沛', '雀躍', '熱騰騰', '泡沫'] },
      { id: 'v-舔乾淨', cloze: true, clozeOptions: ['舔乾淨', '丟掉', '打翻', '弄髒'], word: '舔乾淨', meaning: '用舌頭把殘留的東西全部吃掉，一點都不剩。', example: '小狗把碗裡的飼料＿＿＿＿，好像還想吃。', img: 'lick-icecream.png', options: ['舔乾淨', '熄滅', '削皮', '啜飲'] },
      { id: 'v-四面八方', cloze: true, clozeOptions: ['四面八方', '一個角落', '同一個點', '正中央'], word: '四面八方', meaning: '周圍的每一個角落。', example: '一聽到放學鐘聲，學生從＿＿＿＿湧向校門。', img: 'crowd-gather.png', options: ['四面八方', '退避三舍', '粉身碎骨', '雀躍'] },
      { id: 'v-雀躍', cloze: true, clozeOptions: ['雀躍', '難過', '生氣', '害怕'], word: '雀躍', meaning: '高興得像小鳥一樣跳起來。', example: '聽說要去遊樂園，大家都＿＿不已。', img: 'kids-jump.png', options: ['雀躍', '豐沛', '熱騰騰', '退避三舍'] }
    ],
    charwords: [
      { id: 'cw-削', char: '削', img: 'peel-fruit.png', charMeaning: '用刀把表面去掉。', word: '削鉛筆', meaning: '把鉛筆的木頭去掉一些，露出尖尖的筆心。', example: '寫字前，我先＿＿＿把筆弄尖。', options: ['削鉛筆', '口沫', '茶葉', '嗅到'] },
      { id: 'cw-沫', char: '沫', img: 'soap-bubbles.png', charMeaning: '小小的氣泡。', word: '口沫', meaning: '說話時從嘴裡噴出來的口水。', example: '他說得太激動，＿＿都噴出來了。', options: ['口沫', '按下', '碎片', '宿舍'] },
      { id: 'cw-茶', char: '茶', img: 'tea-cup.png', charMeaning: '一種植物的葉子泡成的飲料。', word: '茶葉', meaning: '可以拿來泡成飲料的乾葉子。', example: '阿公把＿＿放進壺裡，倒入熱水。', options: ['茶葉', '熬夜', '砂紙', '混亂'] },
      { id: 'cw-嗅', char: '嗅', img: 'dog-sniff.png', charMeaning: '用鼻子聞。', word: '嗅到', meaning: '用鼻子聞到。', example: '一進家門，我就＿＿咖哩的香味。', options: ['嗅到', '燒焦', '舀水', '勺子'] },
      { id: 'cw-按', char: '按', img: 'press-button.png', charMeaning: '用手往下壓。', word: '按下', meaning: '用手指往下壓。', example: '他＿＿門鈴，等人來開門。', options: ['按下', '熄燈', '奔騰', '啜泣'] },
      { id: 'cw-碎', char: '碎', img: 'broken-cup.png', charMeaning: '破成小塊。', word: '碎片', meaning: '東西破掉後的小塊。', example: '小心地上的玻璃＿＿。', options: ['碎片', '淌下', '充沛', '舔嘴唇'] },
      { id: 'cw-舍', char: '舍', img: 'dormitory.png', charMeaning: '讓人住的房子。', word: '宿舍', meaning: '學校或公司給人住的房子。', example: '姊姊住在大學的＿＿裡。', options: ['宿舍', '削鉛筆', '口沫', '茶葉'] },
      { id: 'cw-熬', char: '熬', img: 'slow-cook.png', charMeaning: '用小火慢慢煮；忍著撐下去。', word: '熬夜', meaning: '到了很晚還不睡覺。', example: '常常＿＿對身體不好。', options: ['熬夜', '嗅到', '按下', '碎片'] },
      { id: 'cw-砂', char: '砂', img: 'sugar-bowl.png', charMeaning: '很細小的顆粒。', word: '砂紙', meaning: '表面粗粗的、可以把東西磨光滑的紙。', example: '用＿＿把桌子邊邊磨平。', options: ['砂紙', '宿舍', '熬夜', '混亂'] },
      { id: 'cw-混', char: '混', img: 'mix-colors.png', charMeaning: '攪在一起，分不清楚。', word: '混亂', meaning: '沒有秩序，亂成一團。', example: '停電了，百貨公司裡一片＿＿。', options: ['混亂', '燒焦', '舀水', '勺子'] },
      { id: 'cw-焦', char: '焦', img: 'caramel.png', charMeaning: '燒到變黑。', word: '燒焦', meaning: '烤或煮太久，變黑了。', example: '魚煎太久，都＿＿了。', options: ['燒焦', '熄燈', '奔騰', '啜泣'] },
      { id: 'cw-舀', char: '舀', img: 'ladle-soup.png', charMeaning: '用勺子盛起來。', word: '舀水', meaning: '用容器把水盛起來。', example: '農夫從水桶裡＿＿澆菜。', options: ['舀水', '淌下', '充沛', '舔嘴唇'] },
      { id: 'cw-勺', char: '勺', img: 'ladle.png', charMeaning: '有長柄的湯匙。', word: '勺子', meaning: '用來盛東西的有柄器具。', example: '請拿一支＿＿給我舀湯。', options: ['勺子', '削鉛筆', '口沫', '茶葉'] },
      { id: 'cw-熄', char: '熄', img: 'blow-candle.png', charMeaning: '火停止燃燒。', word: '熄燈', meaning: '把燈關掉。', example: '晚上九點，營區＿＿睡覺。', options: ['熄燈', '嗅到', '按下', '碎片'] },
      { id: 'cw-騰', char: '騰', img: 'running-horses.png', charMeaning: '往上冒；跳起來跑。', word: '奔騰', meaning: '像馬一樣快速往前衝。', example: '大河的水＿＿著流向大海。', options: ['奔騰', '宿舍', '熬夜', '砂紙'] },
      { id: 'cw-啜', char: '啜', img: 'sip-drink.png', charMeaning: '小口的喝；小聲的哭。', word: '啜泣', meaning: '小聲的哭。', example: '找不到媽媽的小孩在路邊＿＿。', options: ['啜泣', '混亂', '燒焦', '舀水'] },
      { id: 'cw-淌', char: '淌', img: 'juice-flow.png', charMeaning: '往下流。', word: '淌下', meaning: '一直往下流。', example: '汗水從他的額頭＿＿。', options: ['淌下', '勺子', '熄燈', '奔騰'] },
      { id: 'cw-沛', char: '沛', img: 'full-river.png', charMeaning: '很多、很充足。', word: '充沛', meaning: '非常足夠。', example: '運動員的體力很＿＿。', options: ['充沛', '啜泣', '削鉛筆', '口沫'] },
      { id: 'cw-舔', char: '舔', img: 'lick-icecream.png', charMeaning: '用舌頭碰。', word: '舔嘴唇', meaning: '伸出舌頭在嘴巴邊緣碰一碰。', example: '看到蛋糕，弟弟忍不住＿＿＿。', options: ['舔嘴唇', '茶葉', '嗅到', '按下'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-相濡以沫', situationImg: 'id-help-each.png',
        anim: { bg: 'park', a: { f1: ['🐟', 36, 64, 11], f2: ['🐟', 62, 64, 11], sun: ['☀️', 82, 16, 12], drop: ['💧', 50, 52, 8, 'h'], heart: ['💗', 50, 36, 9, 'h'] },
          s: [['天氣好熱，小池塘的水都快乾了。', [['wig', 'sun']]],
            ['兩條小魚只剩一點點水。', [['shake', 'f1'], ['shake', 'f2']]],
            ['牠們用口中的水幫對方保持溼潤，', [['in', 'drop'], ['bob', 'drop']]],
            ['在困難中互相幫忙，就是相濡以沫。', [['in', 'heart'], ['pop', 'heart']]]] },
        idiom: '相濡以沫', char: '沫', meaning: '在困難的時候，彼此用小小的力量互相幫忙。', example: '颱風過後，鄰居們相濡以沫，一起把家園整理好。', situation: '池塘快乾了，兩條小魚用口中的水幫對方保持溼潤。',
        fill: { options: ['那段辛苦的日子，一家人＿＿＿＿，撐了過來。', '他們一見面就吵架，從來不肯＿＿＿＿。'], clue: '提示：哪一句是困難時互相幫忙？', explain: '第一句用得對：辛苦時一家人互相幫忙。一見面就吵架，剛好相反。' } },
      { id: 'i-粗茶淡飯', situationImg: 'id-simple-meal.png',
        anim: { bg: 'room', a: { old: ['👵', 30, 60, 13], bowl: ['🍚', 56, 62, 10], tea: ['🍵', 72, 62, 9], smile: ['😊', 30, 36, 9, 'h'] },
          s: [['阿嬤的晚餐只有一碗白飯，', [['bob', 'bowl']]],
            ['一盤青菜和一杯茶。', [['bob', 'tea']]],
            ['她吃得很開心，說這樣最健康。', [['in', 'smile']]],
            ['簡單清淡的飲食，就是粗茶淡飯。', [['pop', 'smile']]]] },
        idiom: '粗茶淡飯', char: '茶', meaning: '簡單、清淡的飲食。', example: '爺爺退休後住在鄉下，過著粗茶淡飯的日子。', situation: '阿嬤的晚餐只有白飯、青菜和茶，吃得很開心。',
        fill: { options: ['雖然只是＿＿＿＿，一家人吃得很開心。', '這場婚禮有二十道大菜，真是＿＿＿＿。'], clue: '提示：哪一句是簡單的飲食？', explain: '第一句用得對：簡單的飯菜。二十道大菜太豐盛，不是粗茶淡飯。' } },
      { id: 'i-按部就班', situationImg: 'id-step-by-step.png',
        anim: { bg: 'school', a: { kid: ['🧒', 20, 66, 12], s1: ['1️⃣', 40, 70, 8], s2: ['2️⃣', 58, 58, 8], s3: ['3️⃣', 76, 46, 8], flag: ['🏁', 88, 30, 10, 'h'] },
          s: [['小華要做一個模型。', [['bob', 'kid']]],
            ['他先看說明書，一步一步來，', [['mv', 'kid', [40, 62, 600]], ['mv', 'kid', [58, 50, 600]]]],
            ['沒有跳過任何一個步驟，', [['mv', 'kid', [76, 38, 600]]]],
            ['照著順序慢慢做，就是按部就班。', [['in', 'flag'], ['jump', 'kid']]]] },
        idiom: '按部就班', char: '按', meaning: '做事依照一定的順序和步驟。', example: '只要按部就班的練習，你一定能學會游泳。', situation: '小華照著說明書，一步一步做模型，沒有跳過任何步驟。',
        fill: { options: ['做實驗要＿＿＿＿，不能亂加材料。', '他想到什麼就做什麼，做事很＿＿＿＿。'], clue: '提示：哪一句是照順序做事？', explain: '第一句用得對：實驗要照步驟來。想到什麼做什麼，不是按部就班。' } },
      { id: 'i-魚目混珠', situationImg: 'id-fake-pearl.png',
        anim: { bg: 'room', a: { tray: ['🟫', 50, 60, 16], p1: ['⚪', 40, 56, 7], p2: ['⚪', 50, 56, 7], fish: ['👁️', 60, 56, 7, 'h'], q: ['🔍', 80, 40, 10, 'h'] },
          s: [['盤子裡有一顆顆亮亮的珍珠。', [['bob', 'p1'], ['bob', 'p2']]],
            ['有人偷偷放進一顆魚眼睛。', [['in', 'fish']]],
            ['看起來差不多，不仔細看分不出來！', [['in', 'q'], ['wig', 'q']]],
            ['拿假的東西冒充真的，就是魚目混珠。', [['shake', 'fish']]]] },
        idiom: '魚目混珠', char: '混', meaning: '用假的東西冒充真的。', example: '有些商人魚目混珠，把便宜的茶葉當高級茶葉賣。', situation: '有人把魚眼睛偷偷放進珍珠裡，看起來分不出真假。',
        fill: { options: ['這家店用假名牌＿＿＿＿，被警察查到了。', '這顆鑽石是真的，所以是＿＿＿＿。'], clue: '提示：哪一句是拿假的冒充真的？', explain: '第一句用得對：用假名牌冒充真的。鑽石是真的，就不是魚目混珠。' } },
      { id: 'i-飛黃騰達', situationImg: 'id-success.png',
        anim: { bg: 'room', a: { man: ['🧑', 30, 66, 12], up: ['📈', 60, 50, 12, 'h'], crown: ['👑', 30, 44, 9, 'h'], star: ['⭐', 80, 24, 9, 'h'] },
          s: [['小李剛開始只是公司的新人。', [['bob', 'man']]],
            ['他很努力，業績越來越好，', [['in', 'up']]],
            ['沒幾年就當上了總經理！', [['in', 'crown'], ['in', 'star']]],
            ['事業很快的成功、地位升高，就是飛黃騰達。', [['jump', 'man']]]] },
        idiom: '飛黃騰達', char: '騰', meaning: '工作或事業很快的成功，地位一下子升高。', example: '他從小店員做起，後來飛黃騰達，開了好幾家公司。', situation: '小李很努力，沒幾年就從新人當上總經理。',
        fill: { options: ['他的生意越做越大，＿＿＿＿了。', '他的店才開三天就倒閉，真是＿＿＿＿。'], clue: '提示：哪一句是事業很快成功？', explain: '第一句用得對：生意越做越大。店倒閉剛好相反。' } },
      { id: 'i-顛沛流離', situationImg: 'id-refugee.png',
        anim: { bg: 'park', a: { fam: ['👨‍👩‍👧', 20, 66, 13], bag: ['🎒', 34, 70, 8], rain: ['🌧️', 50, 16, 12], house: ['🏠', 86, 60, 12, 'h'] },
          s: [['戰爭來了，一家人只好離開家。', [['wig', 'rain']]],
            ['他們背著行李，到處找地方住，', [['mv', 'fam', [50, 66, 900]], ['mv', 'bag', [64, 70, 900]]]],
            ['過了好幾年，才找到新的家。', [['in', 'house'], ['mv', 'fam', [74, 66, 700]]]],
            ['生活困苦、四處流浪，就是顛沛流離。', [['pop', 'house']]]] },
        idiom: '顛沛流離', char: '沛', meaning: '生活非常困苦，到處流浪沒有安定的家。', example: '戰爭讓許多人顛沛流離，失去了家園。', situation: '戰爭來了，一家人背著行李到處找地方住。',
        fill: { options: ['那些逃難的人＿＿＿＿，好不容易才安頓下來。', '他一直住在同一間房子，過得＿＿＿＿。'], clue: '提示：哪一句是到處流浪？', explain: '第一句用得對：逃難時四處流浪。一直住同一間房子，剛好相反。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-削', char: '削', wrong: '消', sentence: '媽媽幫我把蘋果削好了。', options: ['削', '消', '肖'], clue: '這裡是說用刀把皮去掉，想一想，哪一個字有立刀旁？', explain: '要改成「削」。用刀去皮是「削」；「消」是消失的消。' },
      { id: 'fx-沫', char: '沫', wrong: '末', sentence: '杯子上有一層白色的泡沫。', options: ['沫', '末', '抹'], clue: '這裡說的是小小的氣泡，想一想，哪一個字有三點水？', explain: '要改成「沫」。小氣泡是「泡沫」；「末」是週末的末。' },
      { id: 'fx-嗅', char: '嗅', wrong: '臭', sentence: '我嗅到廚房飄來的香味。', options: ['嗅', '臭', '糗'], clue: '這裡是說用鼻子聞，想一想，哪一個字有口字旁？', explain: '要改成「嗅」。用鼻子聞是「嗅」；「臭」是臭味的臭。' },
      { id: 'fx-按', char: '按', wrong: '安', sentence: '請按門鈴叫我。', options: ['按', '安', '案'], clue: '這裡是說用手往下壓，想一想，哪一個字有提手旁？', explain: '要改成「按」。用手壓是「按」；「安」是平安的安。' },
      { id: 'fx-碎', char: '碎', wrong: '醉', sentence: '盤子掉在地上，摔碎了。', options: ['碎', '醉', '卒'], clue: '這裡是說破成小塊，想一想，哪一個字有石字旁？', explain: '要改成「碎」。破成小塊是「碎」；「醉」是喝醉的醉。' },
      { id: 'fx-熬', char: '熬', wrong: '傲', sentence: '奶奶熬了一鍋綠豆湯。', options: ['熬', '傲', '敖'], clue: '這裡是說用小火慢慢煮，想一想，哪一個字的下面是四點火？', explain: '要改成「熬」。慢慢煮是「熬」；「傲」是驕傲的傲。' },
      { id: 'fx-砂', char: '砂', wrong: '吵', sentence: '咖啡裡加了一匙砂糖。', options: ['砂', '吵', '炒'], clue: '這裡說的是細細的甜顆粒，想一想，哪一個字有石字旁？', explain: '要改成「砂」。細細的糖是「砂糖」；「吵」是吵架的吵。' },
      { id: 'fx-混', char: '混', wrong: '棍', sentence: '把麵粉和水混在一起。', options: ['混', '棍', '昆'], clue: '這裡是說攪在一起，想一想，哪一個字有三點水？', explain: '要改成「混」。攪在一起是「混」；「棍」是木棍的棍。' },
      { id: 'fx-焦', char: '焦', wrong: '蕉', sentence: '鍋巴有一股焦香味。', options: ['焦', '蕉', '瞧'], clue: '這裡是說烤得有點黑，想一想，哪一個字沒有草字頭、下面是四點火？', explain: '要改成「焦」。烤得變黑是「焦」；「蕉」是香蕉的蕉。' },
      { id: 'fx-舀', char: '舀', wrong: '稻', sentence: '他用水瓢舀起一瓢水。', options: ['舀', '稻', '蹈'], clue: '這裡是說用器具把水盛起來，想一想，哪一個字左邊沒有禾字旁？', explain: '要改成「舀」。盛起來是「舀」；「稻」是稻米的稻。' },
      { id: 'fx-熄', char: '熄', wrong: '息', sentence: '風太大，營火被吹熄了。', options: ['熄', '息', '媳'], clue: '這裡是說火停止燃燒，想一想，哪一個字有火字旁？', explain: '要改成「熄」。火滅了是「熄」；「息」是休息的息。' },
      { id: 'fx-騰', char: '騰', wrong: '藤', sentence: '江水奔騰，流向大海。', options: ['騰', '藤', '謄'], clue: '這裡是說像馬一樣往前衝，想一想，哪一個字的右下角是「馬」？', explain: '要改成「騰」。往前衝是「奔騰」；「藤」是藤蔓的藤。' },
      { id: 'fx-淌', char: '淌', wrong: '躺', sentence: '雨水沿著窗戶往下淌。', options: ['淌', '躺', '倘'], clue: '這裡是說水往下流，想一想，哪一個字有三點水？', explain: '要改成「淌」。往下流是「淌」；「躺」是躺下的躺。' },
      { id: 'fx-沛', char: '沛', wrong: '肺', sentence: '這裡雨量豐沛，草木茂盛。', options: ['沛', '肺', '柿'], clue: '這裡是說非常充足，想一想，哪一個字有三點水？', explain: '要改成「沛」。非常充足是「豐沛」；「肺」是肺臟的肺。' },
      { id: 'fx-舔', char: '舔', wrong: '添', sentence: '小狗舔了我的手一下。', options: ['舔', '添', '甜'], clue: '這裡是說用舌頭碰，想一想，哪一個字的左邊是「舌」？', explain: '要改成「舔」。用舌頭碰是「舔」；「添」是增添的添。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿失」是不見了。', sentence: '雨停了，彩虹慢慢＿失。', frame: '＿失', options: ['消', '削'], answer: '消', clue: '提示：這個字的左邊是三點水。', explain: '答案是「消」；「削」是削皮的削。' },
      { id: 's2', meaning: '「週＿」是星期六和星期日。', sentence: '這個週＿我們去爬山。', frame: '週＿', options: ['末', '沫'], answer: '末', clue: '提示：這個字沒有三點水。', explain: '答案是「末」；「沫」是泡沫的沫。' },
      { id: 's3', meaning: '「＿味」是難聞的氣味。', sentence: '垃圾桶傳來一陣＿味。', frame: '＿味', options: ['臭', '嗅'], answer: '臭', clue: '提示：這個字沒有口字旁。', explain: '答案是「臭」；「嗅」是嗅覺的嗅。' },
      { id: 's4', meaning: '「平＿」是沒有危險、順順利利。', sentence: '祝你一路平＿。', frame: '平＿', options: ['安', '按'], answer: '安', clue: '提示：這個字沒有提手旁。', explain: '答案是「安」；「按」是按鈕的按。' },
      { id: 's5', meaning: '「喝＿」是酒喝太多，頭昏昏的。', sentence: '他喝＿了，走路搖搖晃晃。', frame: '喝＿', options: ['醉', '碎'], answer: '醉', clue: '提示：和酒有關，左邊是「酉」。', explain: '答案是「醉」；「碎」是碎片的碎。' },
      { id: 's6', meaning: '「＿不得」是很珍惜、不願意放手。', sentence: '我＿不得和好朋友分開。', frame: '＿不', options: ['捨', '舍'], answer: '捨', clue: '提示：要用手放開，左邊是提手旁。', explain: '答案是「捨」；「舍」是宿舍的舍。' },
      { id: 's7', meaning: '「驕＿」是覺得自己很了不起。', sentence: '他得了第一名，有點驕＿。', frame: '驕＿', options: ['傲', '熬'], answer: '傲', clue: '提示：和人有關，左邊是單人旁。', explain: '答案是「傲」；「熬」是熬夜的熬。' },
      { id: 's8', meaning: '「＿灘」是海邊鋪滿細小顆粒的地方。', sentence: '我們在＿灘上堆城堡。', frame: '＿灘', options: ['沙', '砂'], answer: '沙', clue: '提示：在海邊，左邊是三點水。', explain: '答案是「沙」；「砂」是砂糖的砂。' },
      { id: 's9', meaning: '「香＿」是黃色、彎彎的水果。', sentence: '猴子最愛吃香＿。', frame: '香＿', options: ['蕉', '焦'], answer: '蕉', clue: '提示：這是植物，上面是草字頭。', explain: '答案是「蕉」；「焦」是燒焦的焦。' },
      { id: 's10', meaning: '「休＿」是停下來放鬆一下。', sentence: '跑累了，坐下來休＿一下。', frame: '休＿', options: ['息', '熄'], answer: '息', clue: '提示：這個字沒有火字旁。', explain: '答案是「息」；「熄」是熄燈的熄。' },
      { id: 's11', meaning: '「＿下」是把身體平放在床上或地上。', sentence: '晚上九點，我＿下來睡覺。', frame: '＿下', options: ['躺', '淌'], answer: '躺', clue: '提示：和身體有關，左邊是「身」。', explain: '答案是「躺」；「淌」是流淌的淌。' },
      { id: 's12', meaning: '「增＿」是再多加一些。', sentence: '過年了，家裡增＿了新衣服。', frame: '增＿', options: ['添', '舔'], answer: '添', clue: '提示：這個字的左邊是三點水。', explain: '答案是「添」；「舔」是舔嘴唇的舔。' }
    ],
    listen: [
      { id: 'l1', text: '用小火慢慢的煮了好幾個小時。', answer: 0, options: [{ text: '熬煮', img: 'slow-cook.png' }, { text: '削皮', img: 'peel-fruit.png' }, { text: '混合', img: 'mix-colors.png' }, { text: '熄滅', img: 'blow-candle.png' }] },
      { id: 'l2', text: '爺爺一小口一小口，慢慢的喝著熱茶。', answer: 0, options: [{ text: '啜飲', img: 'sip-drink.png' }, { text: '熬煮', img: 'slow-cook.png' }, { text: '流淌', img: 'juice-flow.png' }, { text: '泡沫', img: 'soap-bubbles.png' }] },
      { id: 'l3', text: '弟弟一看到苦瓜，就趕快躲得遠遠的。', answer: 0, options: [{ text: '退避三舍', img: 'kid-avoid.png' }, { text: '粉身碎骨', img: 'broken-cup.png' }, { text: '四面八方', img: 'crowd-gather.png' }, { text: '雀躍', img: 'kids-jump.png' }] },
      { id: 'l4', text: '聽說要去遊樂園，大家開心得跳起來。', answer: 0, options: [{ text: '雀躍', img: 'kids-jump.png' }, { text: '豐沛', img: 'full-river.png' }, { text: '熱騰騰', img: 'hot-soup.png' }, { text: '退避三舍', img: 'kid-avoid.png' }] },
      { id: 'l5', text: '剛煮好的湯，一直冒出白白的熱氣。', answer: 0, options: [{ text: '熱騰騰', img: 'hot-soup.png' }, { text: '泡沫', img: 'soap-bubbles.png' }, { text: '焦糖', img: 'caramel.png' }, { text: '豐沛', img: 'full-river.png' }] },
      { id: 'l6', text: '把紅色和黃色的顏料攪在一起。', answer: 0, options: [{ text: '混合', img: 'mix-colors.png' }, { text: '削皮', img: 'peel-fruit.png' }, { text: '熄滅', img: 'blow-candle.png' }, { text: '啜飲', img: 'sip-drink.png' }] },
      { id: 'l7', text: '今年雨下得很多，河水滿滿的。', answer: 0, options: [{ text: '豐沛', img: 'full-river.png' }, { text: '雀躍', img: 'kids-jump.png' }, { text: '流淌', img: 'juice-flow.png' }, { text: '砂糖', img: 'sugar-bowl.png' }] },
      { id: 'l8', text: '一陣風吹過來，蠟燭的火就不見了。', answer: 0, options: [{ text: '熄滅', img: 'blow-candle.png' }, { text: '熬煮', img: 'slow-cook.png' }, { text: '混合', img: 'mix-colors.png' }, { text: '按鈕', img: 'press-button.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '做出如此', answer: '怎麼樣', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看做出了什麼樣的東西。',
      /* 短語：（動詞）出如此＋形容詞＋的＋名詞（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '做出如此美味的蛋糕', img: 'pr-cake.png',
        parts: [{ text: '做出如此', role: '做出如此' }, { text: '美味', role: '怎麼樣' }, { text: '的' }, { text: '蛋糕', role: '什麼東西' }],
        explain: '先說做了什麼，加上「出如此」表示做出來的結果很特別，再說出東西的樣子，加上「的」，最後說是什麼東西。' },
      pick: [
        { id: 'ph1', img: 'pr-garden.png', before: '開出如此', noun: '花朵', ask: '開出如此什麼樣的花朵', look: '再看看圖片，花的顏色怎麼樣？', options: ['美麗', '枯萎', '醜陋', '灰暗'], clue: '提示：顏色鮮豔，大家都停下來欣賞。', explain: '答案是「美麗」，完整的短語是「開出如此美麗的花朵」。' },
        { id: 'ph2', img: 'pr-painting.png', before: '畫出如此', noun: '老虎', ask: '畫出如此什麼樣的老虎', look: '再看看圖片，畫裡的老虎像不像？', options: ['逼真', '模糊', '潦草', '歪斜'], clue: '提示：看起來好像會從紙上跳出來。', explain: '答案是「逼真」，完整的短語是「畫出如此逼真的老虎」。' },
        { id: 'ph3', img: 'pr-bakery.png', before: '烤出如此', noun: '麵包', ask: '烤出如此什麼樣的麵包', look: '再看看圖片，麵包看起來好不好吃？', options: ['香甜', '焦黑', '難吃', '乾硬'], clue: '提示：一出爐，大家都搶著吃。', explain: '答案是「香甜」，完整的短語是「烤出如此香甜的麵包」。' },
        { id: 'ph4', img: 'pr-spring.png', before: '流出如此', noun: '泉水', ask: '流出如此什麼樣的泉水', look: '再看看圖片，水看起來乾不乾淨？', options: ['清澈', '混濁', '骯髒', '黑暗'], clue: '提示：可以看見水底的小石頭。', explain: '答案是「清澈」，完整的短語是「流出如此清澈的泉水」。' },
        { id: 'ph5', img: 'pr-fireworks.png', before: '放出如此', noun: '煙火', ask: '放出如此什麼樣的煙火', look: '再看看圖片，夜空亮不亮？', options: ['燦爛', '暗淡', '無聊', '冷清'], clue: '提示：五顏六色，把夜空照亮。', explain: '答案是「燦爛」，完整的短語是「放出如此燦爛的煙火」。' },
        { id: 'ph6', img: 'pr-letter.png', before: '寫出如此', noun: '信', ask: '寫出如此什麼樣的信', look: '再看看圖片，讀信的媽媽表情怎麼樣？', options: ['感人', '無聊', '潦草', '冷漠'], clue: '提示：讀完信，忍不住流下眼淚。', explain: '答案是「感人」，完整的短語是「寫出如此感人的信」。' },
        { id: 'ph7', img: 'pr-orange.png', before: '擠出如此', noun: '果汁', ask: '擠出如此什麼樣的果汁', look: '再看看圖片，果汁多不多？', options: ['豐沛', '稀少', '乾癟', '苦澀'], clue: '提示：輕輕一壓，汁就流個不停。', explain: '答案是「豐沛」，完整的短語是「擠出如此豐沛的果汁」。' },
        { id: 'ph8', img: 'pr-choir.png', before: '唱出如此', noun: '歌聲', ask: '唱出如此什麼樣的歌聲', look: '再看看圖片，大家聽得開不開心？', options: ['嘹亮', '沙啞', '微弱', '刺耳'], clue: '提示：聲音又高又清楚，傳得好遠。', explain: '答案是「嘹亮」，完整的短語是「唱出如此嘹亮的歌聲」。' }
      ],
      say: [],
      words: [
        { word: '雀躍', meaning: '高興得像小鳥一樣跳起來。', img: 'kids-jump.png' },
        { word: '四面八方', meaning: '周圍的每一個角落。', img: 'crowd-gather.png' },
        { word: '熱騰騰', meaning: '很燙、一直冒著白煙的樣子。', img: 'hot-soup.png' },
        { word: '退避三舍', meaning: '害怕或為了不起衝突，主動躲開讓步。', img: 'kid-avoid.png' }
      ],
      choose: [
        { id: 'pw1', word: '雀躍', options: ['聽到明天放假，同學們都很雀躍。', '考試考壞了，他雀躍的哭了起來。'], clue: '提示：想一想，「雀躍」是很高興，還是很難過？', explain: '第一句用得對：放假很開心。考壞了哭，是難過，不是雀躍。' },
        { id: 'pw2', word: '四面八方', options: ['煙火一放，人們從四面八方趕來觀看。', '他一個人站在四面八方，動也不動。'], clue: '提示：想一想，「四面八方」是很多方向，還是一個點？', explain: '第一句用得對：人從各個方向趕來。一個人不能站在每一個方向。' },
        { id: 'pw3', word: '熱騰騰', options: ['剛蒸好的饅頭熱騰騰的。', '剛從冰箱拿出來的冰棒熱騰騰的。'], clue: '提示：想一想，「熱騰騰」是很燙，還是很冰？', explain: '第一句用得對：剛蒸好的饅頭很燙。冰棒是冰的。' },
        { id: 'pw4', word: '退避三舍', options: ['他的脾氣很大，大家都退避三舍。', '他很親切，大家都對他退避三舍，搶著和他聊天。'], clue: '提示：想一想，「退避三舍」是躲開，還是靠近？', explain: '第一句用得對：脾氣大，大家都躲開。搶著聊天是靠近，剛好相反。' }
      ],
      make: [
        { id: 'pm1', word: '雀躍', clue: '提示：想想看，什麼事讓你開心得跳起來？', model: '收到生日禮物時，我雀躍得跳了起來。' },
        { id: 'pm2', word: '四面八方', clue: '提示：想想看，什麼時候很多人從各地來？', model: '過年時，親戚從四面八方回到老家團聚。' },
        { id: 'pm3', word: '熱騰騰', clue: '提示：想想看，什麼食物剛煮好會冒熱氣？', model: '寒流來時，我最想吃一碗熱騰騰的牛肉麵。' },
        { id: 'pm4', word: '退避三舍', clue: '提示：想想看，你看到什麼會想躲得遠遠的？', model: '我很怕蟑螂，一看到牠就退避三舍。' }
      ]
    },
    pattern: [
      { key: 'yibian2', id: 'yb', title: '一邊……一邊……', img: 'yibian2.png',
        meaning: '用「一邊」、「一邊」，說出同時在做的兩件事。',
        examples: ['弟弟一邊吃早餐，一邊看卡通。'],
        match: [
          { id: 'pt-yb-m1', img: 'pt-knit.png', front: '奶奶一邊織毛衣，', options: ['一邊哼著歌。', '一邊去游泳。', '一邊在睡覺。'], clue: '提示：看看圖片，織毛衣時還能同時做什麼？', explain: '答案是「一邊哼著歌」：兩件事可以同時做。' },
          { id: 'pt-yb-m2', img: 'pt-bike.png', front: '哥哥一邊騎腳踏車，', options: ['一邊吹口哨。', '一邊寫功課。', '一邊睡午覺。'], clue: '提示：看看圖片，騎車時還能同時做什麼？', explain: '答案是「一邊吹口哨」：兩件事可以同時做。' },
          { id: 'pt-yb-m3', img: 'pt-drive-music.png', front: '爸爸一邊開車，', options: ['一邊聽音樂。', '一邊看漫畫。', '一邊洗衣服。'], clue: '提示：看看圖片，開車時還能同時做什麼？', explain: '答案是「一邊聽音樂」：兩件事可以同時做。' }
        ],
        conj: [
          { id: 'pt-yb-c1', full: '妹妹一邊畫畫，一邊唱歌。', img: 'pt-draw-sing.png', sentence: '妹妹＿＿畫畫，＿＿唱歌。', options: ['一邊……一邊……', '雖然……卻……', '先……接著……最後……'], clue: '提示：兩件事同時在做。數數看有幾個空格。', explain: '答案是「一邊……一邊……」：妹妹一邊畫畫，一邊唱歌。' },
          { id: 'pt-yb-c2', full: '我們一邊散步，一邊聊天。', img: 'pt-walk-talk.png', sentence: '我們＿＿散步，＿＿聊天。', options: ['一邊……一邊……', '雖然……卻……', '先……接著……最後……'], clue: '提示：兩件事同時在做。數數看有幾個空格。', explain: '答案是「一邊……一邊……」：我們一邊散步，一邊聊天。' }
        ],
        half: [
          { id: 'pt-yb-h1', front: '媽媽一邊煮菜，', clue: '提示：煮菜時，媽媽同時還在做什麼？記得要說「一邊」。', model: '一邊和我聊學校的事。' },
          { id: 'pt-yb-h2', front: '小明一邊寫功課，', clue: '提示：寫功課時，小明同時還在做什麼？記得要說「一邊」。', model: '一邊聽輕柔的音樂。' }
        ],
        whole: [
          { id: 'pt-yb-w1', clue: '提示：用「一邊」、「一邊」說出同時做的兩件事。想想看：你常常同時做哪兩件事？', model: '我一邊泡腳，一邊看故事書。' }
        ] },
      { key: 'suiran', id: 'sr', title: '雖然……卻……', img: 'suiran.png',
        meaning: '用「雖然」、「卻」，說出前後相反、讓人想不到的情形。',
        examples: ['這隻小狗雖然很小，叫聲卻很大。'],
        match: [
          { id: 'pt-sr-m1', img: 'pt-lemon.png', front: '這顆檸檬雖然很漂亮，', options: ['卻酸得不得了。', '所以很甜。', '而且很甜。'], clue: '提示：看看圖片，漂亮的檸檬吃起來怎麼樣？前後要相反。', explain: '答案是「卻酸得不得了」：漂亮和很酸，前後相反。' },
          { id: 'pt-sr-m2', img: 'pt-rain-school.png', front: '外面雖然下著大雨，', options: ['他卻準時到校。', '所以他遲到。', '而且雨很大。'], clue: '提示：看看圖片，下大雨他有沒有遲到？前後要相反。', explain: '答案是「他卻準時到校」：下大雨和準時到，前後相反。' },
          { id: 'pt-sr-m3', img: 'pt-plain-dish.png', front: '這道菜雖然看起來普通，', options: ['吃起來卻很美味。', '所以很難吃。', '而且看起來普通。'], clue: '提示：看看圖片，吃的人表情怎麼樣？前後要相反。', explain: '答案是「吃起來卻很美味」：看起來普通和吃起來好吃，前後相反。' }
        ],
        conj: [
          { id: 'pt-sr-c1', full: '弟弟雖然年紀小，卻很懂事。', img: 'pt-small-helper.png', sentence: '弟弟＿＿年紀小，＿很懂事。', options: ['雖然……卻……', '一邊……一邊……', '先……接著……最後……'], clue: '提示：前後的意思相反。數數看有幾個空格。', explain: '答案是「雖然……卻……」：弟弟雖然年紀小，卻很懂事。' },
          { id: 'pt-sr-c2', full: '這條山路雖然很遠，風景卻很美。', img: 'pt-mountain-road.png', sentence: '這條山路＿＿很遠，風景＿很美。', options: ['雖然……卻……', '一邊……一邊……', '先……接著……最後……'], clue: '提示：前後的意思相反。數數看有幾個空格。', explain: '答案是「雖然……卻……」：這條山路雖然很遠，風景卻很美。' }
        ],
        half: [
          { id: 'pt-sr-h1', front: '他雖然跑得慢，', clue: '提示：跑得慢，可是他有什麼好表現？記得要說「卻」。', model: '卻從來不放棄。' },
          { id: 'pt-sr-h2', front: '這間教室雖然小，', clue: '提示：教室小，可是有什麼好的地方？記得要說「卻」。', model: '卻布置得很溫馨。' }
        ],
        whole: [
          { id: 'pt-sr-w1', clue: '提示：用「雖然」、「卻」說出前後相反的情形。想想看：有什麼東西看起來和實際上不一樣？', model: '這本書雖然很厚，讀起來卻一點也不累。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'sense', name: '摹寫', meaning: '把看到、聽到、聞到、吃到、摸到的感覺，仔細的寫出來，讓人好像也感受到。', example: '課文寫水果的香氣充滿整個廚房，也寫果汁的顏色，讓人好像聞到、看到一樣。',
          show: { sentence: '剛出爐的麵包，散發出濃濃的奶油香。', mark: ['濃濃的奶油香'] },
          yesno: [
            { id: 'rh-se-y1', sentence: '芒果汁喝起來甜甜的，好清涼。', answer: true, mark: ['甜甜的'], clue: '提示：這句話有沒有寫出喝到的味道？', explain: '是摹寫：寫出喝到的甜味。' },
            { id: 'rh-se-y2', sentence: '我喝了芒果汁。', answer: false, clue: '提示：這句話有沒有寫出看到、聞到、吃到的感覺？', explain: '不是摹寫：這句話只是說喝了果汁。' }
          ],
          pick: [
            { id: 'rh-se-p1', mark: ['金黃色'], options: ['金黃色的蛋餅在鍋裡煎著。', '他在煎蛋餅。'], clue: '提示：哪一句寫出了看到的顏色？', explain: '「金黃色」是摹寫：寫出看到的顏色。' },
            { id: 'rh-se-p2', mark: ['咕嘟咕嘟'], options: ['湯在鍋裡咕嘟咕嘟的滾著。', '湯快煮好了。'], clue: '提示：哪一句寫出了聽到的聲音？', explain: '「咕嘟咕嘟」是摹寫：寫出聽到的聲音。' },
            { id: 'rh-se-p3', mark: ['冰冰涼涼'], options: ['冰塊含在嘴裡冰冰涼涼的。', '我吃了冰塊。', '冰塊是白的。'], clue: '提示：哪一句寫出了吃到的感覺？', explain: '「冰冰涼涼」是摹寫：寫出吃到的感覺。' },
            { id: 'rh-se-p4', mark: ['軟綿綿'], options: ['棉花糖摸起來軟綿綿的。', '這是棉花糖。', '我買了一包。'], clue: '提示：哪一句寫出了摸到的感覺？', explain: '「軟綿綿」是摹寫：寫出摸到的感覺。' },
            { id: 'rh-se-p5', mark: ['香氣撲鼻'], options: ['烤地瓜香氣撲鼻。', '父親在烤地瓜。', '冬天到了。', '地瓜像一顆石頭。'], clue: '提示：哪一句寫出了聞到的味道？', explain: '「香氣撲鼻」是摹寫：寫出聞到的味道。' },
            { id: 'rh-se-p6', mark: ['酸溜溜'], options: ['青蘋果咬起來酸溜溜的。', '我買了蘋果。', '蘋果放在桌上。', '我在市場。'], clue: '提示：哪一句寫出了吃到的味道？', explain: '「酸溜溜」是摹寫：寫出吃到的味道。' }
          ] },
        { key: 'simile', name: '譬喻', meaning: '把一樣東西比成另一樣有相同地方的東西，讓人更容易想像。', example: '課文把孩子們湧進廚房的樣子比成小鳥，讓人看到大家開心跳躍的樣子。',
          show: { sentence: '天上的雲朵像棉花糖一樣柔軟。', mark: ['像棉花糖'] },
          yesno: [
            { id: 'rh-si-y1', sentence: '月亮像一艘小船掛在天上。', answer: true, mark: ['像一艘小船'], clue: '提示：這句話有沒有把月亮比成另一樣東西？', explain: '是譬喻：把月亮比成小船。' },
            { id: 'rh-si-y2', sentence: '月亮掛在天上。', answer: false, clue: '提示：這句話有沒有把月亮比成另一樣東西？', explain: '不是譬喻：這句話只是說月亮在天上。' }
          ],
          pick: [
            { id: 'rh-si-p1', mark: ['像一群小鳥'], options: ['下課鐘響，同學們像一群小鳥飛出教室。', '下課鐘響，同學們走出教室。'], clue: '提示：哪一句把同學比成另一樣東西？', explain: '把同學比成小鳥，是譬喻。' },
            { id: 'rh-si-p2', mark: ['像一面鏡子'], options: ['湖面平靜得像一面鏡子。', '湖邊有很多樹。'], clue: '提示：哪一句把湖面比成另一樣東西？', explain: '把湖面比成鏡子，是譬喻。' },
            { id: 'rh-si-p3', mark: ['像小扇子'], options: ['銀杏的葉子像小扇子。', '銀杏葉黃了。', '我撿了一片葉子。'], clue: '提示：哪一句把葉子比成另一樣東西？', explain: '把葉子比成扇子，是譬喻。' },
            { id: 'rh-si-p4', mark: ['像火球'], options: ['夏天的太陽像火球。', '今天很熱。', '我戴了帽子。'], clue: '提示：哪一句把太陽比成另一樣東西？', explain: '把太陽比成火球，是譬喻。' },
            { id: 'rh-si-p5', mark: ['像一條銀帶'], options: ['小河像一條銀帶。', '河邊有釣客。', '河水很涼。', '我在河邊玩。'], clue: '提示：哪一句把小河比成另一樣東西？', explain: '把小河比成銀帶，是譬喻。' },
            { id: 'rh-si-p6', mark: ['像熟透的蘋果'], options: ['她的臉紅得像熟透的蘋果。', '她害羞了。', '她低下頭。', '她站在門口。'], clue: '提示：哪一句把臉比成另一樣東西？', explain: '把紅紅的臉比成蘋果，是譬喻。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '炸雞咬下去喀滋喀滋響。', answer: '摹寫', mark: ['喀滋喀滋'], clue: '提示：這句話有沒有寫出聽到的聲音？', explain: '答案是「摹寫」：寫出咬下去的聲音。' },
        { id: 'rh2', sentence: '奶茶的香味飄滿整個房間。', answer: '摹寫', mark: ['香味飄滿'], clue: '提示：這句話有沒有寫出聞到的味道？', explain: '答案是「摹寫」：寫出聞到的香味。' },
        { id: 'rh3', sentence: '弟弟的笑聲像清脆的鈴鐺。', answer: '譬喻', mark: ['像清脆的鈴鐺'], clue: '提示：這句話有沒有把笑聲比成另一樣東西？', explain: '答案是「譬喻」：把笑聲比成鈴鐺。' },
        { id: 'rh4', sentence: '滿天的星星像撒在黑布上的鑽石。', answer: '譬喻', mark: ['像撒在黑布上的鑽石'], clue: '提示：這句話有沒有把星星比成另一樣東西？', explain: '答案是「譬喻」：把星星比成鑽石。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L05 = d; }
})(this);
