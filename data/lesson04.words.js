/* 第 4 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'infer', qe: 'infer', qf: 'infer', qg: 'interpret', qh: 'interpret',
      qi: 'evaluate', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qg: { think: ['兩首詩都在寫哪裡的食物？', '一首來自北部，一首來自中部，寫的內容有什麼不一樣？'], why: '兩首詩都在寫臺灣的小吃，也都用相同的句子形式反覆出現。不同的是：一首寫北部的小吃，著重做法和感覺；另一首寫中部的小吃，還寫了它的由來和外形。' },
      qh: { think: ['詩裡寫了食物的顏色、形狀和動作嗎？', '你讀的時候，腦中有沒有出現畫面？'], why: '作者把眼睛看到的顏色、形狀、動作都仔細寫下來，例如白白的米漿慢慢滑下、一顆顆亮亮的小吃，讓讀者好像親眼看到一樣。' },
      qi: { think: ['作者寫這兩首詩時，用了很多讚美的詞嗎？', '他對家鄉的小吃有什麼感情？'], why: '作者用很多美好的字詞寫這些小吃，還寫出它們的故事和人情味，可以感覺到他很喜歡、也很驕傲這些家鄉的味道。' },
      qj: { think: ['你吃過東部或離島的什麼小吃？', '你會怎麼介紹它，讓別人想去吃？'], why: '只要說出一樣東部或離島的小吃，再說它的特色或好吃的原因，就是很好的推薦。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['我想推薦花蓮的麻糬，軟軟Q Q的，有很多口味。', '我想推薦澎湖的仙人掌冰，酸酸甜甜好消暑。'], bad: ['我不吃東西，也不想推薦。', '我想推薦漢堡，因為我只吃速食。'], why: '題目問的是東部或離島值得推薦的小吃。說出地方的特色小吃和好吃的原因，就是好推薦。不想推薦、說和題目無關的速食，都沒有回答到題目。' },
      k2: { good: ['我最愛媽媽煮的滷肉飯，因為那是家的味道。', '我最愛夜市的蚵仔煎，因為又香又熱鬧。'], bad: ['我沒有喜歡的食物，什麼都不想吃。', '我最喜歡的東西是玩具。'], why: '題目問的是你最喜歡的美食和原因。說出一道菜和你喜歡它的理由，就是好的回答。說沒有喜歡的、講玩具，都沒有回答到題目。' }
    },
    hanzi: [
      { id: 'h-鼎', combo: { type: '象形字', pict: '「鼎」像一個有兩個耳朵、三隻腳的大鍋子，是古時候煮東西、也拿來祭拜的器具。' }, char: '鼎', zhuyin: 'ㄉㄧㄥˇ', radical: '鼎', strokes: 13, words: ['鼎邊趖', '一言九鼎'], say: '鼎，一言九鼎的鼎', cloze: '一言九＿', img: 'ancient-pot.png', options: ['鼎', '頂', '丁', '盯'], clue: '這個字像一個有三隻腳的大鍋子。', explain: '答案是「鼎」；「頂」的右邊是「頁」，「盯」的左邊是目字旁。', parts: ['鼎'], story: '「鼎」像一個三隻腳的大鍋，古時候用來煮東西。說話很有分量，叫「一言九鼎」。', sentence: '博物館裡有一個古代的銅鼎。' },
      { id: 'h-颳', combo: { layout: 'lr', parts: [['風', 'm', '風'], ['舌', 's', '']] }, char: '颳', zhuyin: 'ㄍㄨㄚ', radical: '風', strokes: 15, words: ['颳風', '颳起'], say: '颳，颳起的颳', cloze: '＿起', img: 'windy-day.png', options: ['颳', '刮', '括', '話'], clue: '這個字的左邊是「風」。', explain: '答案是「颳」，左邊是「風」；「刮」的右邊是立刀旁，「括」的左邊是提手旁。', parts: ['風', '舌'], story: '左邊是「風」，右邊的「舌」念起來有點像「颳」。風很大、一直吹，就是「颳風」。', sentence: '外面颳起大風，樹葉滿天飛。', build: { layout: 'lr', show: ['？', '舌'], answer: '風', options: ['風', '扌', '言', '氵'], clue: '想一想：吹動的空氣，左邊放哪一個？' } },
      { id: 'h-廚', combo: { type: '形聲字', pict: '外面的「广」像一間屋子，裡面念起來像「廚」。屋子裡煮飯做菜的地方，就是「廚」。' }, char: '廚', zhuyin: 'ㄔㄨˊ', radical: '广', strokes: 15, words: ['廚師', '廚房'], say: '廚，廚房的廚', cloze: '＿房', img: 'kitchen.png', options: ['廚', '櫥', '樹', '尌'], clue: '這個字的外面是「广」。', explain: '答案是「廚」，外面是「广」；「櫥」的左邊多了木字旁，「樹」的左邊是木字旁。', parts: ['广', '尌'], story: '外面的「广」像屋子，裡面念起來像「廚」。家裡煮飯做菜的房間，就是「廚房」。', sentence: '媽媽在廚房裡煮晚餐。' },
      { id: 'h-淋', combo: { layout: 'lr', parts: [['氵', 'm', '水'], ['林', 's', '']] }, char: '淋', zhuyin: 'ㄌㄧㄣˊ', radical: '水', strokes: 11, words: ['淋溼', '淋雨'], say: '淋，淋雨的淋', cloze: '＿雨', img: 'rain-wet.png', options: ['淋', '林', '琳', '霖'], clue: '這個字的左邊是三點水。', explain: '答案是「淋」，左邊是三點水；「林」沒有三點水，「琳」的左邊是「王」。', parts: ['氵', '林'], story: '左邊是水，右邊的「林」念起來像「淋」。水從上面澆下來，就是「淋」；被雨打溼，叫「淋雨」。', sentence: '忘了帶傘，我被淋成落湯雞。', build: { layout: 'lr', show: ['？', '林'], answer: '氵', options: ['氵', '王', '雨', '木'], clue: '想一想：從上面澆下來的是什麼？' } },
      { id: 'h-晒', combo: { layout: 'lr', parts: [['日', 'm', '太陽'], ['西', 's', '']] }, char: '晒', zhuyin: 'ㄕㄞˋ', radical: '日', strokes: 10, words: ['晒乾', '晒太陽'], say: '晒，晒太陽的晒', cloze: '＿太陽', img: 'sun-dry.png', options: ['晒', '酒', '西', '栖'], clue: '這個字的左邊是日字旁。', explain: '答案是「晒」，左邊是日字旁；「酒」的左邊是三點水，「栖」的左邊是木字旁。', parts: ['日', '西'], story: '左邊是太陽，右邊的「西」念起來有點像「晒」。放在陽光下，讓太陽照，就是「晒」。', sentence: '冬天中午，爺爺坐在院子裡晒太陽。', build: { layout: 'lr', show: ['？', '西'], answer: '日', options: ['日', '氵', '木', '酉'], clue: '想一想：讓衣服變乾要靠什麼照？' } },
      { id: 'h-筍', combo: { layout: 'tb', parts: [['竹', 'm', '竹子'], ['旬', 's', '']] }, char: '筍', zhuyin: 'ㄙㄨㄣˇ', radical: '竹', strokes: 12, words: ['竹筍', '筍乾'], say: '筍，筍乾的筍', cloze: '＿乾', img: 'bamboo-shoot.png', options: ['筍', '旬', '詢', '殉'], clue: '這個字的上面是竹字頭。', explain: '答案是「筍」，上面是竹字頭；「詢」的左邊是言字旁，「旬」沒有竹字頭。', parts: ['竹', '旬'], story: '上面是竹子，下面的「旬」念起來像「筍」。竹子剛從土裡冒出來的嫩芽，就是「竹筍」。', sentence: '春天的竹筍又嫩又甜。', build: { layout: 'tb', show: ['？', '旬'], answer: '竹', options: ['竹', '艹', '雨', '言'], clue: '想一想：嫩芽長大會變成什麼植物？' } },
      { id: 'h-丁', combo: { type: '象形字', pict: '「丁」像一根釘子，上面是平平的頭，下面是尖尖的身體。' }, char: '丁', zhuyin: 'ㄉㄧㄥ', radical: '一', strokes: 2, words: ['切丁', '園丁'], say: '丁，園丁的丁', cloze: '園＿', img: 'gardener.png', options: ['丁', '了', '子', '寸'], clue: '這個字像一根釘子，上面一橫。', explain: '答案是「丁」；「了」的上面是橫折，「子」多了一橫。', parts: ['丁'], story: '「丁」像一根釘子。切成小方塊叫「切丁」；照顧花園的人，叫「園丁」。', sentence: '園丁每天幫花草澆水。' },
      { id: 'h-醃', combo: { layout: 'lr', parts: [['酉', 'm', '酒罈'], ['奄', 's', '']] }, char: '醃', zhuyin: 'ㄧㄢ', radical: '酉', strokes: 15, words: ['醃製', '醃菜'], say: '醃，醃菜的醃', cloze: '＿菜', img: 'pickles.png', options: ['醃', '淹', '掩', '奄'], clue: '這個字的左邊是「酉」。', explain: '答案是「醃」，左邊是「酉」；「淹」的左邊是三點水，「掩」的左邊是提手旁。', parts: ['酉', '奄'], story: '左邊的「酉」像一個罈子，右邊的「奄」念起來像「醃」。把菜放進罈子，加鹽泡著，就是「醃菜」。', sentence: '外婆醃的菜脯又香又脆。', build: { layout: 'lr', show: ['？', '奄'], answer: '酉', options: ['酉', '氵', '扌', '大'], clue: '想一想：用罈子泡著的食物，左邊放哪一個？' } },
      { id: 'h-攪', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['覺', 's', '']] }, char: '攪', zhuyin: 'ㄐㄧㄠˇ', radical: '手', strokes: 23, words: ['攪拌', '攪動'], say: '攪，攪動的攪', cloze: '＿動', img: 'stir-pot.png', options: ['攪', '覺', '學', '擾'], clue: '這個字的左邊是提手旁。', explain: '答案是「攪」，左邊是提手旁；「覺」沒有提手旁，「擾」的右邊是「憂」。', parts: ['扌', '覺'], story: '左邊是手，右邊的「覺」念起來有點像「攪」。用手拿湯匙轉圈圈，就是「攪動」。', sentence: '我用湯匙攪動杯子裡的牛奶。', build: { layout: 'lr', show: ['？', '覺'], answer: '扌', options: ['扌', '子', '木', '口'], clue: '想一想：拿湯匙轉圈圈要用身體的哪個部分？' } },
      { id: 'h-炸', combo: { layout: 'lr', parts: [['火', 'm', '火'], ['乍', 's', '']] }, char: '炸', zhuyin: 'ㄓㄚˊ', radical: '火', strokes: 9, words: ['油炸', '炸雞'], say: '炸，炸雞的炸', cloze: '＿雞', img: 'fried-chicken.png', options: ['炸', '昨', '作', '詐'], clue: '這個字的左邊是火字旁。', explain: '答案是「炸」，左邊是火字旁；「昨」的左邊是日字旁，「作」的左邊是單人旁。', parts: ['火', '乍'], story: '左邊是火，右邊的「乍」念起來有點像「炸」。把食物放進滾燙的油裡，用大火煮熟，就是「炸」。', sentence: '剛炸好的雞腿又香又脆。', build: { layout: 'lr', show: ['？', '乍'], answer: '火', options: ['火', '日', '亻', '言'], clue: '想一想：油要燒得很燙，靠的是什麼？' } },
      { id: 'h-瑩', combo: { type: '形聲字', pict: '上面有兩個「火」和一個蓋子，像閃閃的光；下面是「玉」。像玉一樣閃著光、亮亮透透的，就是「瑩」。' }, char: '瑩', zhuyin: 'ㄧㄥˊ', radical: '玉', strokes: 15, words: ['晶瑩', '晶瑩剔透'], say: '瑩，晶瑩的瑩', cloze: '晶＿', img: 'dewdrop.png', options: ['瑩', '螢', '營', '榮'], clue: '這個字的下面是「玉」。', explain: '答案是「瑩」，下面是「玉」；「螢」的下面是「虫」，「營」的下面是兩個「口」。', parts: ['火', '火', '冖', '玉'], story: '下面是「玉」，上面像閃閃的光。像玉一樣透明又發亮，就是「晶瑩」。', sentence: '葉子上的露珠晶瑩剔透。' },
      { id: 'h-饗', combo: { type: '形聲字', pict: '上面的「鄉」念起來像「饗」，下面是「食」。拿食物招待客人，就是「饗」。' }, char: '饗', zhuyin: 'ㄒㄧㄤˇ', radical: '食', strokes: 22, words: ['饗宴', '饗客'], say: '饗，饗宴的饗', cloze: '＿客', img: 'banquet.png', options: ['饗', '響', '鄉', '嚮'], clue: '這個字的下面是「食」。', explain: '答案是「饗」，下面是「食」；「響」的下面是「音」，「嚮」的下面是「向」。', parts: ['鄉', '食'], story: '上面念起來像「饗」，下面的「食」是吃的東西。拿好吃的東西招待客人，就是「饗客」；豐盛的宴會叫「饗宴」。', sentence: '這場音樂會是一場耳朵的饗宴。' },
      { id: 'h-宴', combo: { type: '會意字', pict: '上面的寶蓋頭是房子，下面是「妟」，像女子安安穩穩坐著。大家在屋子裡安心的吃喝，就是「宴」。' }, char: '宴', zhuyin: 'ㄧㄢˋ', radical: '宀', strokes: 10, words: ['饗宴', '喜宴'], say: '宴，喜宴的宴', cloze: '喜＿', img: 'wedding-feast.png', options: ['宴', '晏', '安', '要'], clue: '這個字的上面是寶蓋頭。', explain: '答案是「宴」，上面是寶蓋頭；「晏」沒有寶蓋頭，「安」的下面只有「女」。', parts: ['宀', '妟'], story: '上面是房子，下面像人安穩坐著。大家在屋裡一起開心吃飯，就是「宴會」；結婚時請客吃飯，叫「喜宴」。', sentence: '表姐的喜宴有十二道菜。' },
      { id: 'h-彰', combo: { type: '形聲字', pict: '左邊的「章」念起來像「彰」，右邊的「彡」像閃閃發亮的光。讓好的東西亮亮的顯出來，就是「彰」。' }, char: '彰', zhuyin: 'ㄓㄤ', radical: '彡', strokes: 14, words: ['彰化', '表彰'], say: '彰，表彰的彰', cloze: '表＿', img: 'award-ceremony.png', options: ['彰', '章', '樟', '障'], clue: '這個字的右邊是「彡」。', explain: '答案是「彰」，右邊是「彡」；「樟」的左邊是木字旁，「障」的左邊是阜字旁。', parts: ['章', '彡'], story: '左邊的「章」念起來像「彰」，右邊的「彡」像亮亮的光。把好人好事公開稱讚，讓大家都看到，就是「表彰」。', sentence: '學校表彰熱心服務的同學。' },
      { id: 'h-煮', combo: { layout: 'tb', parts: [['者', 's', ''], ['灬', 'm', '火']] }, char: '煮', zhuyin: 'ㄓㄨˇ', radical: '火', strokes: 12, words: ['煮熟', '煮飯'], say: '煮，煮飯的煮', cloze: '＿飯', img: 'cook-rice.png', options: ['煮', '者', '著', '豬'], clue: '這個字的下面是四點火。', explain: '答案是「煮」，下面是四點火；「者」沒有四點，「著」的上面是草字頭。', parts: ['者', '灬'], story: '上面的「者」念起來有點像「煮」，下面是火。把東西放在鍋裡用火加熱，就是「煮」。', sentence: '奶奶煮了一鍋香噴噴的雞湯。', build: { layout: 'tb', show: ['者', '？'], answer: '灬', options: ['灬', '木', '日', '心'], clue: '想一想：鍋子下面燒的是什麼？' } },
      { id: 'h-豬', combo: { layout: 'lr', parts: [['豕', 'm', '豬'], ['者', 's', '']] }, char: '豬', zhuyin: 'ㄓㄨ', radical: '豕', strokes: 15, words: ['豬肉', '小豬'], say: '豬，小豬的豬', cloze: '小＿', img: 'piglet.png', options: ['豬', '煮', '著', '諸'], clue: '這個字的左邊是「豕」。', explain: '答案是「豬」，左邊是「豕」；「煮」的下面是四點火，「諸」的左邊是言字旁。', parts: ['豕', '者'], story: '左邊的「豕」是豬的樣子，右邊的「者」念起來有點像「豬」。鼻子圓圓、會哼哼叫的動物，就是「豬」。', sentence: '農場裡有三隻粉紅色的小豬。', build: { layout: 'lr', show: ['？', '者'], answer: '豕', options: ['豕', '灬', '言', '犭'], clue: '想一想：這是一種家畜，左邊放哪一個？' } }
    ],
    vocab: [
      { id: 'v-鼎邊趖', cloze: true, clozeOptions: ['鼎邊趖', '漢堡', '披薩', '薯條'], word: '鼎邊趖', meaning: '把米漿淋在熱鍋旁、做成片狀再加湯的小吃。', example: '夜市的＿＿＿很有名。', img: 'rice-noodle-soup.png', options: ['鼎邊趖', '豬肉', '竹筍', '饗宴'] },
      { id: 'v-颳風', cloze: true, clozeOptions: ['颳風', '晴天', '彩虹', '星空'], word: '颳風', meaning: '空氣流動得很猛烈。', example: '今天＿＿又下雨，我們留在家裡。', img: 'windy-day.png', options: ['颳風', '淋溼', '晒乾', '油炸'] },
      { id: 'v-廚師', cloze: true, clozeOptions: ['廚師', '司機', '醫生', '郵差'], word: '廚師', meaning: '專門做菜給客人吃的人。', example: '餐廳的＿＿做出一桌好菜。', img: 'chef.png', options: ['廚師', '彰化', '竹筍', '鼎邊趖'] },
      { id: 'v-淋溼', cloze: true, clozeOptions: ['淋溼', '晒乾', '烤熱', '吹乾'], word: '淋溼', meaning: '被雨或水澆透了。', example: '忘了帶傘，我全身都被＿＿了。', img: 'rain-wet.png', options: ['淋溼', '晒乾', '攪拌', '醃製'] },
      { id: 'v-晒乾', cloze: true, clozeOptions: ['晒乾', '淋溼', '泡水', '弄溼'], word: '晒乾', meaning: '放在太陽下，讓水分不見。', example: '洗好的衣服要＿＿再收起來。', img: 'sun-dry.png', options: ['晒乾', '淋溼', '油炸', '煮熟'] },
      { id: 'v-竹筍', cloze: true, clozeOptions: ['竹筍', '石頭', '貝殼', '樹葉'], word: '竹筍', meaning: '從土裡冒出來的嫩芽，脆脆的可以吃。', example: '春天的山上長出好多＿＿。', img: 'bamboo-shoot.png', options: ['竹筍', '豬肉', '廚師', '彰化'] },
      { id: 'v-切丁', cloze: true, clozeOptions: ['切丁', '整顆', '整條', '整塊'], word: '切丁', meaning: '把食物分成一小塊一小塊的方塊。', example: '媽媽把紅蘿蔔＿＿，放進炒飯裡。', img: 'diced-carrot.png', options: ['切丁', '攪拌', '醃製', '晒乾'] },
      { id: 'v-醃製', cloze: true, clozeOptions: ['醃製', '丟掉', '弄壞', '燒焦'], word: '醃製', meaning: '用鹽或醬料泡著，讓食物入味。', example: '外婆＿＿的蘿蔔乾，配粥最好吃。', img: 'pickles.png', options: ['醃製', '油炸', '攪拌', '切丁'] },
      { id: 'v-攪拌', cloze: true, clozeOptions: ['攪拌', '靜止', '凍結', '放著'], word: '攪拌', meaning: '用工具轉圈圈，讓東西混在一起。', example: '把麵粉和蛋＿＿均勻，就能做蛋糕。', img: 'stir-pot.png', options: ['攪拌', '醃製', '晒乾', '淋溼'] },
      { id: 'v-油炸', cloze: true, clozeOptions: ['油炸', '清蒸', '涼拌', '生吃'], word: '油炸', meaning: '放進滾燙的熱鍋裡，讓食物變得金黃酥脆。', example: '＿＿的食物不要吃太多。', img: 'fried-chicken.png', options: ['油炸', '煮熟', '攪拌', '切丁'] },
      { id: 'v-晶瑩', cloze: true, clozeOptions: ['晶瑩', '混濁', '暗淡', '骯髒'], word: '晶瑩', meaning: '亮亮的、透明得像玻璃。', example: '早上的露珠＿＿剔透。', img: 'dewdrop.png', options: ['晶瑩', '饗宴', '彰化', '颳風'] },
      { id: 'v-饗宴', cloze: true, clozeOptions: ['饗宴', '早餐', '點心', '便當'], word: '饗宴', meaning: '招待客人的豐盛餐會。', example: '國王舉辦了一場盛大的＿＿。', img: 'banquet.png', options: ['饗宴', '晶瑩', '廚師', '鼎邊趖'] },
      { id: 'v-彰化', cloze: true, clozeOptions: ['彰化', '月球', '火星', '海底'], word: '彰化', meaning: '臺灣中部的一個縣。', example: '＿＿有一座很有名的大佛。', img: 'taiwan-map.png', options: ['彰化', '竹筍', '廚師', '豬肉'] },
      { id: 'v-煮熟', cloze: true, clozeOptions: ['煮熟', '生吃', '冷凍', '晒乾'], word: '煮熟', meaning: '放在水裡加熱到可以吃。', example: '雞蛋要＿＿才能吃。', img: 'cook-rice.png', options: ['煮熟', '油炸', '淋溼', '攪拌'] },
      { id: 'v-豬肉', cloze: true, clozeOptions: ['豬肉', '蘋果', '青菜', '米飯'], word: '豬肉', meaning: '從一種家畜身上取下、常拿來做菜的食材。', example: '媽媽買了一斤＿＿做水餃。', img: 'meat-market.png', options: ['豬肉', '竹筍', '鼎邊趖', '廚師'] },
      { id: 'v-華燈初上', cloze: true, clozeOptions: ['華燈初上', '日正當中', '天剛亮時', '烈日當空'], word: '華燈初上', meaning: '天色剛暗，城市亮起點點光芒。', example: '＿＿＿＿，夜市的攤販開始熱鬧起來。', img: 'night-lights.png', options: ['華燈初上', '人來人往', '街頭巷尾', '晶瑩'] },
      { id: 'v-人來人往', cloze: true, clozeOptions: ['人來人往', '空無一人', '冷冷清清', '寂靜無聲'], word: '人來人往', meaning: '街上走動的群眾非常多。', example: '車站裡＿＿＿＿，好熱鬧。', img: 'busy-station.png', options: ['人來人往', '華燈初上', '街頭巷尾', '饗宴'] },
      { id: 'v-街頭巷尾', cloze: true, clozeOptions: ['街頭巷尾', '深山野外', '海底深處', '天空雲端'], word: '街頭巷尾', meaning: '城鎮裡每一條路、每一個角落。', example: '過年時，＿＿＿＿都掛滿了紅燈籠。', img: 'lantern-street.png', options: ['街頭巷尾', '人來人往', '華燈初上', '彰化'] }
    ],
    charwords: [
      { id: 'cw-鼎', char: '鼎', img: 'ancient-pot.png', charMeaning: '古代三隻腳的大鍋。', word: '一言九鼎', meaning: '說話很有分量，說了就算數。', example: '爸爸答應的事一定做到，真是＿＿＿＿。', options: ['一言九鼎', '颳起', '廚房', '淋雨'] },
      { id: 'cw-颳', char: '颳', img: 'windy-day.png', charMeaning: '風吹。', word: '颳起', meaning: '風開始吹起來。', example: '海邊突然＿＿一陣強風。', options: ['颳起', '晒太陽', '筍乾', '園丁'] },
      { id: 'cw-廚', char: '廚', img: 'kitchen.png', charMeaning: '做菜的地方。', word: '廚房', meaning: '家裡煮飯做菜的房間。', example: '＿＿飄出炒菜的香味。', options: ['廚房', '醃菜', '攪動', '炸雞'] },
      { id: 'cw-淋', char: '淋', img: 'rain-wet.png', charMeaning: '水從上面澆下來。', word: '淋雨', meaning: '被雨打溼。', example: '下大雨了，不要在外面＿＿。', options: ['淋雨', '晶瑩剔透', '饗客', '喜宴'] },
      { id: 'cw-晒', char: '晒', img: 'sun-dry.png', charMeaning: '讓太陽照。', word: '晒太陽', meaning: '讓太陽照在身上。', example: '小貓躺在窗邊＿＿＿。', options: ['晒太陽', '表彰', '煮飯', '小豬'] },
      { id: 'cw-筍', char: '筍', img: 'bamboo-shoot.png', charMeaning: '竹子的嫩芽。', word: '筍乾', meaning: '晒乾的竹筍。', example: '阿嬤用＿＿滷了一鍋肉。', options: ['筍乾', '一言九鼎', '颳起', '廚房'] },
      { id: 'cw-丁', char: '丁', img: 'gardener.png', charMeaning: '小方塊；做事的人。', word: '園丁', meaning: '照顧花園、修剪花草的人。', example: '＿＿把樹修剪得整整齊齊。', options: ['園丁', '淋雨', '晒太陽', '筍乾'] },
      { id: 'cw-醃', char: '醃', img: 'pickles.png', charMeaning: '用鹽泡著讓食物入味。', word: '醃菜', meaning: '用鹽醃過、可以放很久的菜。', example: '外婆的＿＿配稀飯最好吃。', options: ['醃菜', '園丁', '攪動', '炸雞'] },
      { id: 'cw-攪', char: '攪', img: 'stir-pot.png', charMeaning: '轉圈圈混合。', word: '攪動', meaning: '用東西在裡面轉來轉去。', example: '他用竹竿＿＿池塘裡的水。', options: ['攪動', '晶瑩剔透', '饗客', '喜宴'] },
      { id: 'cw-炸', char: '炸', img: 'fried-chicken.png', charMeaning: '放進熱油裡煮。', word: '炸雞', meaning: '用熱油炸熟的雞肉。', example: '我最喜歡吃夜市的＿＿。', options: ['炸雞', '表彰', '煮飯', '小豬'] },
      { id: 'cw-瑩', char: '瑩', img: 'dewdrop.png', charMeaning: '光亮透明。', word: '晶瑩剔透', meaning: '又亮又透明，像水晶一樣。', example: '這顆玻璃珠＿＿＿＿，好漂亮。', options: ['晶瑩剔透', '一言九鼎', '颳起', '廚房'] },
      { id: 'cw-饗', char: '饗', img: 'banquet.png', charMeaning: '用食物招待客人。', word: '饗客', meaning: '拿好吃的東西招待客人。', example: '主人準備了一桌好菜來＿＿。', options: ['饗客', '淋雨', '晒太陽', '筍乾'] },
      { id: 'cw-宴', char: '宴', img: 'wedding-feast.png', charMeaning: '請客吃飯。', word: '喜宴', meaning: '結婚時請客的宴會。', example: '我們去參加表哥的＿＿。', options: ['喜宴', '園丁', '醃菜', '攪動'] },
      { id: 'cw-彰', char: '彰', img: 'award-ceremony.png', charMeaning: '顯出來、稱讚。', word: '表彰', meaning: '公開稱讚好人好事。', example: '市長＿＿救人的英雄。', options: ['表彰', '炸雞', '晶瑩剔透', '饗客'] },
      { id: 'cw-煮', char: '煮', img: 'cook-rice.png', charMeaning: '用火加熱食物。', word: '煮飯', meaning: '把米煮成飯。', example: '我會幫媽媽洗米＿＿。', options: ['煮飯', '喜宴', '表彰', '小豬'] },
      { id: 'cw-豬', char: '豬', img: 'piglet.png', charMeaning: '一種家畜。', word: '小豬', meaning: '年紀小的豬。', example: '故事裡的三隻＿＿蓋了三間房子。', options: ['小豬', '煮飯', '一言九鼎', '颳起'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-一言九鼎', situationImg: 'id-promise-keep.png',
        anim: { bg: 'room', a: { dad: ['👨', 30, 58, 13], kid: ['🧒', 70, 64, 11], talk: ['💬', 30, 36, 10, 'h'], cal: ['📅', 84, 22, 9], gift: ['🎁', 70, 40, 10, 'h'] },
          s: [['爸爸說：「週末帶你去動物園。」', [['in', 'talk'], ['bob', 'talk']]],
            ['到了週末，雖然爸爸很忙，', [['wig', 'cal']]],
            ['他還是說到做到，帶我出門了！', [['out', 'talk'], ['in', 'gift'], ['jump', 'kid']]],
            ['說話很有分量，說了一定算數，就是一言九鼎。', [['pop', 'gift']]]] },
        idiom: '一言九鼎', char: '鼎', meaning: '說的話很有分量，說了就一定算數。', example: '班長一言九鼎，答應的事一定做到。', situation: '爸爸答應週末去動物園，雖然很忙，還是說到做到。',
        fill: { options: ['他＿＿＿＿，從來不會食言。', '他常常說話不算話，一點也不＿＿＿＿。'], clue: '提示：哪一句是說話算數？', explain: '兩句意思相反。第一句用得對：從不食言。說話不算話，就不是一言九鼎。' } },
      { id: 'i-淋漓盡致', situationImg: 'id-great-acting.png',
        anim: { bg: 'school', a: { stage: ['🎭', 50, 40, 16], actor: ['🧑', 50, 62, 12], tear: ['😢', 20, 66, 9, 'h'], clap: ['👏', 80, 66, 9, 'h'] },
          s: [['小明在舞臺上演一個難過的角色。', [['bob', 'actor']]],
            ['他的表情、動作都演得好真實，', [['shake', 'actor']]],
            ['臺下的觀眾都跟著掉眼淚。', [['in', 'tear']]],
            ['把意思完整又充分的表現出來，就是淋漓盡致。', [['in', 'clap'], ['pop', 'clap']]]] },
        idiom: '淋漓盡致', char: '淋', meaning: '表現或說明得非常完整、非常充分。', example: '她把歌曲的感情唱得淋漓盡致。', situation: '小明把難過的角色演得好真實，觀眾都跟著掉眼淚。',
        fill: { options: ['這篇文章把作者的心情寫得＿＿＿＿。', '他只寫了一句話，就說自己寫得＿＿＿＿。'], clue: '提示：哪一句是表現得非常完整？', explain: '第一句用得對：把心情寫得很完整。只寫一句話，不能說淋漓盡致。' } },
      { id: 'i-雨後春筍', situationImg: 'id-shoots-rain.png',
        anim: { bg: 'park', a: { rain: ['🌧️', 50, 16, 14], s1: ['🌱', 20, 74, 8, 'h'], s2: ['🌱', 40, 74, 8, 'h'], s3: ['🌱', 60, 74, 8, 'h'], s4: ['🌱', 80, 74, 8, 'h'] },
          s: [['春天下了一場雨。', [['wig', 'rain']]],
            ['雨停了，土裡冒出一根竹筍，', [['in', 's1'], ['grow', 's1', 1.4]]],
            ['兩根、三根……一下子冒出好多！', [['in', 's2'], ['in', 's3'], ['in', 's4']]],
            ['新的東西一下子出現很多，就是雨後春筍。', [['grow', 's2', 1.4], ['grow', 's3', 1.4], ['grow', 's4', 1.4]]]] },
        idiom: '雨後春筍', char: '筍', meaning: '春雨過後竹筍冒出很多；比喻新的東西一下子大量出現。', example: '最近手搖飲料店像雨後春筍一樣，一家一家開。', situation: '春雨過後，土裡一下子冒出好多竹筍。',
        fill: { options: ['新的書店如＿＿＿＿般一家家開張。', '這條街只開了一家店，真是＿＿＿＿。'], clue: '提示：哪一句是一下子出現很多？', explain: '第一句用得對：書店一家家開。只開一家，不是雨後春筍。' } },
      { id: 'i-目不識丁', situationImg: 'id-learn-read.png',
        anim: { bg: 'room', a: { old: ['👴', 30, 60, 13], book: ['📖', 52, 54, 10], q: ['❓', 30, 36, 9], kid: ['🧒', 74, 64, 11], abc: ['🔤', 52, 34, 9, 'h'] },
          s: [['阿公小時候沒有機會上學。', [['bob', 'old']]],
            ['他拿著書，一個字也看不懂。', [['wig', 'q']]],
            ['孫子每天教他認一個字，', [['in', 'abc'], ['mv', 'kid', [62, 64, 600]]]],
            ['一個字都不認識，就是目不識丁。現在阿公慢慢學會了！', [['out', 'q'], ['jump', 'old']]]] },
        idiom: '目不識丁', char: '丁', meaning: '連一個字都不認識。', example: '奶奶以前目不識丁，後來去讀夜校，現在會寫信了。', situation: '阿公小時候沒上學，拿著書一個字也看不懂。',
        fill: { options: ['以前很多人沒機會讀書，＿＿＿＿。', '他讀了很多書，學問好，＿＿＿＿。'], clue: '提示：哪一句是一個字都不認識？', explain: '第一句用得對：沒機會讀書，不認識字。讀了很多書，剛好相反。' } },
      { id: 'i-相得益彰', situationImg: 'id-good-match.png',
        anim: { bg: 'room', a: { cake: ['🍰', 40, 58, 13], berry: ['🍓', 64, 40, 9], star: ['✨', 50, 32, 9, 'h'], yum: ['😋', 80, 62, 11, 'h'] },
          s: [['一塊白白的蛋糕，', [['bob', 'cake']]],
            ['放上一顆紅紅的草莓，', [['mv', 'berry', [42, 44, 700]]]],
            ['蛋糕更好看，草莓也更好吃了！', [['in', 'star'], ['in', 'yum']]],
            ['互相搭配，讓彼此更好，就是相得益彰。', [['pop', 'star']]]] },
        idiom: '相得益彰', char: '彰', meaning: '互相搭配，讓雙方的優點都更明顯。', example: '綠色的葉子配上紅色的花，相得益彰。', situation: '白蛋糕放上紅草莓，蛋糕更好看，草莓也更好吃。',
        fill: { options: ['歌聲和鋼琴聲＿＿＿＿，好聽極了。', '兩個人一直吵架，合作得一團亂，真是＿＿＿＿。'], clue: '提示：哪一句是互相搭配得很好？', explain: '第一句用得對：歌聲和琴聲互相搭配。吵架、一團亂，不是相得益彰。' } },
      { id: 'i-欲蓋彌彰', situationImg: 'id-hide-stain.png',
        anim: { bg: 'room', a: { kid: ['🧒', 30, 60, 12], vase: ['🏺', 66, 60, 12], crack: ['💥', 66, 50, 8, 'h'], cover: ['🧸', 66, 62, 14, 'h'], mom: ['👩', 88, 58, 12, 'h'], eye: ['👀', 88, 36, 8, 'h'] },
          s: [['弟弟不小心把花瓶打破了。', [['in', 'crack'], ['shake', 'vase']]],
            ['他趕快用一個大玩偶把花瓶擋住。', [['in', 'cover']]],
            ['媽媽一進來就說：「玩偶怎麼在這裡？」', [['in', 'mom'], ['in', 'eye']]],
            ['越想遮掩，反而越明顯，就是欲蓋彌彰。', [['shake', 'kid']]]] },
        idiom: '欲蓋彌彰', char: '彰', meaning: '想要遮掩錯誤，反而讓錯誤更明顯。', example: '他把考卷藏起來，反而欲蓋彌彰，媽媽一下就發現了。', situation: '弟弟打破花瓶，用玩偶擋住，媽媽一看就發現不對勁。',
        fill: { options: ['他不停解釋自己沒偷吃，結果＿＿＿＿，大家更懷疑他。', '他做錯事馬上承認，一點也不＿＿＿＿。'], clue: '提示：哪一句是越想遮掩越明顯？', explain: '兩句意思相反。第一句用得對：越解釋越被懷疑。馬上承認，就不是欲蓋彌彰。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-鼎', char: '鼎', wrong: '頂', sentence: '這個古代的銅鼎有三隻腳。', options: ['鼎', '頂', '丁'], clue: '這裡說的是古代三隻腳的大鍋，想一想，哪一個字像那個大鍋？', explain: '要改成「鼎」。古代三隻腳的大鍋是「鼎」；「頂」是屋頂的頂。' },
      { id: 'fx-颳', char: '颳', wrong: '刮', sentence: '颱風天，外面颳著大風。', options: ['颳', '刮', '括'], clue: '這裡是說風很大的吹，想一想，哪一個字的左邊是「風」？', explain: '要改成「颳」。風吹是「颳」；「刮」是刮鬍子的刮。' },
      { id: 'fx-廚', char: '廚', wrong: '櫥', sentence: '這家餐廳的廚師手藝很好。', options: ['廚', '櫥', '樹'], clue: '這裡說的是專門做菜的人，想一想，哪一個字外面是「广」、左邊沒有木字旁？', explain: '要改成「廚」。做菜的人是「廚師」；「櫥」是櫥櫃的櫥。' },
      { id: 'fx-淋', char: '淋', wrong: '林', sentence: '小狗在雨中淋得全身溼答答。', options: ['淋', '林', '琳'], clue: '這裡是說被雨澆溼，想一想，哪一個字有三點水？', explain: '要改成「淋」。被雨澆溼是「淋」；「林」是森林的林。' },
      { id: 'fx-晒', char: '晒', wrong: '酒', sentence: '阿嬤把蘿蔔切片拿去晒乾。', options: ['晒', '酒', '西'], clue: '這裡是說放在太陽下讓水分不見，想一想，哪一個字有日字旁？', explain: '要改成「晒」。讓太陽照乾是「晒乾」；「酒」是喝酒的酒。' },
      { id: 'fx-筍', char: '筍', wrong: '詢', sentence: '媽媽煮了一鍋竹筍湯。', options: ['筍', '詢', '旬'], clue: '這裡說的是竹子的嫩芽，想一想，哪一個字有竹字頭？', explain: '要改成「筍」。竹子的嫩芽是「竹筍」；「詢」是詢問的詢。' },
      { id: 'fx-醃', char: '醃', wrong: '淹', sentence: '冰箱裡有一罐醃好的小黃瓜。', options: ['醃', '淹', '掩'], clue: '這裡是說用鹽泡著讓食物入味，想一想，哪一個字的左邊是「酉」？', explain: '要改成「醃」。用鹽泡著是「醃」；「淹」是淹水的淹。' },
      { id: 'fx-攪', char: '攪', wrong: '覺', sentence: '請把湯攪拌均勻再喝。', options: ['攪', '覺', '擾'], clue: '這裡是說轉圈圈讓東西混在一起，想一想，哪一個字有提手旁？', explain: '要改成「攪」。轉圈混合是「攪拌」；「覺」是睡覺的覺。' },
      { id: 'fx-炸', char: '炸', wrong: '昨', sentence: '夜市的炸雞排好香。', options: ['炸', '昨', '作'], clue: '這裡是說用熱油煮熟，想一想，哪一個字有火字旁？', explain: '要改成「炸」。用熱油煮熟是「炸」；「昨」是昨天的昨。' },
      { id: 'fx-瑩', char: '瑩', wrong: '螢', sentence: '水晶球看起來晶瑩剔透。', options: ['瑩', '螢', '營'], clue: '這裡是說光亮透明，想一想，哪一個字的下面是「玉」？', explain: '要改成「瑩」。光亮透明是「晶瑩」；「螢」是螢火蟲的螢。' },
      { id: 'fx-饗', char: '饗', wrong: '響', sentence: '這場演出是一場視覺的饗宴。', options: ['饗', '響', '鄉'], clue: '這裡說的是豐盛的宴會，想一想，哪一個字的下面是「食」？', explain: '要改成「饗」。豐盛的宴會是「饗宴」；「響」是響亮的響。' },
      { id: 'fx-宴', char: '宴', wrong: '安', sentence: '爺爺八十歲生日，家裡辦了壽宴。', options: ['宴', '安', '晏'], clue: '這裡說的是請客吃飯的聚會，想一想，哪一個字寶蓋頭下面是「妟」？', explain: '要改成「宴」。請客吃飯是「宴」；「安」是平安的安。' },
      { id: 'fx-彰', char: '彰', wrong: '章', sentence: '我們全家去彰化看大佛。', options: ['彰', '章', '樟'], clue: '這裡說的是臺灣中部的一個縣，想一想，哪一個字的右邊是「彡」？', explain: '要改成「彰」。中部的縣是「彰化」；「章」是文章的章。' },
      { id: 'fx-煮', char: '煮', wrong: '者', sentence: '水煮開了，可以下麵了。', options: ['煮', '者', '著'], clue: '這裡是說用火加熱，想一想，哪一個字的下面是四點火？', explain: '要改成「煮」。用火加熱是「煮」；「者」是記者的者。' },
      { id: 'fx-豬', char: '豬', wrong: '諸', sentence: '農場裡的豬在泥巴裡打滾。', options: ['豬', '諸', '煮'], clue: '這裡說的是一種圓圓胖胖的家畜，想一想，哪一個字的左邊是「豕」？', explain: '要改成「豬」。圓胖的家畜是「豬」；「諸」是諸位的諸。' }
    ],
    similar: [
      { id: 's1', meaning: '「屋＿」是房子最上面的地方。', sentence: '小鳥站在屋＿上唱歌。', frame: '屋＿', options: ['頂', '鼎'], answer: '頂', clue: '提示：這個字的右邊是「頁」。', explain: '答案是「頂」；「鼎」是古代的大鍋。' },
      { id: 's2', meaning: '「＿鬍子」是用刀把鬍子弄掉。', sentence: '爸爸每天早上＿鬍子。', frame: '＿鬍', options: ['刮', '颳'], answer: '刮', clue: '提示：要用刀子，右邊是立刀旁。', explain: '答案是「刮」；「颳」是颳風的颳。' },
      { id: 's3', meaning: '「＿木」是長在土裡、有枝幹的植物。', sentence: '公園裡種了很多＿木。', frame: '＿木', options: ['樹', '廚'], answer: '樹', clue: '提示：這個字的左邊是木字旁。', explain: '答案是「樹」；「廚」是廚房的廚。' },
      { id: 's4', meaning: '「森＿」是長滿大樹的地方。', sentence: '我們走進森＿裡探險。', frame: '森＿', options: ['林', '淋'], answer: '林', clue: '提示：這個字沒有三點水。', explain: '答案是「林」；「淋」是淋雨的淋。' },
      { id: 's5', meaning: '「東＿」是可以拿在手上的物品。', sentence: '我的書包裡有很多東＿。', frame: '東＿', options: ['西', '晒'], answer: '西', clue: '提示：這個字沒有日字旁。', explain: '答案是「西」；「晒」是晒太陽的晒。' },
      { id: 's6', meaning: '「＿問」是開口問別人問題。', sentence: '不懂的地方可以＿問老師。', frame: '＿問', options: ['詢', '筍'], answer: '詢', clue: '提示：和說話有關，左邊是言字旁。', explain: '答案是「詢」；「筍」是竹筍的筍。' },
      { id: 's7', meaning: '「＿水」是大水漫進房子或路上。', sentence: '大雨讓地下室＿水了。', frame: '＿水', options: ['淹', '醃'], answer: '淹', clue: '提示：和水有關，左邊是三點水。', explain: '答案是「淹」；「醃」是醃菜的醃。' },
      { id: 's8', meaning: '「睡＿」是閉上眼睛休息。', sentence: '晚上九點我就上床睡＿。', frame: '睡＿', options: ['覺', '攪'], answer: '覺', clue: '提示：這個字沒有提手旁。', explain: '答案是「覺」；「攪」是攪拌的攪。' },
      { id: 's9', meaning: '「＿天」是今天的前一天。', sentence: '＿天我去爺爺家玩。', frame: '＿天', options: ['昨', '炸'], answer: '昨', clue: '提示：和日子有關，左邊是日字旁。', explain: '答案是「昨」；「炸」是炸雞的炸。' },
      { id: 's10', meaning: '「＿火蟲」是晚上尾巴會發光的小蟲。', sentence: '草叢裡有好多＿火蟲在飛。', frame: '＿火', options: ['螢', '瑩'], answer: '螢', clue: '提示：這是一種蟲，下面是「虫」。', explain: '答案是「螢」；「瑩」是晶瑩的瑩。' },
      { id: 's11', meaning: '「聲＿」是聽到的聲音。', sentence: '遠方傳來打雷的聲＿。', frame: '聲＿', options: ['響', '饗'], answer: '響', clue: '提示：和聲音有關，下面是「音」。', explain: '答案是「響」；「饗」是饗宴的饗。' },
      { id: 's12', meaning: '「文＿」是寫好的一篇文字。', sentence: '我寫了一篇文＿介紹我的家。', frame: '文＿', options: ['章', '彰'], answer: '章', clue: '提示：這個字沒有「彡」。', explain: '答案是「章」；「彰」是表彰的彰。' }
    ],
    listen: [
      { id: 'l1', text: '天色剛暗，城市亮起點點光芒。', answer: 0, options: [{ text: '華燈初上', img: 'night-lights.png' }, { text: '人來人往', img: 'busy-station.png' }, { text: '街頭巷尾', img: 'lantern-street.png' }, { text: '晶瑩', img: 'dewdrop.png' }] },
      { id: 'l2', text: '車站裡走過的行人好多，好熱鬧。', answer: 0, options: [{ text: '人來人往', img: 'busy-station.png' }, { text: '華燈初上', img: 'night-lights.png' }, { text: '饗宴', img: 'banquet.png' }, { text: '颳風', img: 'windy-day.png' }] },
      { id: 'l3', text: '把麵粉和蛋用打蛋器轉圈圈，混在一起。', answer: 0, options: [{ text: '攪拌', img: 'stir-pot.png' }, { text: '醃製', img: 'pickles.png' }, { text: '油炸', img: 'fried-chicken.png' }, { text: '晒乾', img: 'sun-dry.png' }] },
      { id: 'l4', text: '早上葉子上的露珠，亮亮的、透明的。', answer: 0, options: [{ text: '晶瑩', img: 'dewdrop.png' }, { text: '饗宴', img: 'banquet.png' }, { text: '颳風', img: 'windy-day.png' }, { text: '淋溼', img: 'rain-wet.png' }] },
      { id: 'l5', text: '外婆用鹽把蘿蔔泡起來，讓它入味。', answer: 0, options: [{ text: '醃製', img: 'pickles.png' }, { text: '攪拌', img: 'stir-pot.png' }, { text: '切丁', img: 'diced-carrot.png' }, { text: '煮熟', img: 'cook-rice.png' }] },
      { id: 'l6', text: '過年時，大街小巷的每個角落都掛滿燈籠。', answer: 0, options: [{ text: '街頭巷尾', img: 'lantern-street.png' }, { text: '人來人往', img: 'busy-station.png' }, { text: '華燈初上', img: 'night-lights.png' }, { text: '彰化', img: 'taiwan-map.png' }] },
      { id: 'l7', text: '國王請大家來吃一場很豐盛的晚餐。', answer: 0, options: [{ text: '饗宴', img: 'banquet.png' }, { text: '晶瑩', img: 'dewdrop.png' }, { text: '廚師', img: 'chef.png' }, { text: '鼎邊趖', img: 'rice-noodle-soup.png' }] },
      { id: 'l8', text: '忘了帶傘，全身都被雨打溼了。', answer: 0, options: [{ text: '淋溼', img: 'rain-wet.png' }, { text: '晒乾', img: 'sun-dry.png' }, { text: '颳風', img: 'windy-day.png' }, { text: '攪拌', img: 'stir-pot.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '做什麼遍', answer: '怎麼樣', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看做遍了什麼樣的東西。',
      /* 短語：（動詞）遍＋形容詞＋的＋名詞（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '吃遍美味的小吃', img: 'night-market.png',
        parts: [{ text: '吃遍', role: '做什麼遍' }, { text: '美味', role: '怎麼樣' }, { text: '的' }, { text: '小吃', role: '什麼東西' }],
        explain: '先說做什麼，加上「遍」表示全部都做過，再說出東西的樣子，加上「的」，最後說是什麼東西。' },
      pick: [
        { id: 'ph1', img: 'pr-mountains.png', before: '爬遍', noun: '高山', ask: '爬遍什麼樣的高山', look: '再看看圖片，這些山高不高、陡不陡？', options: ['險峻', '平坦', '矮小', '柔軟'], clue: '提示：山壁又高又陡，要很小心才能上去。', explain: '答案是「險峻」，完整的短語是「爬遍險峻的高山」。' },
        { id: 'ph2', img: 'pr-world-map.png', before: '走遍', noun: '城市', ask: '走遍什麼樣的城市', look: '再看看圖片，這些城市熱不熱鬧？', options: ['熱鬧', '冷清', '安靜', '荒涼'], clue: '提示：街上人山人海，到處都是商店。', explain: '答案是「熱鬧」，完整的短語是「走遍熱鬧的城市」。' },
        { id: 'ph3', img: 'pr-library.png', before: '讀遍', noun: '故事書', ask: '讀遍什麼樣的故事書', look: '再看看圖片，讀的人表情怎麼樣？', options: ['有趣', '無聊', '破舊', '模糊'], clue: '提示：他一邊讀一邊哈哈大笑。', explain: '答案是「有趣」，完整的短語是「讀遍有趣的故事書」。' },
        { id: 'ph4', img: 'pr-flower-field.png', before: '看遍', noun: '花海', ask: '看遍什麼樣的花海', look: '再看看圖片，花有幾種顏色？', options: ['繽紛', '枯黃', '灰暗', '單調'], clue: '提示：紅黃紫白，什麼顏色都有。', explain: '答案是「繽紛」，完整的短語是「看遍繽紛的花海」。' },
        { id: 'ph5', img: 'pr-songs.png', before: '聽遍', noun: '歌曲', ask: '聽遍什麼樣的歌曲', look: '再看看圖片，聽歌的人開不開心？', options: ['動聽', '刺耳', '吵鬧', '沙啞'], clue: '提示：每一首都很悅耳，讓人想跟著唱。', explain: '答案是「動聽」，完整的短語是「聽遍動聽的歌曲」。' },
        { id: 'ph6', img: 'pr-beaches.png', before: '玩遍', noun: '海灘', ask: '玩遍什麼樣的海灘', look: '再看看圖片，海灘上的沙子和海水怎麼樣？', options: ['美麗', '骯髒', '危險', '吵鬧'], clue: '提示：白白的沙、藍藍的海，好像一幅畫。', explain: '答案是「美麗」，完整的短語是「玩遍美麗的海灘」。' },
        { id: 'ph7', img: 'pr-fruits.png', before: '嚐遍', noun: '水果', ask: '嚐遍什麼樣的水果', look: '再看看圖片，水果看起來怎麼樣？', options: ['香甜', '苦澀', '腐爛', '乾癟'], clue: '提示：咬一口，汁多又可口。', explain: '答案是「香甜」，完整的短語是「嚐遍香甜的水果」。' },
        { id: 'ph8', img: 'pr-old-streets.png', before: '逛遍', noun: '老街', ask: '逛遍什麼樣的老街', look: '再看看圖片，老街的房子新不新？', options: ['古色古香', '冷冰冰', '亂七八糟', '空蕩蕩'], clue: '提示：紅磚房子和老招牌，很有以前的味道。', explain: '答案是「古色古香」，完整的短語是「逛遍古色古香的老街」。' }
      ],
      say: [],
      words: [
        { word: '華燈初上', meaning: '天色剛暗，城市亮起點點光芒。', img: 'night-lights.png' },
        { word: '人來人往', meaning: '街上走動的群眾非常多。', img: 'busy-station.png' },
        { word: '街頭巷尾', meaning: '城鎮裡每一條路、每一個角落。', img: 'lantern-street.png' },
        { word: '饗宴', meaning: '招待客人的豐盛餐會。', img: 'banquet.png' }
      ],
      choose: [
        { id: 'pw1', word: '華燈初上', options: ['華燈初上，夜市裡飄來陣陣香味。', '華燈初上，太陽剛從東邊升起。'], clue: '提示：想一想，「華燈初上」是天剛黑，還是天剛亮？', explain: '第一句用得對：天剛黑，夜市開始熱鬧。太陽升起是早上。' },
        { id: 'pw2', word: '人來人往', options: ['百貨公司週年慶，裡面人來人往。', '深夜的公園人來人往，一個人都沒有。'], clue: '提示：想一想，「人來人往」是人很多，還是沒有人？', explain: '第一句用得對：週年慶人很多。一個人都沒有，剛好相反。' },
        { id: 'pw3', word: '街頭巷尾', options: ['冠軍隊回來了，街頭巷尾都在討論。', '他只在自己的房間裡，走遍了街頭巷尾。'], clue: '提示：想一想，「街頭巷尾」是城鎮每個角落，還是一個房間？', explain: '第一句用得對：城鎮各處都在討論。自己的房間不是街頭巷尾。' },
        { id: 'pw4', word: '饗宴', options: ['這場煙火秀是一場視覺的饗宴。', '他一個人吃泡麵，真是一場饗宴。'], clue: '提示：想一想，「饗宴」是豐盛的，還是簡單的？', explain: '第一句用得對：煙火秀很豐富精采。一個人吃泡麵太簡單了。' }
      ],
      make: [
        { id: 'pm1', word: '華燈初上', clue: '提示：想想看，天剛黑的時候，你看到什麼景色？', model: '華燈初上，河邊的燈光倒映在水面上，好美。' },
        { id: 'pm2', word: '人來人往', clue: '提示：想想看，哪裡常常有很多人走來走去？', model: '週末的夜市人來人往，熱鬧極了。' },
        { id: 'pm3', word: '街頭巷尾', clue: '提示：想想看，什麼時候到處都很熱鬧？', model: '中秋節晚上，街頭巷尾都飄著烤肉香。' },
        { id: 'pm4', word: '饗宴', clue: '提示：想想看，什麼活動讓你覺得很豐富精采？', model: '這場音樂會是一場耳朵的饗宴。' }
      ]
    },
    pattern: [
      { key: 'xianjiezhe', id: 'xj', title: '先……接著……最後……', img: 'xianjiezhe.png',
        meaning: '用「先」、「接著」、「最後」，按照順序說出三個步驟。',
        examples: ['做蛋餅要先打蛋，接著把餅皮煎熟，最後捲起來切好。'],
        match: [
          { id: 'pt-xj-m1', img: 'pt-make-tea.png', front: '泡茶時，先燒開水，接著把茶葉放進壺裡，', options: ['最後倒入熱水。', '最後去燒開水。', '最後把茶葉丟掉。'], clue: '提示：看看圖片，茶葉放好以後要做什麼？', explain: '答案是「最後倒入熱水」：三個步驟按照順序。' },
          { id: 'pt-xj-m2', img: 'pt-plant-seed.png', front: '種花時，先把土挖鬆，接著放進種子，', options: ['最後蓋上土並澆水。', '最後把土挖鬆。', '最後把種子拿出來。'], clue: '提示：看看圖片，種子放好以後要做什麼？', explain: '答案是「最後蓋上土並澆水」：三個步驟按照順序。' },
          { id: 'pt-xj-m3', img: 'pt-wash-clothes.png', front: '洗衣服時，先把衣服泡水，接著放洗衣粉搓一搓，', options: ['最後用清水沖乾淨。', '最後把衣服泡水。', '最後把衣服弄髒。'], clue: '提示：看看圖片，搓完衣服還要做什麼？', explain: '答案是「最後用清水沖乾淨」：三個步驟按照順序。' }
        ],
        conj: [
          { id: 'pt-xj-c1', full: '我們先洗米，接著放進電鍋，最後按下開關。', img: 'pt-cook-rice.png', sentence: '我們＿洗米，＿＿放進電鍋，＿＿按下開關。', options: ['先……接著……最後……', '不是……而是……', '不僅……而且……'], clue: '提示：三個步驟有先後順序。數數看有幾個空格。', explain: '答案是「先……接著……最後……」：我們先洗米，接著放進電鍋，最後按下開關。' },
          { id: 'pt-xj-c2', full: '畫圖時先打草稿，接著描上黑線，最後塗上顏色。', img: 'pt-draw-steps.png', sentence: '畫圖時＿打草稿，＿＿描上黑線，＿＿塗上顏色。', options: ['先……接著……最後……', '不是……而是……', '不僅……而且……'], clue: '提示：畫圖有三個步驟。數數看有幾個空格。', explain: '答案是「先……接著……最後……」：畫圖時先打草稿，接著描上黑線，最後塗上顏色。' }
        ],
        half: [
          { id: 'pt-xj-h1', front: '早上起床，我先刷牙洗臉，接著換好制服，', clue: '提示：換好制服以後，最後做什麼？記得要說「最後」。', model: '最後背起書包去上學。' },
          { id: 'pt-xj-h2', front: '做三明治時，先把麵包放好，接著夾上火腿和蛋，', clue: '提示：夾好料以後，最後做什麼？記得要說「最後」。', model: '最後把麵包切成兩半。' }
        ],
        whole: [
          { id: 'pt-xj-w1', clue: '提示：用「先」、「接著」、「最後」說出三個步驟。想想看：你會做什麼事，可以分成三個步驟？', model: '包水餃時，我先把餡料放在皮上，接著把邊捏緊，最後放進鍋裡煮。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'sense', name: '摹寫', meaning: '把看到、聽到、聞到、吃到、摸到的感覺，仔細的寫出來，讓人好像也感受到。', example: '詩裡寫白白的米漿沿著熱鍋慢慢滑下，把看到的顏色和動作寫得好清楚。',
          show: { sentence: '金黃色的炸雞，咬下去喀滋喀滋響。', mark: ['金黃色', '喀滋喀滋'] },
          yesno: [
            { id: 'rh-se-y1', sentence: '熱騰騰的湯麵，飄出濃濃的香味。', answer: true, mark: ['濃濃的香味'], clue: '提示：這句話有沒有寫出聞到的味道？', explain: '是摹寫：寫出聞到的香味。' },
            { id: 'rh-se-y2', sentence: '我吃了一碗麵。', answer: false, clue: '提示：這句話有沒有寫出看到、聞到、吃到的感覺？', explain: '不是摹寫：這句話只是說吃了麵。' }
          ],
          pick: [
            { id: 'rh-se-p1', mark: ['雪白'], options: ['雪白的米漿流進熱鍋裡。', '他把米漿倒進鍋裡。'], clue: '提示：哪一句寫出了看到的顏色？', explain: '「雪白的米漿」是摹寫：寫出看到的顏色。' },
            { id: 'rh-se-p2', mark: ['滋滋作響'], options: ['油鍋裡的肉滋滋作響。', '他在炸肉。'], clue: '提示：哪一句寫出了聽到的聲音？', explain: '「滋滋作響」是摹寫：寫出聽到的聲音。' },
            { id: 'rh-se-p3', mark: ['又Q又彈'], options: ['肉圓的外皮咬起來又Q又彈。', '我吃了肉圓。', '肉圓很便宜。'], clue: '提示：哪一句寫出了吃到的口感？', explain: '「又Q又彈」是摹寫：寫出吃到的感覺。' },
            { id: 'rh-se-p4', mark: ['燙燙的'], options: ['剛出爐的地瓜摸起來燙燙的。', '這是一顆地瓜。', '地瓜是黃色的。'], clue: '提示：哪一句寫出了摸到的感覺？', explain: '「燙燙的」是摹寫：寫出摸到的感覺。' },
            { id: 'rh-se-p5', mark: ['陣陣蒜香'], options: ['廚房裡飄出陣陣蒜香。', '母親在煮菜。', '晚餐快好了。', '鍋子像一艘船。'], clue: '提示：哪一句寫出了聞到的味道？', explain: '「陣陣蒜香」是摹寫：寫出聞到的味道。' },
            { id: 'rh-se-p6', mark: ['酸酸甜甜'], options: ['這杯檸檬汁喝起來酸酸甜甜。', '我買了檸檬汁。', '這杯很大。', '我在夜市。'], clue: '提示：哪一句寫出了喝到的味道？', explain: '「酸酸甜甜」是摹寫：寫出喝到的味道。' }
          ] },
        { key: 'personify', name: '擬人', meaning: '把東西或動物當成人來寫，讓它們會說話、會笑、會做人做的事。', example: '詩裡說小吃在街頭招呼客人、在店鋪微笑，好像小吃是熱情的人。',
          show: { sentence: '熱湯在碗裡向我招手。', mark: ['向我招手'] },
          yesno: [
            { id: 'rh-pe-y1', sentence: '香噴噴的麵包在櫥窗裡對我微笑。', answer: true, mark: ['對我微笑'], clue: '提示：這句話有沒有把麵包寫得像人一樣？', explain: '是擬人：麵包像人一樣會微笑。' },
            { id: 'rh-pe-y2', sentence: '櫥窗裡有麵包。', answer: false, clue: '提示：這句話裡的麵包，有沒有做人做的事？', explain: '不是擬人：這句話只是說有麵包。' }
          ],
          pick: [
            { id: 'rh-pe-p1', mark: ['跳起舞來'], options: ['鍋裡的水餃跳起舞來。', '鍋裡在煮水餃。'], clue: '提示：哪一句的水餃像人一樣會跳舞？', explain: '「水餃跳起舞來」是擬人。' },
            { id: 'rh-pe-p2', mark: ['邀請'], options: ['夜市的香味邀請大家快來吃。', '夜市有很多香味。'], clue: '提示：哪一句的香味像人一樣會邀請？', explain: '「香味邀請大家」是擬人。' },
            { id: 'rh-pe-p3', mark: ['害羞的'], options: ['草莓害羞的紅了臉。', '草莓是紅色的。', '草莓很甜。'], clue: '提示：哪一句的草莓像人一樣會害羞？', explain: '「草莓害羞的紅了臉」是擬人。' },
            { id: 'rh-pe-p4', mark: ['偷偷溜走'], options: ['盤子裡的雞腿偷偷溜走了。', '雞腿被吃掉了。', '盤子空了。'], clue: '提示：哪一句的雞腿像人一樣會溜走？', explain: '「雞腿偷偷溜走」是擬人。' },
            { id: 'rh-pe-p5', mark: ['唱著歌'], options: ['湯鍋咕嚕咕嚕的唱著歌。', '湯滾了。', '火很大。', '湯像一片海。'], clue: '提示：哪一句的湯鍋像人一樣會唱歌？', explain: '「湯鍋唱著歌」是擬人。' },
            { id: 'rh-pe-p6', mark: ['抱在一起'], options: ['米粒和肉燥緊緊的抱在一起。', '飯上有肉燥。', '這碗飯很香。', '我吃了一大碗。'], clue: '提示：哪一句的米粒像人一樣會擁抱？', explain: '「米粒和肉燥抱在一起」是擬人。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '烤玉米散發出焦焦香香的味道。', answer: '摹寫', mark: ['焦焦香香'], clue: '提示：這句話有沒有寫出聞到的味道？', explain: '答案是「摹寫」：寫出聞到的香味。' },
        { id: 'rh2', sentence: '雨滴打在鐵皮屋頂上，叮叮咚咚響。', answer: '摹寫', mark: ['叮叮咚咚'], clue: '提示：這句話有沒有寫出聽到的聲音？', explain: '答案是「摹寫」：寫出聽到的聲音。' },
        { id: 'rh3', sentence: '冰淇淋在太陽下哭得滿臉是淚。', answer: '擬人', mark: ['哭得滿臉是淚'], clue: '提示：冰淇淋會不會像人一樣哭？', explain: '答案是「擬人」：冰淇淋像人一樣會哭。' },
        { id: 'rh4', sentence: '小籠包熱情的向客人打招呼。', answer: '擬人', mark: ['熱情的向客人打招呼'], clue: '提示：這句話有沒有把小籠包寫得像人？', explain: '答案是「擬人」：小籠包像人一樣會打招呼。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L04 = d; }
})(this);
