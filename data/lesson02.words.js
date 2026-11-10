/* 第 2 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'extract', qe: 'infer', qf: 'infer', qg: 'interpret', qh: 'interpret',
      qi: 'evaluate', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qg: { think: ['以前做一件衣服、煮一碗飯，要花多少人的力氣？', '現在的你，會不會不小心浪費食物或東西？'], why: '以前的東西得來不容易，要經過很多人辛苦工作。作者提醒家人，就算是一點點的飯和線，也要想到背後的辛苦，好好珍惜。' },
      qh: { think: ['下雨前先修好屋頂，和口渴了才挖井，哪一個比較來得及？', '你考試前會先準備，還是考前一天才開始讀？'], why: '事先做好準備，遇到事情才不會手忙腳亂；等事情發生了才想辦法，常常來不及。作者希望家人做事都能提早準備。' },
      qi: { think: ['幫了別人以後，一直提起來，對方會有什麼感覺？', '別人幫了你，你應該怎麼做？'], why: '幫助別人不要放在心上，才不會讓對方有壓力；接受別人的幫忙要記得感謝、找機會回報。這樣人和人之間才會相處得溫暖。' },
      qj: { think: ['如果先不介紹作者和格言，直接讀古文，你看得懂嗎？', '先知道作者想說什麼，再讀格言，會不會比較容易？'], why: '先介紹這些格言從哪裡來、作者想提醒什麼，讀者就能帶著方向去讀，比較容易了解古文的意思。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['颱風要來前，我們先把窗戶貼好、買好乾糧。', '考試前一週，我就開始每天複習一點。'], bad: ['等到停電了，才去找手電筒。', '考試當天早上，才打開課本。'], why: '題目問的是事先做好準備的經驗。颱風前先準備、考前提早複習，都是未雨綢繆。等停電或考試當天才準備，就是臨渴掘井。' },
      k2: { good: ['我認同，因為太得意容易粗心，反而出錯。', '我認同，凡事留一點空間，大家才不會吵架。'], bad: ['我覺得贏了就要一直炫耀。', '我覺得做事要做到絕，不用給別人機會。'], why: '題目問的是同不同意「凡事留餘地、得意不要過頭」。說出同意的理由，例如不要太得意、要給彼此空間，都很好。一直炫耀、做事做絕，都容易讓人受傷。' }
    },
    hanzi: [
      { id: 'h-粥', combo: { type: '會意字', pict: '中間是「米」，左右兩邊的「弓」像鍋子冒出來的熱氣。米煮得軟軟爛爛、冒著熱氣，就是「粥」。' }, char: '粥', zhuyin: 'ㄓㄡ', radical: '米', strokes: 12, words: ['一粥一飯', '煮粥'], say: '粥，煮粥的粥', cloze: '煮＿', img: 'porridge.png', options: ['粥', '粉', '粗', '弼'], clue: '這個字的中間是「米」，兩邊是「弓」。', explain: '答案是「粥」；「粉」的右邊是「分」，「粗」的右邊是「且」。', parts: ['弓', '米', '弓'], story: '中間是米，兩邊像熱氣冒上來。米加很多水煮得軟軟爛爛，就是「粥」。', sentence: '生病時，媽媽煮了一碗白粥給我吃。' },
      { id: 'h-縷', combo: { layout: 'lr', parts: [['糸', 'm', '絲線'], ['婁', 's', '']] }, char: '縷', zhuyin: 'ㄌㄩˇ', radical: '糸', strokes: 17, words: ['半絲半縷', '一縷'], say: '縷，一縷的縷', cloze: '一＿', img: 'thread.png', options: ['縷', '樓', '屢', '摟'], clue: '這個字的左邊是糸字旁。', explain: '答案是「縷」，左邊是糸字旁；「樓」的左邊是木字旁，「摟」的左邊是提手旁。', parts: ['糸', '婁'], story: '左邊的「糸」是絲線，右邊的「婁」念起來像「縷」。細細長長的一條線，就是「一縷」；細細的煙也可以說「一縷炊煙」。', sentence: '屋頂上升起一縷白煙。', build: { layout: 'lr', show: ['？', '婁'], answer: '糸', options: ['糸', '木', '尸', '扌'], clue: '想一想：細細長長的線，左邊放哪一個？' } },
      { id: 'h-碗', combo: { layout: 'lr', parts: [['石', 'm', '石頭'], ['宛', 's', '']] }, char: '碗', zhuyin: 'ㄨㄢˇ', radical: '石', strokes: 13, words: ['碗盤', '飯碗'], say: '碗，飯碗的碗', cloze: '飯＿', img: 'rice-bowl.png', options: ['碗', '腕', '婉', '宛'], clue: '這個字的左邊是石字旁。', explain: '答案是「碗」，左邊是石字旁；「腕」的左邊是肉字旁，「婉」的左邊是女字旁。', parts: ['石', '宛'], story: '左邊的「石」表示硬硬的，右邊的「宛」念起來像「碗」。用泥土燒得硬硬的、拿來裝飯的器具，就是「碗」。', sentence: '我把飯碗裡的飯吃得乾乾淨淨。', build: { layout: 'lr', show: ['？', '宛'], answer: '石', options: ['石', '月', '女', '木'], clue: '想一想：硬硬的、燒過的器具，左邊放哪一個？' } },
      { id: 'h-綢', combo: { layout: 'lr', parts: [['糸', 'm', '絲線'], ['周', 's', '']] }, char: '綢', zhuyin: 'ㄔㄡˊ', radical: '糸', strokes: 14, words: ['綢繆', '絲綢'], say: '綢，絲綢的綢', cloze: '絲＿', img: 'silk.png', options: ['綢', '稠', '調', '週'], clue: '這個字的左邊是糸字旁。', explain: '答案是「綢」，左邊是糸字旁；「稠」的左邊是禾字旁，「調」的左邊是言字旁。', parts: ['糸', '周'], story: '左邊的「糸」是絲線，右邊的「周」念起來有點像「綢」。用蠶絲織成、又亮又滑的布，就是「絲綢」。', sentence: '這條絲綢圍巾摸起來好光滑。', build: { layout: 'lr', show: ['？', '周'], answer: '糸', options: ['糸', '禾', '言', '辶'], clue: '想一想：用蠶絲織成的布，左邊放哪一個？' } },
      { id: 'h-繆', combo: { layout: 'lr', parts: [['糸', 'm', '絲線'], ['翏', 's', '']] }, char: '繆', zhuyin: 'ㄇㄡˊ', radical: '糸', strokes: 17, words: ['綢繆', '未雨綢繆'], say: '繆，未雨綢繆的繆', cloze: '綢＿', img: 'fix-roof.png', options: ['繆', '謬', '膠', '廖'], clue: '這個字的左邊是糸字旁。', explain: '答案是「繆」，左邊是糸字旁；「謬」的左邊是言字旁，「膠」的左邊是肉字旁。', parts: ['糸', '翏'], story: '左邊的「糸」是繩子，右邊念起來像「繆」。用繩子一圈一圈綁好、修補好，就是「綢繆」；下雨前先把屋頂修好，叫「未雨綢繆」。', sentence: '颱風來之前，我們要未雨綢繆。', build: { layout: 'lr', show: ['？', '翏'], answer: '糸', options: ['糸', '言', '月', '广'], clue: '想一想：用繩子綁好、修補，左邊放哪一個？' } },
      { id: 'h-毋', combo: { type: '指事字', pict: '「毋」像「母」中間的兩點連成一橫，表示禁止、不要。' }, char: '毋', zhuyin: 'ㄨˊ', radical: '毋', strokes: 4, words: ['毋須', '毋忘'], say: '毋，毋須的毋', cloze: '＿須', img: 'remember-note.png', options: ['毋', '母', '每', '毒'], clue: '這個字像「母」，中間是一條直直的線。', explain: '答案是「毋」，中間是一條線；「母」的中間是兩點，「每」的上面多了一撇一橫。', parts: ['毋'], story: '「毋」像把「母」中間的兩點連起來，意思是「不要」；不必、不用，叫「毋須」。', sentence: '這件小事毋須擔心。' },
      { id: 'h-掘', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['屈', 's', '']] }, char: '掘', zhuyin: 'ㄐㄩㄝˊ', radical: '手', strokes: 11, words: ['掘井', '挖掘'], say: '掘，挖掘的掘', cloze: '挖＿', img: 'dig-well.png', options: ['掘', '屈', '崛', '倔'], clue: '這個字的左邊是提手旁。', explain: '答案是「掘」，左邊是提手旁；「崛」的左邊是山字旁，「倔」的左邊是單人旁。', parts: ['扌', '屈'], story: '左邊是手，右邊的「屈」念起來有點像「掘」。用手和工具往下挖，就是「挖掘」；挖一口井，叫「掘井」。', sentence: '考古學家在土裡挖掘出古老的陶罐。', build: { layout: 'lr', show: ['？', '屈'], answer: '扌', options: ['扌', '山', '亻', '土'], clue: '想一想：拿鏟子往下挖要用身體的哪個部分？' } },
      { id: 'h-纏', combo: { type: '形聲字', pict: '左邊的「糸」是繩子，右邊念起來像「纏」。繩子一圈一圈的繞起來，就是「纏」。' }, char: '纏', zhuyin: 'ㄔㄢˊ', radical: '糸', strokes: 21, words: ['纏繞', '糾纏'], say: '纏，糾纏的纏', cloze: '糾＿', img: 'vine-twist.png', options: ['纏', '蟬', '禪', '嬋'], clue: '這個字的左邊是糸字旁。', explain: '答案是「纏」，左邊是糸字旁；「蟬」的左邊是虫字旁，「禪」的左邊是示字旁。', parts: ['糸', '廛'], story: '左邊的「糸」是繩子。繩子或藤蔓一圈一圈繞著，就是「纏繞」；一直黏著、甩不掉，叫「糾纏」。', sentence: '藤蔓纏繞在竹竿上，一直往上爬。' },
      { id: 'h-縛', combo: { layout: 'lr', parts: [['糸', 'm', '繩子'], ['尃', 's', '']] }, char: '縛', zhuyin: 'ㄈㄨˋ', radical: '糸', strokes: 16, words: ['束縛', '作繭自縛'], say: '縛，束縛的縛', cloze: '束＿', img: 'tied-rope.png', options: ['縛', '博', '搏', '傅'], clue: '這個字的左邊是糸字旁。', explain: '答案是「縛」，左邊是糸字旁；「博」的左邊是「十」，「搏」的左邊是提手旁。', parts: ['糸', '尃'], story: '左邊的「糸」是繩子，右邊念起來有點像「縛」。用繩子綁住，不能自由，就是「束縛」。', sentence: '小鳥掙脫了網子的束縛，飛向天空。', build: { layout: 'lr', show: ['？', '尃'], answer: '糸', options: ['糸', '十', '扌', '亻'], clue: '想一想：把東西綁住要用什麼？' } },
      { id: 'h-瓦', combo: { type: '象形字', pict: '「瓦」像兩片彎彎的屋瓦疊在一起，是用泥土燒成的。' }, char: '瓦', zhuyin: 'ㄨㄚˇ', radical: '瓦', strokes: 5, words: ['瓦缶', '屋瓦'], say: '瓦，屋瓦的瓦', cloze: '屋＿', img: 'roof-tiles.png', options: ['瓦', '互', '元', '五'], clue: '這個字像疊起來的彎彎屋頂片，右下有一點。', explain: '答案是「瓦」；「互」的中間不一樣，「五」沒有那一點。', parts: ['瓦'], story: '「瓦」像屋頂上一片片彎彎的瓦片，用泥土燒成。蓋在屋頂上擋雨的，叫「屋瓦」。', sentence: '老房子的屋瓦是紅色的。' },
      { id: 'h-缶', combo: { type: '象形字', pict: '「缶」像一個肚子大、口小的罐子，上面還有蓋子，是用泥土燒成、裝水或酒的器具。' }, char: '缶', zhuyin: 'ㄈㄡˇ', radical: '缶', strokes: 6, words: ['瓦缶', '擊缶'], say: '缶，擊缶的缶', cloze: '擊＿', img: 'clay-jar.png', options: ['缶', '午', '去', '告'], clue: '這個字像一個有蓋子的罐子。', explain: '答案是「缶」；「午」是中午的午，「告」的下面是「口」。', parts: ['缶'], story: '「缶」像一個大肚子、小口的陶罐。古時候的人也會敲打它來打拍子，叫「擊缶」。', sentence: '博物館裡展示著一個古代的瓦缶。' },
      { id: 'h-蔬', combo: { layout: 'tb', parts: [['艹', 'm', '草'], ['疏', 's', '']] }, char: '蔬', zhuyin: 'ㄕㄨ', radical: '艸', strokes: 15, words: ['園蔬', '蔬菜'], say: '蔬，蔬菜的蔬', cloze: '＿菜', img: 'vegetables.png', options: ['蔬', '疏', '梳', '流'], clue: '這個字的上面是草字頭。', explain: '答案是「蔬」，上面是草字頭；「梳」的左邊是木字旁，「流」的左邊是三點水。', parts: ['艹', '疏'], story: '上面的草字頭是植物，下面的「疏」念起來像「蔬」。可以吃的各種青菜，就是「蔬菜」。', sentence: '多吃蔬菜，身體會更健康。', build: { layout: 'tb', show: ['？', '疏'], answer: '艹', options: ['艹', '木', '氵', '竹'], clue: '想一想：青菜是植物，上面放哪一個？' } },
      { id: 'h-饈', combo: { layout: 'lr', parts: [['飠', 'm', '吃東西'], ['羞', 's', '']] }, char: '饈', zhuyin: 'ㄒㄧㄡ', radical: '食', strokes: 19, words: ['珍饈', '美味珍饈'], say: '饈，珍饈的饈', cloze: '珍＿', img: 'feast.png', options: ['饈', '羞', '修', '秀'], clue: '這個字的左邊是食字旁。', explain: '答案是「饈」，左邊是食字旁；「羞」沒有食字旁，「修」的左邊是單人旁。', parts: ['飠', '羞'], story: '左邊的食字旁和吃有關，右邊的「羞」念起來像「饈」。很稀奇、很好吃的食物，就是「珍饈」。', sentence: '宴會桌上擺滿了各種珍饈。', build: { layout: 'lr', show: ['？', '羞'], answer: '飠', options: ['飠', '扌', '亻', '木'], clue: '想一想：好吃的食物，左邊放和吃有關的哪一個？' } },
      { id: 'h-腹', combo: { layout: 'lr', parts: [['月', 'm', '身體'], ['复', 's', '']] }, char: '腹', zhuyin: 'ㄈㄨˋ', radical: '肉', strokes: 13, words: ['腹部', '腹痛'], say: '腹，腹痛的腹', cloze: '＿痛', img: 'stomachache.png', options: ['腹', '復', '複', '覆'], clue: '這個字的左邊是肉字旁。', explain: '答案是「腹」，左邊是肉字旁；「復」的左邊是雙人旁，「複」的左邊是衣字旁。', parts: ['月', '复'], story: '左邊的肉字旁和身體有關，右邊的「复」念起來像「腹」。身體中間軟軟的肚子，就是「腹部」；肚子痛，叫「腹痛」。', sentence: '吃太多冰，弟弟腹痛了一整晚。', build: { layout: 'lr', show: ['？', '复'], answer: '月', options: ['月', '彳', '衤', '亻'], clue: '想一想：肚子是身體的一部分，左邊放哪一個？' } },
      { id: 'h-陶', combo: { layout: 'lr', parts: [['阝', 'm', '土坡'], ['匋', 's', '']] }, char: '陶', zhuyin: 'ㄊㄠˊ', radical: '阜', strokes: 11, words: ['陶器', '陶土'], say: '陶，陶土的陶', cloze: '＿土', img: 'pottery.png', options: ['陶', '淘', '掏', '萄'], clue: '這個字的左邊是阜字旁。', explain: '答案是「陶」，左邊是阜字旁；「淘」的左邊是三點水，「掏」的左邊是提手旁。', parts: ['阝', '匋'], story: '左邊的阜字旁像土坡，右邊的「匋」像在窯裡燒罐子。用黏土捏好、放進窯裡燒，就是「陶器」。', sentence: '我用陶土捏了一個小花瓶。', build: { layout: 'lr', show: ['？', '匋'], answer: '阝', options: ['阝', '氵', '扌', '艹'], clue: '想一想：做陶器的黏土來自土坡，左邊放哪一個？' } },
      { id: 'h-施', combo: { type: '形聲字', pict: '左上是「方」，右邊像一面旗子飄動，念起來像「施」。旗子揮出去、把東西給出去，就是「施」。' }, char: '施', zhuyin: 'ㄕ', radical: '方', strokes: 9, words: ['施惠', '實施'], say: '施，實施的施', cloze: '實＿', img: 'action-plan.png', options: ['施', '旋', '族', '旅'], clue: '這個字的左邊是「方」，右下是「也」。', explain: '答案是「施」，右下是「也」；「旋」的右下是「疋」，「族」的右下是「矢」。', parts: ['方', '𠂉', '也'], story: '左邊是「方」，右邊像旗子揮動。把計畫拿出來真正去做，就是「實施」；把好處給別人，叫「施惠」。', sentence: '學校開始實施垃圾分類。' },
      { id: 'h-惠', combo: { layout: 'tb', parts: [['叀', 's', ''], ['心', 'm', '心']] }, char: '惠', zhuyin: 'ㄏㄨㄟˋ', radical: '心', strokes: 12, words: ['恩惠', '優惠'], say: '惠，優惠的惠', cloze: '優＿', img: 'discount.png', options: ['惠', '穗', '專', '慧'], clue: '這個字的下面是「心」。', explain: '答案是「惠」，下面是「心」；「專」的下面是「寸」，「慧」的上面是兩個「丰」。', parts: ['叀', '心'], story: '上面念起來像「惠」，下面是心。用好心給別人好處，就是「恩惠」；店家給的便宜，叫「優惠」。', sentence: '這家書店週末有買一送一的優惠。', build: { layout: 'tb', show: ['叀', '？'], answer: '心', options: ['心', '寸', '土', '大'], clue: '想一想：用好意對待別人，下面放哪一個？' } },
      { id: 'h-勿', combo: { type: '象形字', pict: '「勿」像一面旗子在揮動，古時候用揮旗表示「不要過來」，所以是「不要」的意思。' }, char: '勿', zhuyin: 'ㄨˋ', radical: '勹', strokes: 4, words: ['請勿', '切勿'], say: '勿，請勿的勿', cloze: '切＿', img: 'no-entry.png', options: ['勿', '匆', '物', '忽'], clue: '這個字裡面只有兩撇，沒有點。', explain: '答案是「勿」；「匆」裡面多了一點，「物」的左邊是牛字旁。', parts: ['勿'], story: '「勿」像揮動的旗子，表示「不要」。千萬不要，叫「切勿」；請不要，叫「請勿」。', sentence: '游泳池邊寫著「請勿奔跑」。' },
      { id: 'h-預', combo: { layout: 'lr', parts: [['予', 's', ''], ['頁', 'm', '頭']] }, char: '預', zhuyin: 'ㄩˋ', radical: '頁', strokes: 13, words: ['預留', '預習'], say: '預，預習的預', cloze: '＿習', img: 'preview-book.png', options: ['預', '頂', '豫', '須'], clue: '這個字的右邊是「頁」。', explain: '答案是「預」，右邊是「頁」；「豫」的右邊是「象」，「頂」的左邊是「丁」。', parts: ['予', '頁'], story: '左邊的「予」念起來像「預」，右邊的「頁」和頭有關。先用頭腦想好、事先做準備，就是「預」；上課前先讀課本，叫「預習」。', sentence: '上課前，我會先預習明天的課文。', build: { layout: 'lr', show: ['予', '？'], answer: '頁', options: ['頁', '力', '象', '子'], clue: '想一想：事先動腦筋想好，右邊放和頭有關的哪一個？' } },
      { id: 'h-悲', combo: { layout: 'tb', parts: [['非', 's', ''], ['心', 'm', '心']] }, char: '悲', zhuyin: 'ㄅㄟ', radical: '心', strokes: 12, words: ['悲傷', '樂極生悲'], say: '悲，悲傷的悲', cloze: '＿傷', img: 'sad-rain.png', options: ['悲', '非', '排', '菲'], clue: '這個字的下面是「心」。', explain: '答案是「悲」，下面是「心」；「排」的左邊是提手旁，「菲」的上面是草字頭。', parts: ['非', '心'], story: '上面的「非」念起來像「悲」，下面是心。心裡很難過，就是「悲傷」。', sentence: '聽到小狗走失的消息，大家都很悲傷。', build: { layout: 'tb', show: ['非', '？'], answer: '心', options: ['心', '艹', '扌', '土'], clue: '想一想：難過是一種感覺，下面放哪一個？' } }
    ],
    vocab: [
      { id: 'v-一粥一飯', cloze: true, clozeOptions: ['一粥一飯', '一山一水', '一草一木', '一朝一夕'], word: '一粥一飯', meaning: '每天吃進嘴裡的每口食物。', example: '＿＿＿＿都得來不易，我們要好好珍惜。', img: 'porridge.png', options: ['一粥一飯', '半絲半縷', '未雨綢繆', '樂極生悲'] },
      { id: 'v-半絲半縷', cloze: true, clozeOptions: ['半絲半縷', '一磚一瓦', '千山萬水', '一言一行'], word: '半絲半縷', meaning: '一點點的線和布。', example: '奶奶連＿＿＿＿都捨不得丟，全部收起來。', img: 'thread.png', options: ['半絲半縷', '一粥一飯', '得意忘形', '臨渴掘井'] },
      { id: 'v-碗盤', cloze: true, clozeOptions: ['碗盤', '書包', '鞋子', '雨傘'], word: '碗盤', meaning: '吃飯用來裝食物的器具。', example: '吃完飯，我幫忙把＿＿洗乾淨。', img: 'rice-bowl.png', options: ['碗盤', '陶器', '瓦缶', '腹部'] },
      { id: 'v-未雨綢繆', cloze: true, clozeOptions: ['未雨綢繆', '臨渴掘井', '亡羊補牢', '手忙腳亂'], word: '未雨綢繆', meaning: '事情還沒發生，就先準備好。', example: '颱風要來了，我們＿＿＿＿，先把窗戶貼好。', img: 'fix-roof.png', options: ['未雨綢繆', '臨渴掘井', '得意忘形', '一粥一飯'] },
      { id: 'v-毋須', cloze: true, clozeOptions: ['毋須', '一定', '必須', '應該'], word: '毋須', meaning: '不必、不用。', example: '這只是小傷，＿＿擔心。', img: 'remember-note.png', options: ['毋須', '請勿', '預留', '施惠'] },
      { id: 'v-臨渴掘井', cloze: true, clozeOptions: ['臨渴掘井', '未雨綢繆', '有備無患', '早有準備'], word: '臨渴掘井', meaning: '事情發生了才急著想辦法。', example: '明天就要考試，今晚才開始讀書，真是＿＿＿＿。', img: 'dig-well.png', options: ['臨渴掘井', '未雨綢繆', '樂極生悲', '半絲半縷'] },
      { id: 'v-纏繞', cloze: true, clozeOptions: ['纏繞', '剪斷', '拉直', '解開'], word: '纏繞', meaning: '一圈一圈的圍著。', example: '牽牛花的藤＿＿在欄杆上。', img: 'vine-twist.png', options: ['纏繞', '束縛', '預留', '施惠'] },
      { id: 'v-束縛', cloze: true, clozeOptions: ['束縛', '自由', '放鬆', '解放'], word: '束縛', meaning: '被綁住、被限制，不能自由。', example: '小鹿掙脫了繩子的＿＿，跑回森林。', img: 'tied-rope.png', options: ['束縛', '纏繞', '恩惠', '腹部'] },
      { id: 'v-瓦缶', cloze: true, clozeOptions: ['瓦缶', '冰箱', '電視', '手機'], word: '瓦缶', meaning: '用泥土燒成、肚子大口小的罐子。', example: '古時候的人用＿＿裝水和酒。', img: 'clay-jar.png', options: ['瓦缶', '陶器', '碗盤', '珍饈'] },
      { id: 'v-園蔬', cloze: true, clozeOptions: ['園蔬', '炸雞', '蛋糕', '糖果'], word: '園蔬', meaning: '菜田裡種的青菜。', example: '外婆每天摘自家種的＿＿煮湯。', img: 'vegetables.png', options: ['園蔬', '珍饈', '瓦缶', '陶器'] },
      { id: 'v-珍饈', cloze: true, clozeOptions: ['珍饈', '剩菜', '粗茶', '淡飯'], word: '珍饈', meaning: '非常稀奇、好吃的食物。', example: '國王的宴會擺滿了各種＿＿。', img: 'feast.png', options: ['珍饈', '園蔬', '碗盤', '腹部'] },
      { id: 'v-腹部', cloze: true, clozeOptions: ['腹部', '頭頂', '腳底', '手指'], word: '腹部', meaning: '肚子。', example: '吃壞肚子，他覺得＿＿很不舒服。', img: 'stomachache.png', options: ['腹部', '碗盤', '陶器', '瓦缶'] },
      { id: 'v-陶器', cloze: true, clozeOptions: ['陶器', '鐵器', '塑膠', '玻璃'], word: '陶器', meaning: '用泥土燒成的碗、盤、罐子。', example: '博物館裡展示著古代的＿＿。', img: 'pottery.png', options: ['陶器', '瓦缶', '碗盤', '園蔬'] },
      { id: 'v-施惠', cloze: true, clozeOptions: ['施惠', '搶奪', '欺負', '嘲笑'], word: '施惠', meaning: '給別人好處、幫助別人。', example: '他常常＿＿給窮困的人，卻從不提起。', img: 'help-neighbor.png', options: ['施惠', '恩惠', '預留', '束縛'] },
      { id: 'v-恩惠', cloze: true, clozeOptions: ['恩惠', '仇恨', '麻煩', '責罵'], word: '恩惠', meaning: '別人給你的好處和幫助。', example: '老師的＿＿，我一輩子都不會忘記。', img: 'thank-teacher.png', options: ['恩惠', '施惠', '束縛', '纏繞'] },
      { id: 'v-請勿', cloze: true, clozeOptions: ['請勿', '歡迎', '請多', '盡量'], word: '請勿', meaning: '拜託不要。', example: '圖書館裡＿＿大聲說話。', img: 'no-entry.png', options: ['請勿', '毋須', '預留', '施惠'] },
      { id: 'v-預留', cloze: true, clozeOptions: ['預留', '用光', '丟掉', '吃完'], word: '預留', meaning: '事先保存下來。', example: '媽媽幫晚歸的爸爸＿＿了一份飯菜。', img: 'save-food.png', options: ['預留', '施惠', '纏繞', '毋須'] },
      { id: 'v-樂極生悲', cloze: true, clozeOptions: ['樂極生悲', '苦盡甘來', '否極泰來', '轉悲為喜'], word: '樂極生悲', meaning: '太開心時不小心，結果變成傷心的事。', example: '他玩得太瘋，跌倒受傷，真是＿＿＿＿。', img: 'fall-party.png', options: ['樂極生悲', '得意忘形', '臨渴掘井', '未雨綢繆'] },
      { id: 'v-得意忘形', cloze: true, clozeOptions: ['得意忘形', '謙虛有禮', '小心謹慎', '冷靜沉著'], word: '得意忘形', meaning: '太高興了，舉動也跟著失態。', example: '贏了比賽也不要＿＿＿＿，要記得謝謝對手。', img: 'show-off.png', options: ['得意忘形', '樂極生悲', '一粥一飯', '半絲半縷'] }
    ],
    charwords: [
      { id: 'cw-粥', char: '粥', img: 'porridge.png', charMeaning: '米加很多水煮成的軟飯。', word: '煮粥', meaning: '把米加很多水煮成粥。', example: '早上奶奶在廚房＿＿。', options: ['煮粥', '一縷', '飯碗', '絲綢'] },
      { id: 'cw-縷', char: '縷', img: 'thread.png', charMeaning: '細細長長的線。', word: '一縷', meaning: '細細長長的一條。', example: '窗外飄進＿＿花香。', options: ['一縷', '毋忘', '挖掘', '糾纏'] },
      { id: 'cw-碗', char: '碗', img: 'rice-bowl.png', charMeaning: '裝飯的器具。', word: '飯碗', meaning: '裝飯的碗；也比喻工作。', example: '弟弟的＿＿上畫著小熊。', options: ['飯碗', '作繭自縛', '屋瓦', '擊缶'] },
      { id: 'cw-綢', char: '綢', img: 'silk.png', charMeaning: '蠶絲織成的布。', word: '絲綢', meaning: '用蠶絲織成、又亮又滑的布。', example: '這件旗袍是用＿＿做的。', options: ['絲綢', '蔬菜', '珍饈', '腹痛'] },
      { id: 'cw-繆', char: '繆', img: 'fix-roof.png', charMeaning: '綁好、修補。', word: '未雨綢繆', meaning: '事情發生前，就先準備好。', example: '寒流來前先準備厚外套，這叫＿＿＿＿。', options: ['未雨綢繆', '陶土', '實施', '優惠'] },
      { id: 'cw-毋', char: '毋', img: 'remember-note.png', charMeaning: '不要。', word: '毋忘', meaning: '不要忘記。', example: '＿＿初心，才能一直往前。', options: ['毋忘', '切勿', '預習', '悲傷'] },
      { id: 'cw-掘', char: '掘', img: 'dig-well.png', charMeaning: '往下挖。', word: '挖掘', meaning: '往下挖出東西。', example: '工人在工地＿＿出一塊大石頭。', options: ['挖掘', '煮粥', '一縷', '飯碗'] },
      { id: 'cw-纏', char: '纏', img: 'vine-twist.png', charMeaning: '一圈圈繞起來。', word: '糾纏', meaning: '一直黏著、甩不掉。', example: '蚊子一直＿＿著我，好煩。', options: ['糾纏', '絲綢', '未雨綢繆', '毋忘'] },
      { id: 'cw-縛', char: '縛', img: 'tied-rope.png', charMeaning: '綁住。', word: '作繭自縛', meaning: '自己做的事，反而讓自己陷入麻煩。', example: '他說謊想逃避，結果＿＿＿＿，被罰得更重。', options: ['作繭自縛', '挖掘', '糾纏', '屋瓦'] },
      { id: 'cw-瓦', char: '瓦', img: 'roof-tiles.png', charMeaning: '泥土燒成、蓋屋頂的片子。', word: '屋瓦', meaning: '蓋在屋頂上擋雨的瓦片。', example: '颱風把好幾片＿＿吹掉了。', options: ['屋瓦', '擊缶', '蔬菜', '珍饈'] },
      { id: 'cw-缶', char: '缶', img: 'clay-jar.png', charMeaning: '大肚子小口的陶罐。', word: '擊缶', meaning: '敲打陶罐來打拍子。', example: '表演時，演員們整齊的＿＿。', options: ['擊缶', '腹痛', '陶土', '實施'] },
      { id: 'cw-蔬', char: '蔬', img: 'vegetables.png', charMeaning: '可以吃的青菜。', word: '蔬菜', meaning: '可以吃的各種青菜。', example: '市場裡有好多新鮮的＿＿。', options: ['蔬菜', '優惠', '切勿', '預習'] },
      { id: 'cw-饈', char: '饈', img: 'feast.png', charMeaning: '好吃的食物。', word: '美味珍饈', meaning: '又好吃又稀奇的食物。', example: '喜宴上端出一道道＿＿＿＿。', options: ['美味珍饈', '悲傷', '煮粥', '一縷'] },
      { id: 'cw-腹', char: '腹', img: 'stomachache.png', charMeaning: '肚子。', word: '腹痛', meaning: '肚子痛。', example: '吃了壞掉的東西，他＿＿得厲害。', options: ['腹痛', '飯碗', '絲綢', '毋忘'] },
      { id: 'cw-陶', char: '陶', img: 'pottery.png', charMeaning: '用泥土燒成的器具。', word: '陶土', meaning: '可以捏成陶器的黏土。', example: '我用＿＿捏了一隻小狗。', options: ['陶土', '挖掘', '糾纏', '作繭自縛'] },
      { id: 'cw-施', char: '施', img: 'action-plan.png', charMeaning: '做出來；給別人。', word: '實施', meaning: '把計畫真正拿出來做。', example: '新的規定從下週開始＿＿。', options: ['實施', '屋瓦', '擊缶', '蔬菜'] },
      { id: 'cw-惠', char: '惠', img: 'discount.png', charMeaning: '好處。', word: '優惠', meaning: '比平常便宜的好處。', example: '這家店今天有特別＿＿。', options: ['優惠', '美味珍饈', '腹痛', '陶土'] },
      { id: 'cw-勿', char: '勿', img: 'no-entry.png', charMeaning: '不要。', word: '切勿', meaning: '千萬不要。', example: '＿＿在河邊玩水，很危險。', options: ['切勿', '實施', '優惠', '預習'] },
      { id: 'cw-預', char: '預', img: 'preview-book.png', charMeaning: '事先。', word: '預習', meaning: '上課前先讀一讀。', example: '我每天晚上都會＿＿明天的功課。', options: ['預習', '悲傷', '煮粥', '一縷'] },
      { id: 'cw-悲', char: '悲', img: 'sad-rain.png', charMeaning: '難過。', word: '悲傷', meaning: '心裡很難過。', example: '電影的結局讓人好＿＿。', options: ['悲傷', '飯碗', '絲綢', '未雨綢繆'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-腰纏萬貫', situationImg: 'id-rich-man.png',
        anim: { bg: 'room', a: { man: ['🧔', 40, 58, 14], bag: ['💰', 54, 66, 10], c1: ['🪙', 30, 30, 8, 'h'], c2: ['🪙', 50, 24, 8, 'h'], c3: ['🪙', 70, 30, 8, 'h'] },
          s: [['有一個大富翁，', [['bob', 'man']]],
            ['腰上掛著好多袋錢，', [['wig', 'bag']]],
            ['金幣多得數也數不完！', [['in', 'c1'], ['in', 'c2'], ['in', 'c3'], ['pop', 'c2']]],
            ['身上有很多很多錢，就是腰纏萬貫。', [['jump', 'man']]]] },
        idiom: '腰纏萬貫', char: '纏', meaning: '身上有很多很多錢；形容非常有錢。', example: '他雖然腰纏萬貫，生活卻很簡樸。', situation: '一個大富翁腰上掛著好多袋錢，金幣多得數不完。',
        fill: { options: ['那位老闆＿＿＿＿，卻常常捐錢幫助別人。', '他窮得連飯都吃不起，真是＿＿＿＿。'], clue: '提示：哪一句是在說很有錢？', explain: '第一句用得對：老闆很有錢。窮得吃不起飯，剛好相反。' } },
      { id: 'i-作繭自縛', situationImg: 'id-silkworm.png',
        anim: { bg: 'park', a: { worm: ['🐛', 50, 60, 12], thread: ['🧵', 50, 46, 9, 'h'], cocoon: ['🥚', 50, 60, 13, 'h'], q: ['😣', 70, 40, 9, 'h'] },
          s: [['一隻蠶寶寶開始吐絲。', [['in', 'thread'], ['wig', 'thread']]],
            ['吐呀吐，一圈一圈繞著自己，', [['shake', 'worm']]],
            ['最後把自己包在繭裡，出不來了！', [['out', 'worm'], ['out', 'thread'], ['in', 'cocoon'], ['in', 'q']]],
            ['自己做的事反而困住自己，就是作繭自縛。', [['shake', 'cocoon']]]] },
        idiom: '作繭自縛', char: '縛', meaning: '自己做的事，反而讓自己陷入麻煩。', example: '他說了一個謊，又要用更多謊來圓，真是作繭自縛。', situation: '蠶寶寶吐絲一圈一圈繞著自己，最後被包在繭裡出不來。',
        fill: { options: ['他答應太多事，結果忙不過來，真是＿＿＿＿。', '他做事有計畫，一切都很順利，一點也不＿＿＿＿。'], clue: '提示：哪一句是自己害自己陷入麻煩？', explain: '兩句意思相反。第一句用得對：答應太多，反而害了自己。做事有計畫很順利，就不是作繭自縛。' } },
      { id: 'i-冰消瓦解', situationImg: 'id-melt-ice.png',
        anim: { bg: 'park', a: { ice: ['🧊', 50, 56, 16], sun: ['☀️', 82, 18, 12], drop: ['💧', 50, 70, 9, 'h'], ok: ['😊', 30, 40, 9, 'h'] },
          s: [['兩個好朋友吵架了，心裡冷冰冰的。', [['shake', 'ice']]],
            ['他們坐下來好好說清楚，', [['wig', 'sun']]],
            ['心裡的冰塊慢慢融化了。', [['out', 'ice'], ['in', 'drop']]],
            ['問題完全解決了，就是冰消瓦解。', [['in', 'ok'], ['pop', 'ok']]]] },
        idiom: '冰消瓦解', char: '瓦', meaning: '像冰融化、像瓦破碎；比喻問題或誤會完全消失。', example: '把話說清楚以後，兩人的誤會冰消瓦解。', situation: '兩個好朋友吵架後好好說清楚，心裡的不愉快都消失了。',
        fill: { options: ['道歉以後，他們之間的誤會＿＿＿＿。', '他們越吵越兇，誤會＿＿＿＿，越來越大。'], clue: '提示：哪一句是問題完全消失？', explain: '第一句用得對：道歉後誤會消失了。越吵越兇、誤會越來越大，剛好相反。' } },
      { id: 'i-口蜜腹劍', situationImg: 'id-fake-smile.png',
        anim: { bg: 'park', a: { fox: ['🦊', 30, 60, 13], kid: ['🐰', 70, 62, 11], honey: ['🍯', 30, 40, 9, 'h'], sword: ['🗡️', 30, 72, 8, 'h'], warn: ['⚠️', 70, 40, 9, 'h'] },
          s: [['狐狸對小兔子說了很多好聽的話。', [['in', 'honey'], ['bob', 'honey']]],
            ['「你最可愛了，我們是好朋友。」', [['jump', 'kid']]],
            ['可是牠心裡，卻偷偷想著壞主意。', [['in', 'sword'], ['shake', 'sword']]],
            ['嘴巴甜甜的，心裡卻想害人，就是口蜜腹劍。', [['in', 'warn']]]] },
        idiom: '口蜜腹劍', char: '腹', meaning: '嘴上說好聽的話，心裡卻想著害人。', example: '要小心口蜜腹劍的人，不要被甜言蜜語騙了。', situation: '狐狸對小兔子說好聽的話，心裡卻偷偷想著壞主意。',
        fill: { options: ['他嘴巴說要幫忙，背後卻說人壞話，真是＿＿＿＿。', '她說話直接，心地卻很善良，一點也不＿＿＿＿。'], clue: '提示：哪一句是嘴甜心壞？', explain: '兩句意思相反。第一句用得對：嘴上說幫忙，背後說壞話。心地善良，就不是口蜜腹劍。' } },
      { id: 'i-因材施教', situationImg: 'id-teach-each.png',
        anim: { bg: 'school', a: { t: ['🧑‍🏫', 20, 58, 13], a: ['🧒', 50, 64, 10], b: ['👧', 70, 64, 10], c: ['👦', 88, 64, 10], m: ['🎨', 50, 44, 8, 'h'], n: ['🎵', 70, 44, 8, 'h'], o: ['⚽', 88, 44, 8, 'h'] },
          s: [['班上的同學各有不同的長處。', [['bob', 'a'], ['bob', 'b'], ['bob', 'c']]],
            ['老師讓愛畫畫的去畫，', [['in', 'm']]],
            ['讓愛唱歌的去唱、愛運動的去跑。', [['in', 'n'], ['in', 'o']]],
            ['依照每個人不同的特點來教，就是因材施教。', [['jump', 't']]]] },
        idiom: '因材施教', char: '施', meaning: '依照每個人不同的能力和個性，用不同的方法來教。', example: '好老師懂得因材施教，讓每個學生都能進步。', situation: '老師讓愛畫畫的去畫、愛唱歌的去唱、愛運動的去跑。',
        fill: { options: ['老師＿＿＿＿，替每個學生設計不同的練習。', '老師不管學生喜歡什麼，全部用一樣的方法，這不是＿＿＿＿。'], clue: '提示：哪一句是依照每個人不同來教？', explain: '兩句意思相反。第一句用得對：替每個人設計不同練習。全部一樣的方法，就不是因材施教。' } },
      { id: 'i-悲天憫人', situationImg: 'id-kind-heart.png',
        anim: { bg: 'park', a: { kid: ['🧒', 30, 62, 12], old: ['🧓', 70, 64, 12], rain: ['🌧️', 70, 22, 12], umb: ['☂️', 50, 40, 12, 'h'], heart: ['💗', 30, 40, 8, 'h'] },
          s: [['下大雨了，路邊有位老爺爺沒帶傘。', [['shake', 'old'], ['wig', 'rain']]],
            ['小華看了，心裡好難過，', [['in', 'heart']]],
            ['趕快把自己的傘撐過去。', [['in', 'umb'], ['mv', 'kid', [56, 62, 700]]]],
            ['為別人的辛苦感到難過、想幫忙，就是悲天憫人。', [['pop', 'heart']]]] },
        idiom: '悲天憫人', char: '悲', meaning: '對別人的辛苦和不幸感到難過，很想幫助他們。', example: '這位醫生悲天憫人，常常到偏遠地區免費看病。', situation: '小華看到沒帶傘的老爺爺淋雨，心裡很難過，趕快幫他撐傘。',
        fill: { options: ['她＿＿＿＿，常常去照顧孤單的老人。', '他看到別人受苦，卻在一旁笑，一點也不＿＿＿＿。'], clue: '提示：哪一句是為別人的不幸難過、想幫忙？', explain: '兩句意思相反。第一句用得對：去照顧孤單的老人。看到別人受苦還笑，就不是悲天憫人。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-粥', char: '粥', wrong: '粉', sentence: '早餐我喝了一碗地瓜粥。', options: ['粥', '粉', '粗'], clue: '這裡說的是米加很多水煮成的食物，想一想，哪一個字兩邊是「弓」？', explain: '要改成「粥」。米加很多水煮成的是「粥」；「粉」是麵粉的粉。' },
      { id: 'fx-縷', char: '縷', wrong: '樓', sentence: '一縷陽光從窗簾縫照進來。', options: ['縷', '樓', '摟'], clue: '這裡是說細細的一條，想一想，哪一個字有糸字旁？', explain: '要改成「縷」。細細的一條是「一縷」；「樓」是樓梯的樓。' },
      { id: 'fx-碗', char: '碗', wrong: '腕', sentence: '請把碗盤放進水槽裡。', options: ['碗', '腕', '婉'], clue: '這裡說的是吃飯用的器具，想一想，哪一個字有石字旁？', explain: '要改成「碗」。吃飯用的是「碗」；「腕」是手腕的腕。' },
      { id: 'fx-綢', char: '綢', wrong: '稠', sentence: '媽媽有一條漂亮的絲綢圍巾。', options: ['綢', '稠', '調'], clue: '這裡說的是蠶絲織成的布，想一想，哪一個字有糸字旁？', explain: '要改成「綢」。蠶絲織成的布是「絲綢」；「稠」是濃稠的稠。' },
      { id: 'fx-掘', char: '掘', wrong: '崛', sentence: '小狗在院子裡挖掘骨頭。', options: ['掘', '崛', '倔'], clue: '這裡是說往下挖，想一想，哪一個字有提手旁？', explain: '要改成「掘」。往下挖是「挖掘」；「崛」是崛起的崛。' },
      { id: 'fx-纏', char: '纏', wrong: '蟬', sentence: '風箏的線纏在樹枝上了。', options: ['纏', '蟬', '禪'], clue: '這裡是說一圈圈繞住，想一想，哪一個字有糸字旁？', explain: '要改成「纏」。繞住是「纏」；「蟬」是夏天會叫的蟲。' },
      { id: 'fx-縛', char: '縛', wrong: '搏', sentence: '我們要掙脫壞習慣的束縛。', options: ['縛', '搏', '博'], clue: '這裡是說被綁住、被限制，想一想，哪一個字有糸字旁？', explain: '要改成「縛」。被綁住是「束縛」；「搏」是搏鬥的搏。' },
      { id: 'fx-瓦', char: '瓦', wrong: '互', sentence: '屋頂的瓦片被風吹落了。', options: ['瓦', '互', '五'], clue: '這裡說的是蓋在屋頂上的片子，想一想，哪一個字右下有一點？', explain: '要改成「瓦」。屋頂上的是「瓦片」；「互」是互相的互。' },
      { id: 'fx-蔬', char: '蔬', wrong: '疏', sentence: '多吃蔬菜和水果，身體才健康。', options: ['蔬', '疏', '梳'], clue: '這裡說的是可以吃的青菜，想一想，哪一個字有草字頭？', explain: '要改成「蔬」。可以吃的青菜是「蔬菜」；「疏」沒有草字頭。' },
      { id: 'fx-饈', char: '饈', wrong: '羞', sentence: '餐桌上擺滿了珍饈美味。', options: ['饈', '羞', '修'], clue: '這裡說的是稀奇好吃的食物，想一想，哪一個字有食字旁？', explain: '要改成「饈」。稀奇好吃的食物是「珍饈」；「羞」是害羞的羞。' },
      { id: 'fx-腹', char: '腹', wrong: '復', sentence: '運動前吃太飽，容易腹痛。', options: ['腹', '復', '複'], clue: '這裡是說肚子痛，想一想，哪一個字有肉字旁？', explain: '要改成「腹」。肚子痛是「腹痛」；「復」是恢復的復。' },
      { id: 'fx-陶', char: '陶', wrong: '淘', sentence: '我在陶藝課做了一個杯子。', options: ['陶', '淘', '掏'], clue: '這裡說的是用黏土做器具的手藝，想一想，哪一個字有阜字旁？', explain: '要改成「陶」。用黏土做器具是「陶藝」；「淘」是淘氣的淘。' },
      { id: 'fx-施', char: '施', wrong: '旋', sentence: '這個新計畫明天開始實施。', options: ['施', '旋', '族'], clue: '這裡是說把計畫真正去做，想一想，哪一個字右下是「也」？', explain: '要改成「施」。真正去做是「實施」；「旋」是旋轉的旋。' },
      { id: 'fx-惠', char: '惠', wrong: '慧', sentence: '我們不能忘記別人的恩惠。', options: ['惠', '慧', '專'], clue: '這裡是說別人給的好處，想一想，哪一個字的上面不是兩個「丰」？', explain: '要改成「惠」。別人給的好處是「恩惠」；「慧」是智慧的慧。' },
      { id: 'fx-勿', char: '勿', wrong: '匆', sentence: '博物館裡請勿觸摸展品。', options: ['勿', '匆', '物'], clue: '這裡是說請不要，想一想，哪一個字裡面沒有那一點？', explain: '要改成「勿」。請不要是「請勿」；「匆」是匆忙的匆。' },
      { id: 'fx-預', char: '預', wrong: '豫', sentence: '我幫弟弟預留了一塊蛋糕。', options: ['預', '豫', '頂'], clue: '這裡是說事先保存下來，想一想，哪一個字的右邊是「頁」？', explain: '要改成「預」。事先保存是「預留」；「豫」是猶豫的豫。' },
      { id: 'fx-悲', char: '悲', wrong: '排', sentence: '這個故事讓人覺得很悲傷。', options: ['悲', '排', '非'], clue: '這裡是說心裡很難過，想一想，哪一個字的下面是「心」？', explain: '要改成「悲」。心裡難過是「悲傷」；「排」是排隊的排。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿梯」是讓人走上走下的臺階。', sentence: '我們走＿梯到五樓。', frame: '＿梯', options: ['樓', '縷'], answer: '樓', clue: '提示：這個字的左邊是木字旁。', explain: '答案是「樓」；「縷」是一縷的縷，有糸字旁。' },
      { id: 's2', meaning: '「手＿」是手和手臂中間會轉動的地方。', sentence: '他打球扭到了手＿。', frame: '手＿', options: ['腕', '碗'], answer: '腕', clue: '提示：和身體有關，左邊是肉字旁。', explain: '答案是「腕」；「碗」是飯碗的碗，有石字旁。' },
      { id: 's3', meaning: '「母＿」是生你養你的女性長輩。', sentence: '母＿節那天，我送媽媽一束花。', frame: '母＿', options: ['親', '毋'], answer: '親', clue: '提示：這個字的右邊是「見」。', explain: '答案是「親」；「毋」是毋須的毋。' },
      { id: 's4', meaning: '「委＿」是受到不公平的對待，心裡難過。', sentence: '被冤枉的他覺得好委＿。', frame: '委＿', options: ['屈', '掘'], answer: '屈', clue: '提示：這個字沒有提手旁。', explain: '答案是「屈」；「掘」是挖掘的掘，有提手旁。' },
      { id: 's5', meaning: '「＿物館」是展示很多珍貴東西的地方。', sentence: '我們到＿物館參觀恐龍化石。', frame: '＿物', options: ['博', '縛'], answer: '博', clue: '提示：這個字的左邊是「十」。', explain: '答案是「博」；「縛」是束縛的縛，有糸字旁。' },
      { id: 's6', meaning: '「＿相」是彼此對對方做同樣的事。', sentence: '同學之間要＿相幫忙。', frame: '＿相', options: ['互', '瓦'], answer: '互', clue: '提示：這個字的右下沒有一點。', explain: '答案是「互」；「瓦」是屋瓦的瓦。' },
      { id: 's7', meaning: '「＿子」是整理頭髮的工具。', sentence: '姐姐用＿子把頭髮梳整齊。', frame: '＿子', options: ['梳', '蔬'], answer: '梳', clue: '提示：這個字的左邊是木字旁。', explain: '答案是「梳」；「蔬」是蔬菜的蔬，有草字頭。' },
      { id: 's8', meaning: '「害＿」是不好意思、臉紅。', sentence: '被老師稱讚，妹妹害＿的笑了。', frame: '害＿', options: ['羞', '饈'], answer: '羞', clue: '提示：這個字沒有食字旁。', explain: '答案是「羞」；「饈」是珍饈的饈。' },
      { id: 's9', meaning: '「恢＿」是變回原來的樣子。', sentence: '休息一下，體力就恢＿了。', frame: '恢＿', options: ['復', '腹'], answer: '復', clue: '提示：這個字的左邊是雙人旁。', explain: '答案是「復」；「腹」是腹部的腹，有肉字旁。' },
      { id: 's10', meaning: '「＿氣」是調皮、不聽話。', sentence: '弟弟很＿氣，常常爬到桌子上。', frame: '＿氣', options: ['淘', '陶'], answer: '淘', clue: '提示：這個字的左邊是三點水。', explain: '答案是「淘」；「陶」是陶器的陶，有阜字旁。' },
      { id: 's11', meaning: '「＿忙」是急急忙忙。', sentence: '他＿忙的跑出門，忘了帶鑰匙。', frame: '＿忙', options: ['匆', '勿'], answer: '匆', clue: '提示：這個字裡面多了一點。', explain: '答案是「匆」；「勿」是請勿的勿。' },
      { id: 's12', meaning: '「＿常」是很、特別。', sentence: '今天的天氣＿常好。', frame: '＿常', options: ['非', '悲'], answer: '非', clue: '提示：這個字的下面沒有「心」。', explain: '答案是「非」；「悲」是悲傷的悲。' }
    ],
    listen: [
      { id: 'l1', text: '颱風來之前，先把窗戶貼好、買好食物。', answer: 0, options: [{ text: '未雨綢繆', img: 'fix-roof.png' }, { text: '臨渴掘井', img: 'dig-well.png' }, { text: '樂極生悲', img: 'fall-party.png' }, { text: '得意忘形', img: 'show-off.png' }] },
      { id: 'l2', text: '明天要考試，今晚才開始讀書。', answer: 0, options: [{ text: '臨渴掘井', img: 'dig-well.png' }, { text: '未雨綢繆', img: 'fix-roof.png' }, { text: '一粥一飯', img: 'porridge.png' }, { text: '半絲半縷', img: 'thread.png' }] },
      { id: 'l3', text: '玩得太瘋，結果跌倒受傷了。', answer: 0, options: [{ text: '樂極生悲', img: 'fall-party.png' }, { text: '得意忘形', img: 'show-off.png' }, { text: '臨渴掘井', img: 'dig-well.png' }, { text: '未雨綢繆', img: 'fix-roof.png' }] },
      { id: 'l4', text: '贏了比賽，就跳上桌子大叫，一點都不在乎別人。', answer: 0, options: [{ text: '得意忘形', img: 'show-off.png' }, { text: '樂極生悲', img: 'fall-party.png' }, { text: '施惠', img: 'help-neighbor.png' }, { text: '恩惠', img: 'thank-teacher.png' }] },
      { id: 'l5', text: '用泥土燒成的碗、盤和罐子。', answer: 0, options: [{ text: '陶器', img: 'pottery.png' }, { text: '珍饈', img: 'feast.png' }, { text: '園蔬', img: 'vegetables.png' }, { text: '腹部', img: 'stomachache.png' }] },
      { id: 'l6', text: '國王的宴會上，有好多稀奇又好吃的菜。', answer: 0, options: [{ text: '珍饈', img: 'feast.png' }, { text: '園蔬', img: 'vegetables.png' }, { text: '瓦缶', img: 'clay-jar.png' }, { text: '碗盤', img: 'rice-bowl.png' }] },
      { id: 'l7', text: '牽牛花的藤一圈一圈的圍著欄杆。', answer: 0, options: [{ text: '纏繞', img: 'vine-twist.png' }, { text: '束縛', img: 'tied-rope.png' }, { text: '預留', img: 'save-food.png' }, { text: '施惠', img: 'help-neighbor.png' }] },
      { id: 'l8', text: '媽媽幫晚回家的爸爸，先留了一份飯菜。', answer: 0, options: [{ text: '預留', img: 'save-food.png' }, { text: '請勿', img: 'no-entry.png' }, { text: '毋須', img: 'remember-note.png' }, { text: '纏繞', img: 'vine-twist.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '量詞', answer: '怎麼樣', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看是什麼樣的東西。',
      /* 短語：量詞＋形容詞＋的＋名詞（課本沒有短語練習，這裡用自己寫的） */
      intro: { example: '一碗溫熱的白粥', img: 'porridge.png',
        parts: [{ text: '一碗', role: '量詞' }, { text: '溫熱', role: '怎麼樣' }, { text: '的' }, { text: '白粥', role: '什麼東西' }],
        explain: '先說數量，再說出東西的樣子，加上「的」，最後說是什麼東西。' },
      pick: [
        { id: 'ph1', img: 'pr-plain-cup.png', before: '一個', noun: '陶杯', ask: '一個什麼樣的陶杯', look: '再看看圖片，杯子上有沒有花紋？', options: ['樸素', '華麗', '破碎', '骯髒'], clue: '提示：沒有花紋，顏色簡單，看起來很自然。', explain: '答案是「樸素」，完整的短語是「一個樸素的陶杯」。' },
        { id: 'ph2', img: 'pr-clean-table.png', before: '一張', noun: '餐桌', ask: '一張什麼樣的餐桌', look: '再看看圖片，桌上有沒有灰塵？', options: ['乾淨', '油膩', '凌亂', '破舊'], clue: '提示：擦得亮亮的，一點灰塵都沒有。', explain: '答案是「乾淨」，完整的短語是「一張乾淨的餐桌」。' },
        { id: 'ph3', img: 'pr-fresh-veg.png', before: '一盤', noun: '青菜', ask: '一盤什麼樣的青菜', look: '再看看圖片，青菜是剛摘的嗎？', options: ['新鮮', '枯黃', '腐爛', '乾癟'], clue: '提示：早上才從菜園摘下來，還帶著露水。', explain: '答案是「新鮮」，完整的短語是「一盤新鮮的青菜」。' },
        { id: 'ph4', img: 'pr-old-coat.png', before: '一件', noun: '外套', ask: '一件什麼樣的外套', look: '再看看圖片，外套穿了多久？', options: ['舊舊', '嶄新', '閃亮', '鮮豔'], clue: '提示：穿了好多年，袖口都磨白了。', explain: '答案是「舊舊」，完整的短語是「一件舊舊的外套」。' },
        { id: 'ph5', img: 'pr-sturdy-roof.png', before: '一座', noun: '屋頂', ask: '一座什麼樣的屋頂', look: '再看看圖片，下大雨時屋頂會不會漏水？', options: ['堅固', '破爛', '歪斜', '脆弱'], clue: '提示：颱風來了也穩穩的，一滴水都不漏。', explain: '答案是「堅固」，完整的短語是「一座堅固的屋頂」。' },
        { id: 'ph6', img: 'pr-deep-well.png', before: '一口', noun: '古井', ask: '一口什麼樣的古井', look: '再看看圖片，井底看得到嗎？', options: ['深深', '淺淺', '扁扁', '短短'], clue: '提示：往下看黑漆漆的，丟顆石頭要好久才有回音。', explain: '答案是「深深」，完整的短語是「一口深深的古井」。' },
        { id: 'ph7', img: 'pr-warm-meal.png', before: '一頓', noun: '晚餐', ask: '一頓什麼樣的晚餐', look: '再看看圖片，一家人吃飯的感覺怎麼樣？', options: ['溫馨', '冷清', '吵架', '難吃'], clue: '提示：一家人圍在一起，有說有笑。', explain: '答案是「溫馨」，完整的短語是「一頓溫馨的晚餐」。' },
        { id: 'ph8', img: 'pr-shiny-gold.png', before: '一塊', noun: '金子', ask: '一塊什麼樣的金子', look: '再看看圖片，金子亮不亮？', options: ['閃亮', '暗淡', '粗糙', '破舊'], clue: '提示：在陽光下發出耀眼的光。', explain: '答案是「閃亮」，完整的短語是「一塊閃亮的金子」。' }
      ],
      say: [],
      words: [
        { word: '未雨綢繆', meaning: '事情還沒發生，就先準備好。', img: 'fix-roof.png' },
        { word: '臨渴掘井', meaning: '事情發生了才急著想辦法。', img: 'dig-well.png' },
        { word: '樂極生悲', meaning: '太開心時不小心，結果變成傷心的事。', img: 'fall-party.png' },
        { word: '得意忘形', meaning: '太高興了，舉動也跟著失態。', img: 'show-off.png' }
      ],
      choose: [
        { id: 'pw1', word: '未雨綢繆', options: ['出門前先看天氣預報，帶好雨傘，這是未雨綢繆。', '等到淋溼了才去買傘，這是未雨綢繆。'], clue: '提示：想一想，「未雨綢繆」是事先準備，還是事後補救？', explain: '第一句用得對：出門前先準備。淋溼了才買傘，是臨渴掘井。' },
        { id: 'pw2', word: '臨渴掘井', options: ['作業明天要交，今晚才開始寫，真是臨渴掘井。', '他提早一週就把作業寫完，真是臨渴掘井。'], clue: '提示：想一想，「臨渴掘井」是來得及，還是來不及？', explain: '第一句用得對：最後一刻才開始。提早寫完，剛好相反。' },
        { id: 'pw3', word: '樂極生悲', options: ['他在床上跳得太開心，結果撞到頭，真是樂極生悲。', '他安靜的看書，覺得好開心，真是樂極生悲。'], clue: '提示：想一想，「樂極生悲」是開心過頭出事，還是一直平安？', explain: '第一句用得對：跳太開心撞到頭。安靜看書沒有出事。' },
        { id: 'pw4', word: '得意忘形', options: ['他拿到第一名就得意忘形，到處取笑別人。', '他拿到第一名，謙虛的謝謝老師，真是得意忘形。'], clue: '提示：想一想，「得意忘形」是太得意失態，還是很謙虛？', explain: '第一句用得對：太得意去取笑別人。謙虛謝謝老師，剛好相反。' }
      ],
      make: [
        { id: 'pm1', word: '未雨綢繆', clue: '提示：想想看，你做過什麼事先準備好的事？', model: '去露營前，我們未雨綢繆，多帶了一件外套。' },
        { id: 'pm2', word: '臨渴掘井', clue: '提示：想想看，有沒有事到臨頭才急著準備？', model: '比賽前一天才練習，這樣臨渴掘井是來不及的。' },
        { id: 'pm3', word: '樂極生悲', clue: '提示：想想看，有沒有開心過頭出事的例子？', model: '他在泳池邊奔跑嬉鬧，結果滑倒，真是樂極生悲。' },
        { id: 'pm4', word: '得意忘形', clue: '提示：想想看，太得意會發生什麼事？', model: '他考了滿分就得意忘形，結果下次考試粗心大意。' }
      ]
    },
    pattern: [
      { key: 'jibianye', id: 'jb', title: '即便……也……', img: 'jibianye.png',
        meaning: '先用「即便」說一個退一步、比較差的情況，再用「也」說出就算這樣，還是會有的結果。',
        examples: ['即便只是一碗白飯，也是農夫辛苦種出來的。'],
        match: [
          { id: 'pt-jb-m1', img: 'pt-small-gift.png', front: '即便只是一張小卡片，', options: ['也代表滿滿的心意。', '也只是一張薄紙。', '也很快就會丟掉。'], clue: '提示：看看圖片，收到卡片的人開心嗎？', explain: '答案是「也代表滿滿的心意」：就算東西小，心意還是很大。' },
          { id: 'pt-jb-m2', img: 'pt-rain-run.png', front: '即便下著大雨，', options: ['選手們也繼續練跑。', '雨也下得很大。', '選手也在家睡覺。'], clue: '提示：看看圖片，選手有沒有停下來？', explain: '答案是「選手們也繼續練跑」：就算下雨，還是繼續。' },
          { id: 'pt-jb-m3', img: 'pt-old-house.png', front: '即便房子很舊，', options: ['住起來也很溫暖。', '房子也是舊的。', '也沒有人住。'], clue: '提示：看看圖片，屋子裡的人開心嗎？', explain: '答案是「住起來也很溫暖」：就算舊，還是很溫暖。' }
        ],
        conj: [
          { id: 'pt-jb-c1', full: '即便是一點小錢，也要好好珍惜。', img: 'pt-coin-save.png', sentence: '＿＿是一點小錢，＿要好好珍惜。', options: ['即便……也……', '……以免……', '只要……一定……'], clue: '提示：就算情況比較差，結果還是一樣。數數看有幾個空格。', explain: '答案是「即便……也……」：即便是一點小錢，也要好好珍惜。' },
          { id: 'pt-jb-c2', full: '即便失敗了，我也不會放棄。', img: 'pt-try-again.png', sentence: '＿＿失敗了，我＿不會放棄。', options: ['即便……也……', '……以免……', '只要……一定……'], clue: '提示：就算失敗，還是不放棄。數數看有幾個空格。', explain: '答案是「即便……也……」：即便失敗了，我也不會放棄。' }
        ],
        half: [
          { id: 'pt-jb-h1', front: '即便只是一張紙，', clue: '提示：就算只是一張紙，我們也要怎麼做？記得要說「也」。', model: '也不要隨便浪費。' },
          { id: 'pt-jb-h2', front: '即便工作很辛苦，', clue: '提示：就算很辛苦，爸媽還是會做什麼？記得要說「也」。', model: '爸媽也從不抱怨。' }
        ],
        whole: [
          { id: 'pt-jb-w1', clue: '提示：先用「即便」說一個比較差的情況，再用「也」說結果還是一樣。想想看：有什麼事你一定會堅持？', model: '即便天氣很冷，我也會早起去跑步。' }
        ] },
      { key: 'yimian', id: 'ym', title: '……以免……', img: 'yimian.png',
        meaning: '先說要做的事，再用「以免」說出這樣做，是為了不讓不好的事發生。',
        examples: ['出門要帶傘，以免被雨淋溼。'],
        match: [
          { id: 'pt-ym-m1', img: 'pt-wash-hands.png', front: '吃飯前要洗手，', options: ['以免把細菌吃下肚。', '以免手變乾淨。', '以免吃飽飯。'], clue: '提示：看看圖片，洗手是為了避免什麼？', explain: '答案是「以免把細菌吃下肚」：洗手是為了不讓細菌進肚子。' },
          { id: 'pt-ym-m2', img: 'pt-helmet.png', front: '騎腳踏車要戴安全帽，', options: ['以免跌倒時受傷。', '以免騎得太快樂。', '以免頭髮太好看。'], clue: '提示：看看圖片，安全帽可以保護什麼？', explain: '答案是「以免跌倒時受傷」：戴安全帽是為了避免受傷。' },
          { id: 'pt-ym-m3', img: 'pt-cover-food.png', front: '把剩菜蓋好放進冰箱，', options: ['以免食物壞掉。', '以免食物變好吃。', '以免冰箱太空。'], clue: '提示：看看圖片，把菜放進冰箱是為了什麼？', explain: '答案是「以免食物壞掉」：放冰箱是為了避免壞掉。' }
        ],
        conj: [
          { id: 'pt-ym-c1', full: '過馬路要看清楚，以免發生危險。', img: 'pt-cross-road.png', sentence: '過馬路要看清楚，＿＿發生危險。', options: ['……以免……', '即便……也……', '只要……一定……'], clue: '提示：為了不讓不好的事發生。數數看有幾個空格。', explain: '答案是「……以免……」：過馬路要看清楚，以免發生危險。' },
          { id: 'pt-ym-c2', full: '我們要節約用水，以免水不夠用。', img: 'pt-save-water.png', sentence: '我們要節約用水，＿＿水不夠用。', options: ['……以免……', '即便……也……', '只要……一定……'], clue: '提示：節約用水是為了避免什麼？數數看有幾個空格。', explain: '答案是「……以免……」：我們要節約用水，以免水不夠用。' }
        ],
        half: [
          { id: 'pt-ym-h1', front: '睡前要把鬧鐘設好，', clue: '提示：設鬧鐘是為了避免什麼？記得要說「以免」。', model: '以免明天睡過頭。' },
          { id: 'pt-ym-h2', front: '出門前要檢查門有沒有鎖好，', clue: '提示：鎖好門是為了避免什麼？記得要說「以免」。', model: '以免小偷跑進來。' }
        ],
        whole: [
          { id: 'pt-ym-w1', clue: '提示：先說要做的事，再用「以免」說要避免的壞事。想想看：你每天會做什麼事來預防問題？', model: '我每天都會先整理好書包，以免忘了帶課本。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'repeat', name: '類疊', meaning: '同一個字或詞連著重複，或隔開來重複說好幾次，讀起來有節奏，也讓人印象更深。', example: '格言用「一……一……」、「半……半……」，重複的字讓句子好念又好記。',
          show: { sentence: '一點一滴，都要好好珍惜。', mark: ['一', '一'] },
          yesno: [
            { id: 'rh-rp-y1', sentence: '一針一線，都是奶奶的心意。', answer: true, mark: ['一針一線'], clue: '提示：找找看，有沒有同一個字隔開來重複出現？', explain: '是類疊：「一」隔開來說了兩次。' },
            { id: 'rh-rp-y2', sentence: '這件衣服是奶奶縫的。', answer: false, clue: '提示：找找看，有沒有同一個字或詞重複出現？', explain: '不是類疊：這句話沒有重複的字或詞。' }
          ],
          pick: [
            { id: 'rh-rp-p1', mark: ['一草一木'], options: ['校園裡的一草一木，都要好好愛護。', '校園裡有很多植物。'], clue: '提示：哪一句有同一個字隔開來重複？', explain: '「一草一木」重複了「一」，是類疊。' },
            { id: 'rh-rp-p2', mark: ['一粒粒'], options: ['農夫千辛萬苦，種出一粒粒米。', '農夫種出了米。'], clue: '提示：哪一句有隔開重複的字詞？', explain: '「一粒粒」重複了「粒」，是類疊。' },
            { id: 'rh-rp-p3', mark: ['一磚一瓦'], options: ['這間老房子的一磚一瓦，都是爺爺親手蓋的。', '這是一間老房子。', '房子在山腳下。'], clue: '提示：哪一句有同一個字隔開來重複？', explain: '「一磚一瓦」重複了「一」，是類疊。' },
            { id: 'rh-rp-p4', mark: ['半張半張'], options: ['他把紙裁成半張半張，一點也不浪費。', '他把紙裁開了。', '紙是白色的。'], clue: '提示：哪一句把同一個詞說了兩次？', explain: '「半張半張」說了兩次，是類疊。' },
            { id: 'rh-rp-p5', mark: ['慢慢'], options: ['她慢慢的把碗洗乾淨。', '她把碗洗乾淨了。', '碗放在桌上。', '水龍頭在流水。'], clue: '提示：哪一句有連著重複的字？', explain: '「慢慢」是類疊。' },
            { id: 'rh-rp-p6', mark: ['一字一句'], options: ['老師一字一句的念給我們聽。', '老師在念課文。', '大家安靜的聽。', '課本放在桌上。'], clue: '提示：哪一句有同一個字隔開來重複？', explain: '「一字一句」重複了「一」，是類疊。' }
          ] },
        { key: 'parallel', name: '排比', meaning: '把三句或三句以上樣子差不多的話，一句接一句排在一起說，讀起來很有節奏，也很有氣勢。', example: '格言教我們珍惜食物、珍惜衣物、珍惜別人的恩情，一樣一樣排出來，讀起來很有力量。',
          show: { sentence: '珍惜食物，珍惜衣物，珍惜時間。', mark: ['珍惜食物', '珍惜衣物', '珍惜時間'] },
          yesno: [
            { id: 'rh-pa-y1', sentence: '不浪費水，不浪費電，不浪費紙。', answer: true, mark: ['不浪費水', '不浪費電', '不浪費紙'], clue: '提示：有沒有三句樣子差不多的話排在一起？', explain: '是排比：三個「不浪費……」排在一起。' },
            { id: 'rh-pa-y2', sentence: '我們要節省用水。', answer: false, clue: '提示：有沒有三句樣子差不多的話排在一起？', explain: '不是排比：只有一句話。' }
          ],
          pick: [
            { id: 'rh-pa-p1', mark: ['要勤勞', '要節儉', '要感恩'], options: ['做人要勤勞，要節儉，要感恩。', '做人要有禮貌。'], clue: '提示：哪一句一口氣說了三個「要……」？', explain: '三個「要……」排在一起，是排比。' },
            { id: 'rh-pa-p2', mark: ['有的洗碗', '有的掃地', '有的擦桌子'], options: ['飯後大家有的洗碗，有的掃地，有的擦桌子。', '飯後大家一起打掃。'], clue: '提示：哪一句有三個「有的……」？', explain: '三個「有的……」排在一起，是排比。' },
            { id: 'rh-pa-p3', mark: ['謝謝爸爸', '謝謝媽媽', '謝謝老師'], options: ['謝謝爸爸，謝謝媽媽，謝謝老師。', '我很感恩。', '大家對我很好。'], clue: '提示：哪一句有三句樣子差不多的話？', explain: '三個「謝謝……」排在一起，是排比。' },
            { id: 'rh-pa-p4', mark: ['米是農夫種的', '布是工人織的', '屋是師傅蓋的'], options: ['米是農夫種的，布是工人織的，屋是師傅蓋的。', '東西都不容易。', '大家都很辛苦。'], clue: '提示：哪一句有三句樣子差不多的話？', explain: '三個「……是……的」排在一起，是排比。' },
            { id: 'rh-pa-p5', mark: ['早上讀書', '中午運動', '晚上早睡'], options: ['早上讀書，中午運動，晚上早睡。', '我的生活很規律。', '我每天都上學。', '時間像流水。'], clue: '提示：哪一句有三句樣子差不多的話？', explain: '三句排在一起，是排比。' },
            { id: 'rh-pa-p6', mark: ['不貪心', '不浪費', '不炫耀'], options: ['祖父教我不貪心，不浪費，不炫耀。', '祖父很節儉。', '祖父住在鄉下。', '祖父在種菜。'], clue: '提示：哪一句一口氣說了三個「不……」？', explain: '三個「不……」排在一起，是排比。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '一言一行，都要小心。', answer: '類疊', mark: ['一言一行'], clue: '提示：這句話有沒有隔開重複的字？', explain: '答案是「類疊」：「一」說了兩次。' },
        { id: 'rh2', sentence: '雨滴答滴答的下著。', answer: '類疊', mark: ['滴答滴答'], clue: '提示：這句話有沒有重複的詞？', explain: '答案是「類疊」：「滴答」說了兩次。' },
        { id: 'rh3', sentence: '他會掃地，會洗碗，會煮飯。', answer: '排比', mark: ['會掃地', '會洗碗', '會煮飯'], clue: '提示：有沒有三句樣子差不多的話？', explain: '答案是「排比」：三個「會……」排在一起。' },
        { id: 'rh4', sentence: '愛家人，愛朋友，愛自己。', answer: '排比', mark: ['愛家人', '愛朋友', '愛自己'], clue: '提示：有沒有三句樣子差不多的話？', explain: '答案是「排比」：三個「愛……」排在一起。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L02 = d; }
})(this);
