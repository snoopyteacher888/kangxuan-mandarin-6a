/* 第 6 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'extract', qe: 'infer', qf: 'infer', qg: 'interpret', qh: 'interpret',
      qi: 'evaluate', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qg: { think: ['作者從哪些方面介紹這種飲料？', '想一想：由來、做法、好喝的祕訣、新吃法，各在哪一段？'], why: '作者先說它很受歡迎，再介紹奶茶的由來、粉圓的做法、好喝的關鍵，接著舉出相似的食物搭配和各種新創意，最後說它讓世界看見臺灣。' },
      qh: { think: ['粉圓和奶茶各要做到什麼才好喝？', '如果只有一樣好，結果會怎樣？'], why: '粉圓要有嚼勁、不能太黏，奶茶要又香又濃，兩樣都好、互相配合，才會好喝。就像一個團隊，每個人都要做好自己的部分。' },
      qi: { think: ['作者舉了哪些「兩種食物搭在一起」的例子？', '你還知道哪些食物配在一起特別好吃？'], why: '作者舉了臭豆腐配泡菜、油條配豆漿等例子，說明兩種食物搭配得好，會更美味。你也可以想想自己吃過的好搭配。' },
      qj: { think: ['外國人把粉圓加進哪些食物裡？', '這些創意對臺灣有什麼意義？'], why: '世界各地把粉圓加進披薩、拉麵、甜點裡，表示大家很喜歡這個來自臺灣的發明，也讓更多人認識臺灣的飲食文化和創意。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['我想推薦鳳梨酥，因為酸甜好吃又方便帶。', '我想推薦滷肉飯，因為香香的很下飯。'], bad: ['我不知道臺灣有什麼食物。', '我想推薦外國的漢堡。'], why: '題目問的是你想推薦哪一樣臺灣美食給外國朋友。說出一樣臺灣的食物和推薦的理由，就是好回答。說不知道、推薦外國食物，都沒有回答到題目。' },
      k2: { good: ['我想做珍珠鬆餅，把粉圓放在鬆餅上。', '我想做珍珠冰淇淋，冰冰涼涼又Q彈。'], bad: ['我不想發明任何東西。', '我想把粉圓丟掉。'], why: '題目問的是你會怎麼用粉圓發明新吃法。說出一種新組合，就是有創意的回答。不想發明、把粉圓丟掉，都沒有回答到題目。' }
    },
    hanzi: [
      { id: 'h-靡', combo: { type: '形聲字', pict: '上面的「麻」念起來像「靡」，下面是「非」。風一吹，草全部倒向同一邊，就是「靡」。' }, char: '靡', zhuyin: 'ㄇㄧˇ', radical: '非', strokes: 19, words: ['風靡', '萎靡'], say: '靡，萎靡的靡', cloze: '萎＿', img: 'pop-crowd.png', options: ['靡', '麻', '磨', '摩'], clue: '這個字的上面是「麻」，下面是「非」。', explain: '答案是「靡」；「磨」的下面是「石」，「摩」的下面是「手」。', parts: ['麻', '非'], story: '上面的「麻」念起來像「靡」，下面是「非」。風一吹，草都倒向同一邊，像大家一起跟著流行，就是「風靡」。', sentence: '他熬夜太久，整天精神萎靡。' },
      { id: 'h-嫁', combo: { layout: 'lr', parts: [['女', 'm', '女子'], ['家', 's', '']] }, char: '嫁', zhuyin: 'ㄐㄧㄚˋ', radical: '女', strokes: 13, words: ['出嫁', '嫁妝'], say: '嫁，出嫁的嫁', cloze: '＿妝', img: 'wedding-bride.png', options: ['嫁', '稼', '家', '傢'], clue: '這個字的左邊是女字旁。', explain: '答案是「嫁」，左邊是女字旁；「稼」的左邊是禾字旁，「傢」的左邊是單人旁。', parts: ['女', '家'], story: '左邊是女子，右邊是「家」。女子結婚，到另一個家去生活，就是「出嫁」。', sentence: '姑姑出嫁那天，大家都來祝福她。', build: { layout: 'lr', show: ['？', '家'], answer: '女', options: ['女', '禾', '亻', '木'], clue: '想一想：結婚到另一個家去的是誰？' } },
      { id: 'h-贊', combo: { type: '形聲字', pict: '上面是兩個「先」，下面是「貝」。古時候拿著錢財禮物上前幫忙，就是「贊」。' }, char: '贊', zhuyin: 'ㄗㄢˋ', radical: '貝', strokes: 19, words: ['贊成', '贊助'], say: '贊，贊助的贊', cloze: '＿助', img: 'raise-hands.png', options: ['贊', '讚', '攢', '鑽'], clue: '這個字的下面是「貝」，左邊沒有偏旁。', explain: '答案是「贊」；「讚」的左邊多了言字旁，「鑽」的左邊是金字旁。', parts: ['先', '先', '貝'], story: '上面是兩個「先」，下面是「貝」，貝殼是古時候的錢。拿錢財來幫忙，就是「贊助」；同意別人的想法，叫「贊成」。', sentence: '這場比賽由一家書店贊助。' },
      { id: 'h-干', combo: { type: '象形字', pict: '「干」像一支上面分叉的長木棍，古時候用來擋住敵人的武器。' }, char: '干', zhuyin: 'ㄍㄢ', radical: '干', strokes: 3, words: ['松贊干布', '干擾'], say: '干，干擾的干', cloze: '＿擾', img: 'noise-ears.png', options: ['干', '千', '于', '午'], clue: '這個字只有三畫，上面是一橫。', explain: '答案是「干」；「千」的第一筆是一撇，「于」的豎有鉤。', parts: ['干'], story: '「干」像一支擋東西的長棍子。去打擾別人，讓人沒辦法專心，叫「干擾」。', sentence: '請不要大聲說話，干擾別人讀書。' },
      { id: 'h-烹', combo: { layout: 'tb', parts: [['亨', 's', ''], ['灬', 'm', '火']] }, char: '烹', zhuyin: 'ㄆㄥ', radical: '火', strokes: 11, words: ['烹茶', '烹飪'], say: '烹，烹飪的烹', cloze: '＿飪', img: 'cooking-class.png', options: ['烹', '亨', '享', '哼'], clue: '這個字的下面是四點火。', explain: '答案是「烹」，下面是四點火；「享」的下面是「子」，「哼」的左邊是口字旁。', parts: ['亨', '灬'], story: '上面的「亨」念起來有點像「烹」，下面是火。用火來煮東西，就是「烹」；做菜叫「烹飪」。', sentence: '學校開了一堂烹飪課。', build: { layout: 'tb', show: ['亨', '？'], answer: '灬', options: ['灬', '子', '口', '心'], clue: '想一想：煮東西要用什麼？' } },
      { id: 'h-薯', combo: { layout: 'tb', parts: [['艹', 'm', '植物'], ['署', 's', '']] }, char: '薯', zhuyin: 'ㄕㄨˇ', radical: '艸', strokes: 18, words: ['樹薯', '薯條'], say: '薯，薯條的薯', cloze: '＿條', img: 'fries.png', options: ['薯', '署', '暑', '曙'], clue: '這個字的上面是草字頭。', explain: '答案是「薯」，上面是草字頭；「暑」的上面是「日」，「曙」的左邊是日字旁。', parts: ['艹', '署'], story: '上面是草，下面的「署」念起來像「薯」。長在土裡、根部胖胖可以吃的植物，就是「薯」，像馬鈴薯、樹薯。', sentence: '我點了一份炸薯條。', build: { layout: 'tb', show: ['？', '署'], answer: '艹', options: ['艹', '竹', '日', '雨'], clue: '想一想：長在土裡的植物，上面放哪一個？' } },
      { id: 'h-末', combo: { type: '指事字', pict: '「末」是一棵樹，在最上面加長長的一橫，表示樹梢、最尾端的地方。' }, char: '末', zhuyin: 'ㄇㄛˋ', radical: '木', strokes: 5, words: ['粉末', '週末'], say: '末，週末的末', cloze: '週＿', img: 'powder.png', options: ['末', '未', '本', '朱'], clue: '這個字上面一橫長、下面一橫短。', explain: '答案是「末」；「未」是上面短、下面長，「本」的一橫在下面。', parts: ['木', '一'], story: '一棵樹，最上面加一長橫，表示樹最尾端的地方，就是「末」。一星期的最後，叫「週末」。', sentence: '這個週末我們去露營。' },
      { id: 'h-添', combo: { layout: 'lr', parts: [['氵', 'm', '水'], ['忝', 's', '']] }, char: '添', zhuyin: 'ㄊㄧㄢ', radical: '水', strokes: 11, words: ['增添', '添加'], say: '添，添加的添', cloze: '＿加', img: 'add-water.png', options: ['添', '舔', '天', '忝'], clue: '這個字的左邊是三點水。', explain: '答案是「添」，左邊是三點水；「舔」的左邊是「舌」。', parts: ['氵', '忝'], story: '左邊是水，右邊的「忝」念起來像「添」。杯子裡再倒一點水，讓它變多，就是「添」。', sentence: '奶奶幫我添了一碗飯。', build: { layout: 'lr', show: ['？', '忝'], answer: '氵', options: ['氵', '舌', '忄', '口'], clue: '想一想：往杯子裡再倒一點的是什麼？' } },
      { id: 'h-擴', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['廣', 's', '']] }, char: '擴', zhuyin: 'ㄎㄨㄛˋ', radical: '手', strokes: 18, words: ['擴展', '擴大'], say: '擴，擴大的擴', cloze: '＿大', img: 'map-grow.png', options: ['擴', '礦', '曠', '廣'], clue: '這個字的左邊是提手旁。', explain: '答案是「擴」，左邊是提手旁；「礦」的左邊是石字旁，「曠」的左邊是日字旁。', parts: ['扌', '廣'], story: '左邊是手，右邊是「廣」，廣就是很大很寬。用手把東西往外推，讓它變寬變大，就是「擴大」。', sentence: '學校擴大了操場。', build: { layout: 'lr', show: ['？', '廣'], answer: '扌', options: ['扌', '石', '日', '金'], clue: '想一想：往外推開要用身體的哪個部分？' } },
      { id: 'h-袂', combo: { layout: 'lr', parts: [['衤', 'm', '衣服'], ['夬', 's', '']] }, char: '袂', zhuyin: 'ㄇㄟˋ', radical: '衣', strokes: 9, words: ['聯袂', '分袂'], say: '袂，聯袂的袂', cloze: '分＿', img: 'hand-in-hand.png', options: ['袂', '決', '快', '訣'], clue: '這個字的左邊是衣字旁。', explain: '答案是「袂」，左邊是衣字旁；「決」的左邊是三點水，「快」的左邊是豎心旁。', parts: ['衤', '夬'], story: '左邊是衣服，右邊是「夬」。「袂」是衣服的袖子；兩個人袖子連著袖子一起出現，就是「聯袂」。', sentence: '兩位歌手聯袂登臺，臺下掌聲不斷。', build: { layout: 'lr', show: ['？', '夬'], answer: '衤', options: ['衤', '氵', '忄', '言'], clue: '想一想：袖子是什麼東西的一部分？' } },
      { id: 'h-稠', combo: { layout: 'lr', parts: [['禾', 'm', '稻禾'], ['周', 's', '']] }, char: '稠', zhuyin: 'ㄔㄡˊ', radical: '禾', strokes: 13, words: ['黏稠', '稠密'], say: '稠，稠密的稠', cloze: '＿密', img: 'thick-honey.png', options: ['稠', '綢', '調', '週'], clue: '這個字的左邊是禾字旁。', explain: '答案是「稠」，左邊是禾字旁；「綢」的左邊是糸字旁，「調」的左邊是言字旁。', parts: ['禾', '周'], story: '左邊是稻禾，右邊的「周」念起來有點像「稠」。稻子種得密密麻麻，就是「稠密」；湯汁很濃、不好流動，叫「黏稠」。', sentence: '城市裡的人口很稠密。', build: { layout: 'lr', show: ['？', '周'], answer: '禾', options: ['禾', '糸', '言', '木'], clue: '想一想：種得密密麻麻的是什麼農作物？' } },
      { id: 'h-衡', combo: { type: '形聲字', pict: '外面是「行」，中間念起來有點像「衡」。古時候綁在牛角上的橫木，讓兩邊一樣重，就是「衡」。' }, char: '衡', zhuyin: 'ㄏㄥˊ', radical: '行', strokes: 16, words: ['平衡', '衡量'], say: '衡，衡量的衡', cloze: '＿量', img: 'balance-scale.png', options: ['衡', '衝', '街', '衛'], clue: '這個字的外面是「行」，中間有「大」。', explain: '答案是「衡」；「衝」的中間是「重」，「街」的中間是兩個「土」。', parts: ['行', '角', '大'], story: '外面是「行」，中間像牛角和一個「大」。兩邊一樣重，不歪一邊，就是「平衡」。', sentence: '我站在單槓上，努力保持平衡。' },
      { id: 'h-徜', combo: { layout: 'lr', parts: [['彳', 'm', '走路'], ['尚', 's', '']] }, char: '徜', zhuyin: 'ㄔㄤˊ', radical: '彳', strokes: 11, words: ['徜徉', '徜徉自在'], say: '徜，徜徉的徜', cloze: '＿徉', img: 'stroll-park.png', options: ['徜', '倘', '淌', '躺'], clue: '這個字的左邊是雙人旁。', explain: '答案是「徜」，左邊是雙人旁；「倘」的左邊是單人旁，「淌」的左邊是三點水。', parts: ['彳', '尚'], story: '左邊的「彳」是走路，右邊的「尚」念起來像「徜」。慢慢的、自由自在的走來走去，就是「徜徉」。', sentence: '我們在花海裡徜徉了一下午。', build: { layout: 'lr', show: ['？', '尚'], answer: '彳', options: ['彳', '亻', '氵', '身'], clue: '想一想：慢慢走來走去和什麼有關？' } },
      { id: 'h-徉', combo: { layout: 'lr', parts: [['彳', 'm', '走路'], ['羊', 's', '']] }, char: '徉', zhuyin: 'ㄧㄤˊ', radical: '彳', strokes: 9, words: ['徜徉', '徜徉山林'], say: '徉，徜徉的徉', cloze: '徜＿', img: 'stroll-park.png', options: ['徉', '洋', '佯', '羊'], clue: '這個字的左邊是雙人旁。', explain: '答案是「徉」，左邊是雙人旁；「洋」的左邊是三點水，「佯」的左邊是單人旁。', parts: ['彳', '羊'], story: '左邊是走路的「彳」，右邊的「羊」念起來像「徉」。和「徜」一起，就是悠閒的走來走去。', sentence: '週末，爺爺喜歡在山林裡徜徉。', build: { layout: 'lr', show: ['？', '羊'], answer: '彳', options: ['彳', '氵', '亻', '木'], clue: '想一想：悠閒的走來走去，左邊放哪一個？' } },
      { id: 'h-撫', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['無', 's', '']] }, char: '撫', zhuyin: 'ㄈㄨˇ', radical: '手', strokes: 15, words: ['撫平', '安撫'], say: '撫，安撫的撫', cloze: '安＿', img: 'pat-head.png', options: ['撫', '無', '憮', '蕪'], clue: '這個字的左邊是提手旁。', explain: '答案是「撫」，左邊是提手旁；「無」沒有提手旁，「蕪」的上面是草字頭。', parts: ['扌', '無'], story: '左邊是手，右邊的「無」念起來像「撫」。用手輕輕的摸，讓人心情平靜，就是「撫」。', sentence: '媽媽輕輕安撫哭鬧的妹妹。', build: { layout: 'lr', show: ['？', '無'], answer: '扌', options: ['扌', '忄', '艹', '火'], clue: '想一想：輕輕的摸要用身體的哪個部分？' } },
      { id: 'h-薩', combo: { type: '形聲字', pict: '上面是草字頭，下面念起來像「薩」。這個字常用在翻譯外國的名字。' }, char: '薩', zhuyin: 'ㄙㄚˋ', radical: '艸', strokes: 18, words: ['披薩', '菩薩'], say: '薩，菩薩的薩', cloze: '菩＿', img: 'pizza.png', options: ['薩', '產', '隆', '陸'], clue: '這個字的上面是草字頭。', explain: '答案是「薩」，上面是草字頭；「產」沒有草字頭，「隆」的左邊是阜字旁。', parts: ['艹', '阝', '產'], story: '上面是草字頭，下面念起來像「薩」。從義大利來的圓餅，上面鋪滿起司和配料，叫「披薩」。', sentence: '廟裡供奉著一尊菩薩。' },
      { id: 'h-乳', combo: { type: '會意字', pict: '左邊像一隻手抱著小孩，右邊的「乚」像彎彎的身體。媽媽抱著孩子餵奶，就是「乳」。' }, char: '乳', zhuyin: 'ㄖㄨˇ', radical: '乙', strokes: 8, words: ['煉乳', '牛乳'], say: '乳，牛乳的乳', cloze: '牛＿', img: 'milk-can.png', options: ['乳', '孔', '浮', '札'], clue: '這個字的右邊是彎彎的「乚」，左邊有「爫」和「子」。', explain: '答案是「乳」；「孔」的左邊只有「子」，「浮」的左邊是三點水。', parts: ['爫', '子', '乚'], story: '左邊像手抱著孩子，右邊像彎彎的身體。媽媽餵孩子喝的奶，就是「乳」。', sentence: '早餐我喝了一杯牛乳。' }
    ],
    vocab: [
      { id: 'v-風靡', cloze: true, clozeOptions: ['風靡', '冷清', '消失', '退流行'], word: '風靡', meaning: '非常流行，很多人都喜歡。', example: '這首歌＿＿全世界，大家都會唱。', img: 'pop-crowd.png', options: ['風靡', '聯袂', '徜徉', '擴展'] },
      { id: 'v-出嫁', cloze: true, clozeOptions: ['出嫁', '出生', '出門', '出國'], word: '出嫁', meaning: '女子結婚，到丈夫的家生活。', example: '姊姊＿＿那天，穿著白色禮服。', img: 'wedding-bride.png', options: ['出嫁', '贊成', '增添', '撫平'] },
      { id: 'v-贊成', cloze: true, clozeOptions: ['贊成', '反對', '拒絕', '討厭'], word: '贊成', meaning: '同意別人的想法。', example: '全班都＿＿去動物園校外教學。', img: 'raise-hands.png', options: ['贊成', '出嫁', '平衡', '干擾'] },
      { id: 'v-干擾', cloze: true, clozeOptions: ['干擾', '幫忙', '安靜', '保護'], word: '干擾', meaning: '打斷別人，讓人沒辦法專心。', example: '外面的施工聲＿＿我寫功課。', img: 'noise-ears.png', options: ['干擾', '贊成', '增添', '烹茶'] },
      { id: 'v-烹茶', cloze: true, clozeOptions: ['烹茶', '打球', '睡覺', '唱歌'], word: '烹茶', meaning: '燒開水沖泡葉子做成的飲料。', example: '爺爺每天早上都在院子裡＿＿。', img: 'tea-set.png', options: ['烹茶', '干擾', '擴展', '撫平'] },
      { id: 'v-樹薯', cloze: true, clozeOptions: ['樹薯', '石頭', '鐵釘', '貝殼'], word: '樹薯', meaning: '一種植物，地下的根粗粗的，可以磨成粉。', example: '這種粉是用＿＿做成的。', img: 'cassava.png', options: ['樹薯', '煉乳', '披薩', '粉末'] },
      { id: 'v-粉末', cloze: true, clozeOptions: ['粉末', '大石', '木塊', '冰塊'], word: '粉末', meaning: '很細很細的小顆粒。', example: '把餅乾壓成＿＿，撒在冰淇淋上。', img: 'powder.png', options: ['粉末', '樹薯', '煉乳', '披薩'] },
      { id: 'v-增添', cloze: true, clozeOptions: ['增添', '減少', '拿走', '刪掉'], word: '增添', meaning: '再多加上一些。', example: '一盆小花為教室＿＿了色彩。', img: 'add-water.png', options: ['增添', '擴展', '撫平', '干擾'] },
      { id: 'v-擴展', cloze: true, clozeOptions: ['擴展', '縮小', '關閉', '收起'], word: '擴展', meaning: '向外推開，變得更大、更寬。', example: '這家公司把生意＿＿到國外。', img: 'map-grow.png', options: ['擴展', '增添', '平衡', '聯袂'] },
      { id: 'v-聯袂', cloze: true, clozeOptions: ['聯袂', '分開', '各自', '單獨'], word: '聯袂', meaning: '手牽手一同，一起出現或表演。', example: '兩位歌手＿＿登臺，觀眾好興奮。', img: 'hand-in-hand.png', options: ['聯袂', '風靡', '徜徉', '黏稠'] },
      { id: 'v-黏稠', cloze: true, clozeOptions: ['黏稠', '清淡', '稀薄', '透明'], word: '黏稠', meaning: '很濃，會牽絲，不容易流動。', example: '蜂蜜很＿＿，倒得很慢。', img: 'thick-honey.png', options: ['黏稠', '平衡', '風靡', '聯袂'] },
      { id: 'v-平衡', cloze: true, clozeOptions: ['平衡', '傾倒', '歪斜', '翻覆'], word: '平衡', meaning: '兩邊一樣重，不會歪向一邊。', example: '走在獨木橋上要保持＿＿。', img: 'balance-scale.png', options: ['平衡', '黏稠', '擴展', '徜徉'] },
      { id: 'v-徜徉', cloze: true, clozeOptions: ['徜徉', '奔跑', '逃跑', '趕路'], word: '徜徉', meaning: '悠閒自在的走來走去。', example: '我們在海邊＿＿，好舒服。', img: 'stroll-park.png', options: ['徜徉', '聯袂', '風靡', '干擾'] },
      { id: 'v-撫平', cloze: true, clozeOptions: ['撫平', '弄皺', '撕破', '揉亂'], word: '撫平', meaning: '用手輕輕摸，讓皺褶消失。', example: '媽媽把我衣服的皺褶＿＿。', img: 'pat-head.png', options: ['撫平', '增添', '烹茶', '贊成'] },
      { id: 'v-披薩', cloze: true, clozeOptions: ['披薩', '石頭', '鉛筆', '雨傘'], word: '披薩', meaning: '圓餅上鋪著起司和配料，再烤熟的外國食物。', example: '生日派對上有一大盤＿＿。', img: 'pizza.png', options: ['披薩', '煉乳', '樹薯', '粉末'] },
      { id: 'v-煉乳', cloze: true, clozeOptions: ['煉乳', '醬油', '辣椒', '醋'], word: '煉乳', meaning: '把牛奶煮得濃濃的、甜甜的調味料。', example: '草莓淋上＿＿，又香又甜。', img: 'milk-can.png', options: ['煉乳', '披薩', '樹薯', '粉末'] },
      { id: 'v-大街小巷', cloze: true, clozeOptions: ['大街小巷', '深山野外', '海底深處', '天空雲端'], word: '大街小巷', meaning: '城鎮裡每一條寬寬窄窄的路。', example: '過年時，＿＿＿＿都掛滿紅燈籠。', img: 'city-streets.png', options: ['大街小巷', '各式各樣', '發揚光大', '源源不絕'] },
      { id: 'v-各式各樣', cloze: true, clozeOptions: ['各式各樣', '一模一樣', '只有一種', '完全相同'], word: '各式各樣', meaning: '很多不同的種類和外觀。', example: '文具店裡有＿＿＿＿的筆。', img: 'many-snacks.png', options: ['各式各樣', '大街小巷', '源源不絕', '風靡'] },
      { id: 'v-發揚光大', cloze: true, clozeOptions: ['發揚光大', '慢慢消失', '丟到一旁', '停止不前'], word: '發揚光大', meaning: '把好的傳統繼續推廣，讓它更興盛。', example: '我們要把傳統的布袋戲＿＿＿＿。', img: 'torch-pass.png', options: ['發揚光大', '源源不絕', '各式各樣', '大街小巷'] },
      { id: 'v-源源不絕', cloze: true, clozeOptions: ['源源不絕', '一下就停', '越來越少', '斷斷續續'], word: '源源不絕', meaning: '一直來，連續著沒有停止。', example: '他的點子＿＿＿＿，大家都很佩服。', img: 'spring-water.png', options: ['源源不絕', '發揚光大', '各式各樣', '聯袂'] }
    ],
    charwords: [
      { id: 'cw-靡', char: '靡', img: 'pop-crowd.png', charMeaning: '倒下；沒有精神。', word: '萎靡', meaning: '沒有精神，提不起勁。', example: '他生病了，看起來很＿＿。', options: ['萎靡', '嫁妝', '贊助', '干擾'] },
      { id: 'cw-嫁', char: '嫁', img: 'wedding-bride.png', charMeaning: '女子結婚。', word: '嫁妝', meaning: '女子結婚時從家裡帶去的東西。', example: '外婆的＿＿是一個木頭衣櫃。', options: ['嫁妝', '烹飪', '薯條', '週末'] },
      { id: 'cw-贊', char: '贊', img: 'raise-hands.png', charMeaning: '幫助；同意。', word: '贊助', meaning: '拿錢或東西來幫忙。', example: '這場音樂會由很多公司＿＿。', options: ['贊助', '添加', '擴大', '分袂'] },
      { id: 'cw-干', char: '干', img: 'noise-ears.png', charMeaning: '打擾；有關係。', word: '干擾', meaning: '打斷別人，讓人不能專心。', example: '手機鈴聲會＿＿上課。', options: ['干擾', '稠密', '衡量', '安撫'] },
      { id: 'cw-烹', char: '烹', img: 'cooking-class.png', charMeaning: '用火煮。', word: '烹飪', meaning: '做菜。', example: '舅舅的＿＿手藝很好。', options: ['烹飪', '菩薩', '牛乳', '萎靡'] },
      { id: 'cw-薯', char: '薯', img: 'fries.png', charMeaning: '根部胖胖可以吃的植物。', word: '薯條', meaning: '把馬鈴薯切成長條炸熟的食物。', example: '我點了漢堡和＿＿。', options: ['薯條', '嫁妝', '贊助', '干擾'] },
      { id: 'cw-末', char: '末', img: 'powder.png', charMeaning: '最後、尾端；細細的粉。', word: '週末', meaning: '一個星期的最後兩天。', example: '這個＿＿我們去爬山。', options: ['週末', '烹飪', '添加', '擴大'] },
      { id: 'cw-添', char: '添', img: 'add-water.png', charMeaning: '再加上。', word: '添加', meaning: '加進去，讓它變多。', example: '這罐果汁沒有＿＿色素。', options: ['添加', '分袂', '稠密', '衡量'] },
      { id: 'cw-擴', char: '擴', img: 'map-grow.png', charMeaning: '往外推開，變大。', word: '擴大', meaning: '變得更大、更寬。', example: '這間店＿＿營業，多了好多座位。', options: ['擴大', '安撫', '菩薩', '牛乳'] },
      { id: 'cw-袂', char: '袂', img: 'hand-in-hand.png', charMeaning: '衣服的袖子。', word: '分袂', meaning: '分手、分開。', example: '兩位好友在車站＿＿，揮手道別。', options: ['分袂', '萎靡', '嫁妝', '贊助'] },
      { id: 'cw-稠', char: '稠', img: 'thick-honey.png', charMeaning: '很濃；很密。', word: '稠密', meaning: '又多又密，擠在一起。', example: '這座城市人口＿＿。', options: ['稠密', '干擾', '烹飪', '薯條'] },
      { id: 'cw-衡', char: '衡', img: 'balance-scale.png', charMeaning: '秤東西；兩邊一樣重。', word: '衡量', meaning: '仔細比較、考慮。', example: '買東西前要先＿＿自己需不需要。', options: ['衡量', '週末', '添加', '擴大'] },
      { id: 'cw-徜', char: '徜', img: 'stroll-park.png', charMeaning: '悠閒的走。', word: '徜徉自在', meaning: '悠閒的走來走去，非常舒服。', example: '小鹿在草原上＿＿＿＿。', options: ['徜徉自在', '分袂', '稠密', '衡量'] },
      { id: 'cw-徉', char: '徉', img: 'stroll-park.png', charMeaning: '悠閒的走。', word: '徜徉山林', meaning: '在山裡的樹林悠閒的走。', example: '退休後，爺爺喜歡＿＿＿＿。', options: ['徜徉山林', '安撫', '菩薩', '牛乳'] },
      { id: 'cw-撫', char: '撫', img: 'pat-head.png', charMeaning: '用手輕輕摸。', word: '安撫', meaning: '用溫柔的話或動作讓人平靜。', example: '老師＿＿哭泣的小朋友。', options: ['安撫', '萎靡', '嫁妝', '贊助'] },
      { id: 'cw-薩', char: '薩', img: 'pizza.png', charMeaning: '用在翻譯的名字。', word: '菩薩', meaning: '廟裡供奉、大家祈求保佑的神像。', example: '阿嬤在廟裡向＿＿祈求平安。', options: ['菩薩', '干擾', '烹飪', '薯條'] },
      { id: 'cw-乳', char: '乳', img: 'milk-can.png', charMeaning: '奶。', word: '牛乳', meaning: '從乳牛身上擠出的奶。', example: '一杯＿＿配一片吐司，就是我的早餐。', options: ['牛乳', '週末', '添加', '擴大'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-為人作嫁', situationImg: 'id-work-for-others.png',
        anim: { bg: 'room', a: { kid: ['🧒', 30, 62, 12], poster: ['🖼️', 56, 50, 12], boss: ['🧑', 80, 62, 12, 'h'], star: ['🏅', 80, 40, 9, 'h'], sad: ['😞', 30, 38, 9, 'h'] },
          s: [['小安熬夜畫了一張很棒的海報。', [['bob', 'poster']]],
            ['可是同組的人把海報拿去交，', [['in', 'boss'], ['mv', 'poster', [72, 50, 700]]]],
            ['老師只稱讚那個人，小安什麼也沒得到。', [['in', 'star'], ['in', 'sad']]],
            ['辛苦都是在幫別人，就是為人作嫁。', [['shake', 'kid']]]] },
        idiom: '為人作嫁', char: '嫁', meaning: '辛辛苦苦做事，好處卻都給了別人，自己什麼也沒得到。', example: '他想了好點子，卻被別人拿去領功勞，真是為人作嫁。', situation: '小安熬夜畫的海報被別人拿去交，老師只稱讚了那個人。',
        fill: { options: ['我努力了半天，功勞全被他拿走，簡直是＿＿＿＿。', '他做完報告自己上臺發表，得到稱讚，真是＿＿＿＿。'], clue: '提示：哪一句是辛苦了，好處卻給別人？', explain: '第一句用得對：功勞被別人拿走。自己得到稱讚，不是為人作嫁。' } },
      { id: 'i-捨本逐末', situationImg: 'id-wrong-focus.png',
        anim: { bg: 'school', a: { kid: ['🧒', 30, 62, 12], book: ['📖', 60, 66, 10], pen: ['🖍️', 60, 44, 10], deco: ['🌈', 60, 30, 10, 'h'], x: ['❌', 80, 50, 10, 'h'] },
          s: [['明天要考試，小華該好好讀書。', [['bob', 'book']]],
            ['他卻花了一整晚，把筆記本畫得五顏六色，', [['in', 'deco'], ['wig', 'pen']]],
            ['書一頁也沒讀。', [['in', 'x']]],
            ['放下重要的事，只顧小地方，就是捨本逐末。', [['shake', 'kid']]]] },
        idiom: '捨本逐末', char: '末', meaning: '丟下最重要的事，只顧著不重要的小地方。', example: '練跑不練體力，只顧著買漂亮的鞋，是捨本逐末。', situation: '明天要考試，小華卻花整晚裝飾筆記本，書一頁都沒讀。',
        fill: { options: ['只在乎包裝，不在乎食物好不好吃，是＿＿＿＿。', '他先把功課寫完，再去玩，一點也不＿＿＿＿。'], clue: '提示：哪一句是放下重要的事，只顧小地方？', explain: '第一句用得對：食物好吃才重要，包裝是小事。先寫功課再玩，分得清輕重。' } },
      { id: 'i-畫蛇添足', situationImg: 'id-snake-feet.png',
        anim: { bg: 'park', a: { a1: ['🧑', 24, 62, 12], snake: ['🐍', 50, 64, 12], foot: ['🦶', 60, 74, 7, 'h'], cup: ['🍶', 84, 56, 10], b1: ['🧔', 84, 72, 11, 'h'] },
          s: [['大家比賽畫蛇，先畫好的人可以喝酒。', [['bob', 'snake']]],
            ['阿明最先畫好，還得意的幫蛇加上腳。', [['in', 'foot'], ['wig', 'foot']]],
            ['另一個人說：「蛇沒有腳！」拿走了酒。', [['in', 'b1'], ['mv', 'cup', [84, 64, 600]]]],
            ['多做了不必要的事，反而弄糟，就是畫蛇添足。', [['shake', 'a1']]]] },
        idiom: '畫蛇添足', char: '添', meaning: '做了多餘的事，反而把事情弄糟。', example: '這幅畫本來很美，他又加了一堆線條，結果畫蛇添足。', situation: '阿明最先畫好蛇，還幫蛇加上腳，結果輸了比賽。',
        fill: { options: ['文章已經很好了，再加那句話就＿＿＿＿了。', '他把該做的事做好，沒有多做，一點也不＿＿＿＿。'], clue: '提示：哪一句是多做反而弄糟？', explain: '第一句用得對：多加一句反而不好。沒有多做，就不是畫蛇添足。' } },
      { id: 'i-如虎添翼', situationImg: 'id-tiger-wings.png',
        anim: { bg: 'park', a: { tiger: ['🐯', 40, 62, 14], wing: ['🪽', 56, 52, 10, 'h'], fly: ['💨', 70, 40, 9, 'h'], star: ['⭐', 82, 24, 9, 'h'] },
          s: [['老虎本來就很強壯。', [['bob', 'tiger']]],
            ['如果再長出一對翅膀，', [['in', 'wing']]],
            ['牠不但會跑，還能飛，更厲害了！', [['in', 'fly'], ['mv', 'tiger', [60, 40, 700]], ['in', 'star']]],
            ['本來就很強，又得到幫助變得更強，就是如虎添翼。', [['pop', 'star']]]] },
        idiom: '如虎添翼', char: '添', meaning: '本來就很強，又得到幫助，變得更強。', example: '球隊來了一位好教練，真是如虎添翼。', situation: '老虎本來就很強，又長出翅膀，變得會飛，更厲害了。',
        fill: { options: ['他本來就會畫畫，買了新畫板後更是＿＿＿＿。', '他的腳受傷了，跑得更慢，真是＿＿＿＿。'], clue: '提示：哪一句是強的人變得更強？', explain: '第一句用得對：會畫畫又有新工具。腳受傷變慢，剛好相反。' } },
      { id: 'i-水乳交融', situationImg: 'id-best-friends.png',
        anim: { bg: 'room', a: { cup: ['🥛', 50, 60, 14], w: ['💧', 34, 36, 9], m: ['🍼', 66, 36, 9], heart: ['💞', 50, 34, 10, 'h'] },
          s: [['一杯水，', [['mv', 'w', [46, 56, 700]]]],
            ['倒進一點牛奶，', [['mv', 'm', [54, 56, 700]]]],
            ['兩樣混在一起，分也分不開。', [['out', 'w'], ['out', 'm'], ['in', 'heart']]],
            ['感情很好、合得很緊密，就是水乳交融。', [['pop', 'heart']]]] },
        idiom: '水乳交融', char: '乳', meaning: '像水和奶混在一起一樣，關係非常緊密、合得很好。', example: '新來的同學很快就和大家水乳交融。', situation: '水和牛奶倒在一起，混合得分也分不開。',
        fill: { options: ['這個團隊合作得＿＿＿＿，表演很成功。', '他們兩個天天吵架，相處得很＿＿＿＿。'], clue: '提示：哪一句是關係很好、很緊密？', explain: '第一句用得對：團隊合作得很好。天天吵架，剛好相反。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-靡', char: '靡', wrong: '麻', sentence: '這種遊戲風靡了全校。', options: ['靡', '麻', '磨'], clue: '這裡是說非常流行，想一想，哪一個字的下面是「非」？', explain: '要改成「靡」。非常流行是「風靡」；「麻」是麻煩的麻。' },
      { id: 'fx-嫁', char: '嫁', wrong: '稼', sentence: '阿姨下個月就要出嫁了。', options: ['嫁', '稼', '家'], clue: '這裡是說女子結婚，想一想，哪一個字有女字旁？', explain: '要改成「嫁」。女子結婚是「出嫁」；「稼」是莊稼的稼。' },
      { id: 'fx-贊', char: '贊', wrong: '攢', sentence: '我贊成你的想法。', options: ['贊', '攢', '鑽'], clue: '這裡是說同意，想一想，哪一個字左邊沒有偏旁、下面是「貝」？', explain: '要改成「贊」。同意是「贊成」；「鑽」是鑽石的鑽。' },
      { id: 'fx-烹', char: '烹', wrong: '享', sentence: '媽媽報名了烹飪班。', options: ['烹', '享', '亨'], clue: '這裡是說做菜，想一想，哪一個字的下面是四點火？', explain: '要改成「烹」。做菜是「烹飪」；「享」是分享的享。' },
      { id: 'fx-薯', char: '薯', wrong: '暑', sentence: '烤地瓜和烤馬鈴薯都很香。', options: ['薯', '暑', '署'], clue: '這裡說的是一種長在土裡的植物，想一想，哪一個字有草字頭？', explain: '要改成「薯」。馬鈴薯的「薯」有草字頭；「暑」是暑假的暑。' },
      { id: 'fx-添', char: '添', wrong: '舔', sentence: '天冷了，記得添一件外套。', options: ['添', '舔', '天'], clue: '這裡是說再加上，想一想，哪一個字有三點水？', explain: '要改成「添」。再加上是「添」；「舔」是用舌頭舔的舔。' },
      { id: 'fx-擴', char: '擴', wrong: '礦', sentence: '這條馬路要擴寬了。', options: ['擴', '礦', '廣'], clue: '這裡是說變得更大更寬，想一想，哪一個字有提手旁？', explain: '要改成「擴」。變寬是「擴」；「礦」是礦石的礦。' },
      { id: 'fx-稠', char: '稠', wrong: '綢', sentence: '這碗粥煮得太稠了。', options: ['稠', '綢', '調'], clue: '這裡是說很濃、不好流動，想一想，哪一個字有禾字旁？', explain: '要改成「稠」。很濃是「稠」；「綢」是絲綢的綢。' },
      { id: 'fx-衡', char: '衡', wrong: '衝', sentence: '天秤兩邊一樣重，保持平衡。', options: ['衡', '衝', '街'], clue: '這裡是說兩邊一樣重，想一想，哪一個字的中間有「大」？', explain: '要改成「衡」。兩邊一樣重是「平衡」；「衝」是衝刺的衝。' },
      { id: 'fx-徉', char: '徉', wrong: '洋', sentence: '我們在森林步道上徜徉。', options: ['徉', '洋', '佯'], clue: '這裡是說悠閒的走，想一想，哪一個字有雙人旁？', explain: '要改成「徉」。悠閒的走是「徜徉」；「洋」是海洋的洋。' },
      { id: 'fx-撫', char: '撫', wrong: '無', sentence: '她輕輕撫摸小貓的背。', options: ['撫', '無', '蕪'], clue: '這裡是說用手輕輕摸，想一想，哪一個字有提手旁？', explain: '要改成「撫」。輕輕摸是「撫摸」；「無」是沒有的意思。' },
      { id: 'fx-乳', char: '乳', wrong: '孔', sentence: '小羊在喝羊乳。', options: ['乳', '孔', '札'], clue: '這裡說的是奶，想一想，哪一個字的左邊有「爫」和「子」？', explain: '要改成「乳」。奶是「乳」；「孔」是孔雀的孔。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿煩」是很費事、不方便。', sentence: '這件事好＿煩。', frame: '＿煩', options: ['麻', '靡'], answer: '麻', clue: '提示：這個字的下面沒有「非」。', explain: '答案是「麻」；「靡」是風靡的靡。' },
      { id: 's2', meaning: '「回＿」是回到自己住的地方。', sentence: '放學後我們一起回＿。', frame: '回＿', options: ['家', '嫁'], answer: '家', clue: '提示：這個字沒有女字旁。', explain: '答案是「家」；「嫁」是出嫁的嫁。' },
      { id: 's3', meaning: '「＿石」是很硬、閃閃發亮的寶石。', sentence: '戒指上有一顆＿石。', frame: '＿石', options: ['鑽', '贊'], answer: '鑽', clue: '提示：和金屬有關，左邊是金字旁。', explain: '答案是「鑽」；「贊」是贊成的贊。' },
      { id: 's4', meaning: '「一＿」是十個一百。', sentence: '這本書有一＿頁。', frame: '一＿', options: ['千', '干'], answer: '千', clue: '提示：這個字的第一筆是一撇。', explain: '答案是「千」；「干」是干擾的干。' },
      { id: 's5', meaning: '「分＿」是把好東西給大家一起用。', sentence: '我把餅乾分＿給同學。', frame: '分＿', options: ['享', '烹'], answer: '享', clue: '提示：這個字的下面是「子」。', explain: '答案是「享」；「烹」是烹飪的烹。' },
      { id: 's6', meaning: '「＿假」是夏天放的長假。', sentence: '＿假時我去外婆家玩。', frame: '＿假', options: ['暑', '薯'], answer: '暑', clue: '提示：和天氣有關，上面是「日」。', explain: '答案是「暑」；「薯」是薯條的薯。' },
      { id: 's7', meaning: '「＿來」是還沒到的以後。', sentence: '我＿來想當醫生。', frame: '＿來', options: ['未', '末'], answer: '未', clue: '提示：這個字上面短、下面長。', explain: '答案是「未」；「末」是週末的末。' },
      { id: 's8', meaning: '「＿場」是很大的空地。', sentence: '大家在＿場上跳舞。', frame: '＿場', options: ['廣', '擴'], answer: '廣', clue: '提示：這個字沒有提手旁。', explain: '答案是「廣」；「擴」是擴大的擴。' },
      { id: 's9', meaning: '「＿定」是拿定主意。', sentence: '我＿定明天早起。', frame: '＿定', options: ['決', '袂'], answer: '決', clue: '提示：這個字的左邊是三點水。', explain: '答案是「決」；「袂」是聯袂的袂。' },
      { id: 's10', meaning: '「＿皮」是愛玩、愛搗蛋。', sentence: '弟弟很＿皮。', frame: '＿皮', options: ['調', '稠'], answer: '調', clue: '提示：這個字的左邊是言字旁。', explain: '答案是「調」；「稠」是黏稠的稠。' },
      { id: 's11', meaning: '「＿道」是城市裡的路。', sentence: '這條＿道很乾淨。', frame: '＿道', options: ['街', '衡'], answer: '街', clue: '提示：這個字中間是兩個「土」。', explain: '答案是「街」；「衡」是平衡的衡。' },
      { id: 's12', meaning: '「海＿」是很大很大的海。', sentence: '鯨魚住在海＿裡。', frame: '海＿', options: ['洋', '徉'], answer: '洋', clue: '提示：和水有關，左邊是三點水。', explain: '答案是「洋」；「徉」是徜徉的徉。' },
      { id: 's13', meaning: '「＿聊」是沒事做、覺得很悶。', sentence: '下雨天待在家好＿聊。', frame: '＿聊', options: ['無', '撫'], answer: '無', clue: '提示：這個字沒有提手旁。', explain: '答案是「無」；「撫」是安撫的撫。' }
    ],
    listen: [
      { id: 'l1', text: '這首歌非常流行，全世界的人都會唱。', answer: 0, options: [{ text: '風靡', img: 'pop-crowd.png' }, { text: '聯袂', img: 'hand-in-hand.png' }, { text: '徜徉', img: 'stroll-park.png' }, { text: '擴展', img: 'map-grow.png' }] },
      { id: 'l2', text: '我們在海邊悠閒的走來走去。', answer: 0, options: [{ text: '徜徉', img: 'stroll-park.png' }, { text: '平衡', img: 'balance-scale.png' }, { text: '干擾', img: 'noise-ears.png' }, { text: '撫平', img: 'pat-head.png' }] },
      { id: 'l3', text: '蜂蜜很濃，倒得很慢。', answer: 0, options: [{ text: '黏稠', img: 'thick-honey.png' }, { text: '粉末', img: 'powder.png' }, { text: '煉乳', img: 'milk-can.png' }, { text: '平衡', img: 'balance-scale.png' }] },
      { id: 'l4', text: '兩位歌手手牽手一起上臺表演。', answer: 0, options: [{ text: '聯袂', img: 'hand-in-hand.png' }, { text: '出嫁', img: 'wedding-bride.png' }, { text: '贊成', img: 'raise-hands.png' }, { text: '風靡', img: 'pop-crowd.png' }] },
      { id: 'l5', text: '走在獨木橋上，身體不能歪向一邊。', answer: 0, options: [{ text: '平衡', img: 'balance-scale.png' }, { text: '擴展', img: 'map-grow.png' }, { text: '黏稠', img: 'thick-honey.png' }, { text: '徜徉', img: 'stroll-park.png' }] },
      { id: 'l6', text: '文具店裡有很多不同種類的筆。', answer: 0, options: [{ text: '各式各樣', img: 'many-snacks.png' }, { text: '大街小巷', img: 'city-streets.png' }, { text: '源源不絕', img: 'spring-water.png' }, { text: '發揚光大', img: 'torch-pass.png' }] },
      { id: 'l7', text: '泉水一直流出來，從來沒有停過。', answer: 0, options: [{ text: '源源不絕', img: 'spring-water.png' }, { text: '各式各樣', img: 'many-snacks.png' }, { text: '大街小巷', img: 'city-streets.png' }, { text: '增添', img: 'add-water.png' }] },
      { id: 'l8', text: '全班舉手，都同意這個想法。', answer: 0, options: [{ text: '贊成', img: 'raise-hands.png' }, { text: '干擾', img: 'noise-ears.png' }, { text: '出嫁', img: 'wedding-bride.png' }, { text: '烹茶', img: 'tea-set.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '做什麼', answer: '怎麼樣', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看是什麼樣的東西。',
      /* 短語：（動詞）一（量詞）＋形容詞＋的＋名詞（句子都是自己寫的） */
      intro: { example: '喝一杯清涼的果汁', img: 'pr-juice.png',
        parts: [{ text: '喝一杯', role: '做什麼' }, { text: '清涼', role: '怎麼樣' }, { text: '的' }, { text: '果汁', role: '什麼東西' }],
        explain: '先說做什麼和數量，再說出東西的樣子，加上「的」，最後說是什麼東西。' },
      pick: [
        { id: 'ph1', img: 'pr-milk-tea.png', before: '喝一杯', noun: '奶茶', ask: '喝一杯什麼樣的奶茶', look: '再看看圖片，喝的人表情怎麼樣？', options: ['香濃', '酸臭', '發霉', '腐爛'], clue: '提示：一喝就停不下來，滿口都是奶味。', explain: '答案是「香濃」，完整的短語是「喝一杯香濃的奶茶」。' },
        { id: 'ph2', img: 'pizza.png', before: '吃一片', noun: '披薩', ask: '吃一片什麼樣的披薩', look: '再看看圖片，披薩是不是剛烤好？', options: ['熱呼呼', '冷冰冰', '發霉', '硬梆梆'], clue: '提示：剛從烤箱拿出來，還在冒煙。', explain: '答案是「熱呼呼」，完整的短語是「吃一片熱呼呼的披薩」。' },
        { id: 'ph3', img: 'pr-noodle.png', before: '煮一碗', noun: '麵', ask: '煮一碗什麼樣的麵', look: '再看看圖片，麵有沒有冒白煙？', options: ['熱騰騰', '冷冰冰', '乾巴巴', '硬梆梆'], clue: '提示：冒著白煙，冬天吃最暖。', explain: '答案是「熱騰騰」，完整的短語是「煮一碗熱騰騰的麵」。' },
        { id: 'ph4', img: 'pr-flower.png', before: '摘一朵', noun: '花', ask: '摘一朵什麼樣的花', look: '再看看圖片，花的顏色怎麼樣？', options: ['鮮豔', '枯萎', '乾黃', '腐爛'], clue: '提示：顏色好亮，還帶著露水。', explain: '答案是「鮮豔」，完整的短語是「摘一朵鮮豔的花」。' },
        { id: 'ph5', img: 'pr-cake.png', before: '切一塊', noun: '蛋糕', ask: '切一塊什麼樣的蛋糕', look: '再看看圖片，蛋糕看起來軟不軟？', options: ['鬆軟', '焦黑', '發霉', '乾硬'], clue: '提示：用叉子輕輕一壓就陷下去。', explain: '答案是「鬆軟」，完整的短語是「切一塊鬆軟的蛋糕」。' },
        { id: 'ph6', img: 'pr-choir.png', before: '唱一首', noun: '歌', ask: '唱一首什麼樣的歌', look: '再看看圖片，聽的人開不開心？', options: ['好聽', '刺耳', '吵鬧', '沙啞'], clue: '提示：大家都拍手要再來一次。', explain: '答案是「好聽」，完整的短語是「唱一首好聽的歌」。' },
        { id: 'ph7', img: 'pr-library.png', before: '讀一本', noun: '故事書', ask: '讀一本什麼樣的故事書', look: '再看看圖片，讀的人表情怎麼樣？', options: ['有趣', '無聊', '破舊', '模糊'], clue: '提示：他一邊讀一邊哈哈大笑。', explain: '答案是「有趣」，完整的短語是「讀一本有趣的故事書」。' },
        { id: 'ph8', img: 'pr-path.png', before: '走一條', noun: '小路', ask: '走一條什麼樣的小路', look: '再看看圖片，路上吵不吵？', options: ['寧靜', '吵鬧', '危險', '骯髒'], clue: '提示：路上只聽得到鳥叫聲。', explain: '答案是「寧靜」，完整的短語是「走一條寧靜的小路」。' }
      ],
      say: [],
      words: [
        { word: '大街小巷', meaning: '城鎮裡每一條寬寬窄窄的路。', img: 'city-streets.png' },
        { word: '各式各樣', meaning: '很多不同的種類和外觀。', img: 'many-snacks.png' },
        { word: '發揚光大', meaning: '把好的傳統繼續推廣，讓它更興盛。', img: 'torch-pass.png' },
        { word: '源源不絕', meaning: '一直來，連續著沒有停止。', img: 'spring-water.png' }
      ],
      choose: [
        { id: 'pw1', word: '大街小巷', options: ['聖誕節到了，大街小巷都是燈飾。', '他躲在房間的大街小巷裡。'], clue: '提示：想一想，「大街小巷」是城裡的路，還是房間裡？', explain: '第一句用得對：城裡到處都是燈飾。房間裡沒有大街小巷。' },
        { id: 'pw2', word: '各式各樣', options: ['園遊會上有各式各樣的攤位。', '這盒蠟筆只有一種顏色，真是各式各樣。'], clue: '提示：想一想，「各式各樣」是很多種，還是只有一種？', explain: '第一句用得對：很多不同的攤位。只有一種顏色，剛好相反。' },
        { id: 'pw3', word: '發揚光大', options: ['我們要把愛護環境的精神發揚光大。', '他把這個好習慣發揚光大，從此再也不做了。'], clue: '提示：想一想，「發揚光大」是讓好事更興盛，還是停止？', explain: '第一句用得對：讓好精神更興盛。再也不做，剛好相反。' },
        { id: 'pw4', word: '源源不絕', options: ['觀光客源源不絕的來到這個小鎮。', '水龍頭關起來後，水源源不絕的停了。'], clue: '提示：想一想，「源源不絕」是一直來，還是停了？', explain: '第一句用得對：觀光客一直來。水停了，剛好相反。' }
      ],
      make: [
        { id: 'pm1', word: '大街小巷', clue: '提示：想想看，什麼時候城裡到處都很熱鬧？', model: '中秋節晚上，大街小巷都飄著烤肉香。' },
        { id: 'pm2', word: '各式各樣', clue: '提示：想想看，哪裡有很多不同的東西？', model: '夜市裡有各式各樣的小吃。' },
        { id: 'pm3', word: '發揚光大', clue: '提示：想想看，有什麼好傳統值得一直傳下去？', model: '我們要把客家山歌發揚光大。' },
        { id: 'pm4', word: '源源不絕', clue: '提示：想想看，什麼東西一直來、不會停？', model: '山上的泉水源源不絕的流下來。' }
      ]
    },
    pattern: [
      { key: 'bujingeng', id: 'bg', title: '不僅……更……', img: 'bujingeng.png',
        meaning: '用「不僅」、「更」，先說一件事，再說更進一步的事。',
        examples: ['她不僅會唱歌，更會自己寫歌。'],
        match: [
          { id: 'pt-bg-m1', img: 'pt-runner.png', front: '小強不僅跑得快，', options: ['更拿下全校冠軍。', '卻跑輸了。', '所以跑很慢。'], clue: '提示：看看圖片，跑得快之外，還有什麼更厲害的事？', explain: '答案是「更拿下全校冠軍」：從跑得快，進一步到拿冠軍。' },
          { id: 'pt-bg-m2', img: 'pt-cook-kid.png', front: '妹妹不僅會洗碗，', options: ['更會煮一桌菜。', '卻不會洗碗。', '所以很懶。'], clue: '提示：看看圖片，會洗碗之外，還會什麼更難的事？', explain: '答案是「更會煮一桌菜」：從洗碗，進一步到煮菜。' },
          { id: 'pt-bg-m3', img: 'pt-library.png', front: '這座圖書館不僅書很多，', options: ['更有舒服的座位。', '卻沒有半本書。', '所以書很少。'], clue: '提示：看看圖片，書很多之外，還有什麼好的地方？', explain: '答案是「更有舒服的座位」：從書多，進一步到座位舒服。' }
        ],
        conj: [
          { id: 'pt-bg-c1', full: '他不僅成績好，更樂於助人。', img: 'pt-helper.png', sentence: '他＿＿成績好，＿樂於助人。', options: ['不僅……更……', '一方面……一方面……', '雖然……卻……'], clue: '提示：先說一件事，再說更進一步的事。數數看有幾個空格。', explain: '答案是「不僅……更……」：他不僅成績好，更樂於助人。' },
          { id: 'pt-bg-c2', full: '這家店不僅麵好吃，湯頭更是鮮美。', img: 'pr-noodle.png', sentence: '這家店＿＿麵好吃，湯頭＿是鮮美。', options: ['不僅……更……', '一方面……一方面……', '雖然……卻……'], clue: '提示：先說一件事，再說更進一步的事。數數看有幾個空格。', explain: '答案是「不僅……更……」：這家店不僅麵好吃，湯頭更是鮮美。' }
        ],
        half: [
          { id: 'pt-bg-h1', front: '這部電影不僅好看，', clue: '提示：好看之外，還有什麼更深一層的感受？記得要說「更」。', model: '更讓人感動落淚。' },
          { id: 'pt-bg-h2', front: '運動不僅讓身體健康，', clue: '提示：身體健康之外，還有什麼更好的地方？記得要說「更」。', model: '更讓心情變好。' }
        ],
        whole: [
          { id: 'pt-bg-w1', clue: '提示：用「不僅」、「更」先說一件事，再說更進一步的事。想想看：你的好朋友有什麼優點？', model: '我的好朋友不僅會彈琴，更會作曲。' }
        ] },
      { key: 'yifangmian', id: 'yf', title: '一方面……一方面……', img: 'yifangmian.png',
        meaning: '用「一方面」、「一方面」，說出同一件事的兩個部分或兩個理由。',
        examples: ['學鋼琴一方面要練手指，一方面要學看譜。'],
        match: [
          { id: 'pt-yf-m1', img: 'pt-plant.png', front: '種花一方面要每天澆水，', options: ['一方面要晒太陽。', '一方面不要管它。', '一方面把花拔掉。'], clue: '提示：看看圖片，花要長得好，還需要什麼？', explain: '答案是「一方面要晒太陽」：澆水和晒太陽，都是種花要做的事。' },
          { id: 'pt-yf-m2', img: 'pt-team.png', front: '比賽要贏，一方面要個人努力，', options: ['一方面要團隊合作。', '一方面要吵架。', '一方面要偷懶。'], clue: '提示：看看圖片，除了自己努力，大家還要怎麼做？', explain: '答案是「一方面要團隊合作」：個人努力和團隊合作，都是贏的理由。' },
          { id: 'pt-yf-m3', img: 'pt-early-bird.png', front: '我早睡早起，一方面讓身體健康，', options: ['一方面上學不遲到。', '一方面去熬夜。', '一方面睡過頭。'], clue: '提示：看看圖片，早起還有什麼好處？', explain: '答案是「一方面上學不遲到」：身體健康和不遲到，是早睡早起的兩個好處。' }
        ],
        conj: [
          { id: 'pt-yf-c1', full: '他學英文一方面為了出國，一方面為了交朋友。', img: 'pt-english.png', sentence: '他學英文＿＿＿為了出國，＿＿＿為了交朋友。', options: ['一方面……一方面……', '不僅……更……', '雖然……卻……'], clue: '提示：說出兩個理由。數數看有幾個空格。', explain: '答案是「一方面……一方面……」：他學英文一方面為了出國，一方面為了交朋友。' },
          { id: 'pt-yf-c2', full: '媽媽一方面要上班，一方面要照顧我們。', img: 'pt-busy-mom.png', sentence: '媽媽＿＿＿要上班，＿＿＿要照顧我們。', options: ['一方面……一方面……', '不僅……更……', '雖然……卻……'], clue: '提示：說出兩件要做的事。數數看有幾個空格。', explain: '答案是「一方面……一方面……」：媽媽一方面要上班，一方面要照顧我們。' }
        ],
        half: [
          { id: 'pt-yf-h1', front: '我參加合唱團，一方面喜歡唱歌，', clue: '提示：除了喜歡唱歌，還有什麼理由？記得要說「一方面」。', model: '一方面想認識新朋友。' },
          { id: 'pt-yf-h2', front: '多吃蔬菜一方面能幫助消化，', clue: '提示：除了幫助消化，還有什麼好處？記得要說「一方面」。', model: '一方面能讓皮膚變好。' }
        ],
        whole: [
          { id: 'pt-yf-w1', clue: '提示：用「一方面」、「一方面」說出兩個理由。想想看：你為什麼喜歡某一項活動？', model: '我喜歡游泳，一方面可以消暑，一方面可以鍛鍊身體。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'question', name: '設問', meaning: '用問句來說話，引起大家注意。有時自己問、自己回答；有時只問不答，答案就藏在問題裡。', example: '課文先問這種飲料好喝的關鍵是什麼，再自己說出答案，讓讀者更想讀下去。',
          show: { sentence: '夏天最棒的點心是什麼？當然是一碗剉冰。' },
          yesno: [
            { id: 'rh-qu-y1', sentence: '你吃過臭豆腐嗎？聞起來臭，吃起來香！', answer: true, clue: '提示：這句話是不是先問一個問題，引起大家注意？', explain: '是設問：先問一個問題，引起大家的好奇。' },
            { id: 'rh-qu-y2', sentence: '臭豆腐聞起來很臭。', answer: false, clue: '提示：這句話裡有沒有問題？', explain: '不是設問：這句話沒有用問句。' }
          ],
          pick: [
            { id: 'rh-qu-p1', options: ['什麼水果又紅又甜？是草莓。', '草莓又紅又甜。'], clue: '提示：哪一句先問問題，再自己回答？', explain: '先問「什麼水果又紅又甜」，再回答，是設問。' },
            { id: 'rh-qu-p2', options: ['誰不愛吃冰淇淋呢？', '冰淇淋很好吃。'], clue: '提示：哪一句用問題來說話？', explain: '「誰不愛吃冰淇淋呢」是設問：答案藏在問題裡。' },
            { id: 'rh-qu-p3', options: ['為什麼要多喝水？因為身體需要水分。', '我每天喝水。', '水是透明的。'], clue: '提示：哪一句先問「為什麼」，再自己回答？', explain: '先問再答，是設問。' },
            { id: 'rh-qu-p4', options: ['你知道麵包是怎麼做的嗎？', '麵包很軟。', '麵包店開了。'], clue: '提示：哪一句用問題引起大家注意？', explain: '「你知道麵包是怎麼做的嗎」是設問。' },
            { id: 'rh-qu-p5', options: ['什麼東西越洗越髒？是洗澡水。', '我在洗澡。', '水是熱的。', '肥皂很香。'], clue: '提示：哪一句先問問題，再說出答案？', explain: '先問「什麼東西越洗越髒」，再回答，是設問。' },
            { id: 'rh-qu-p6', options: ['還有什麼比吃到家鄉菜更幸福呢？', '母親煮了菜。', '晚餐有湯。', '碗放在桌上。'], clue: '提示：哪一句用問題來說話，答案藏在問題裡？', explain: '答案藏在問題裡：吃到家鄉菜最幸福，是設問。' }
          ] },
        { key: 'simile', name: '譬喻', meaning: '把一樣東西比成另一樣有相同地方的東西，讓人更容易想像。', example: '課文把粉圓和奶茶在嘴裡的感覺比成一場優美的舞蹈，讓人想像它有多好喝。',
          show: { sentence: '冰淇淋像一座小雪山。', mark: ['像一座小雪山'] },
          yesno: [
            { id: 'rh-si-y1', sentence: '湯圓像一顆顆白色的小球。', answer: true, mark: ['像一顆顆白色的小球'], clue: '提示：這句話有沒有把湯圓比成另一樣東西？', explain: '是譬喻：把湯圓比成小球。' },
            { id: 'rh-si-y2', sentence: '碗裡有湯圓。', answer: false, clue: '提示：這句話有沒有把湯圓比成另一樣東西？', explain: '不是譬喻：這句話只是說碗裡有湯圓。' }
          ],
          pick: [
            { id: 'rh-si-p1', mark: ['像一條長龍'], options: ['排隊的人像一條長龍。', '很多人在排隊。'], clue: '提示：哪一句把隊伍比成另一樣東西？', explain: '把隊伍比成長龍，是譬喻。' },
            { id: 'rh-si-p2', mark: ['像棉被'], options: ['白雪像棉被蓋住大地。', '冬天下雪了。'], clue: '提示：哪一句把雪比成另一樣東西？', explain: '把雪比成棉被，是譬喻。' },
            { id: 'rh-si-p3', mark: ['像小星星'], options: ['芝麻像小星星撒在麵包上。', '麵包上有芝麻。', '我買了麵包。'], clue: '提示：哪一句把芝麻比成另一樣東西？', explain: '把芝麻比成星星，是譬喻。' },
            { id: 'rh-si-p4', mark: ['像一顆小太陽'], options: ['荷包蛋的蛋黃像一顆小太陽。', '我煎了荷包蛋。', '蛋放在盤子上。'], clue: '提示：哪一句把蛋黃比成另一樣東西？', explain: '把蛋黃比成太陽，是譬喻。' },
            { id: 'rh-si-p5', mark: ['像彩虹'], options: ['冰沙的顏色像彩虹。', '我點了冰沙。', '冰沙很冰。', '我用吸管喝。'], clue: '提示：哪一句把冰沙的顏色比成另一樣東西？', explain: '把冰沙的顏色比成彩虹，是譬喻。' },
            { id: 'rh-si-p6', mark: ['像雲朵'], options: ['奶泡像雲朵浮在咖啡上。', '咖啡上有奶泡。', '咖啡是熱的。', '我喝了一口。'], clue: '提示：哪一句把奶泡比成另一樣東西？', explain: '把奶泡比成雲朵，是譬喻。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '誰是全班最會畫畫的人？就是小美。', answer: '設問', clue: '提示：這句話是不是先問問題，再自己回答？', explain: '答案是「設問」：先問再答。' },
        { id: 'rh2', sentence: '你能想像沒有電的生活嗎？', answer: '設問', clue: '提示：這句話是不是用問題引起大家注意？', explain: '答案是「設問」：用問題引起注意。' },
        { id: 'rh3', sentence: '湖水像一塊藍色的寶石。', answer: '譬喻', mark: ['像一塊藍色的寶石'], clue: '提示：這句話有沒有把湖水比成另一樣東西？', explain: '答案是「譬喻」：把湖水比成寶石。' },
        { id: 'rh4', sentence: '她的歌聲像小鳥一樣好聽。', answer: '譬喻', mark: ['像小鳥一樣'], clue: '提示：這句話有沒有把歌聲比成另一樣東西？', explain: '答案是「譬喻」：把歌聲比成鳥叫聲。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L06 = d; }
})(this);
