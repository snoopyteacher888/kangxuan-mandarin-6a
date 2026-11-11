/* 第 8 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'extract', qe: 'infer', qf: 'infer', qg: 'interpret', qh: 'interpret',
      qi: 'evaluate', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qg: { think: ['動物們看到的，是走在前面的狐狸，還是後面的老虎？', '老虎為什麼沒有發現真相？'], why: '動物們怕的其實是老虎，老虎卻以為大家怕狐狸。故事提醒我們：看事情不能只看表面，要多想一想，才不會被騙。' },
      qh: { think: ['大臣講這個故事，是想讓國王明白什麼？', '北方各國真正怕的是將軍，還是國王的力量？'], why: '大臣用故事打比方：將軍就像狐狸，國王的軍隊就像老虎。北方各國怕的其實是國王強大的武力，不是將軍本人。' },
      qi: { think: ['狐狸說謊是為了欺負別人，還是為了活命？', '你覺得狐狸是壞，還是聰明？'], why: '可以說狐狸靠說謊嚇人，是借別人的威風；也可以說牠在危險中想出辦法救自己。從不同角度看，評價就會不同，說出理由就可以。' },
      qj: { think: ['生活中有沒有人借別人的名氣或力量欺負人？', '你會怎麼提醒他？'], why: '例如有人說「我哥哥很厲害，你要聽我的」，就是借別人的威風。可以提醒他：靠自己的本事才會真正讓人佩服。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['我會先觀察，看看動物們到底在怕誰。', '我會叫狐狸自己一個人走一次給我看。'], bad: ['狐狸說什麼我都相信。', '我什麼都不想，直接走開。'], why: '題目問的是如果你是老虎，會怎麼做。先觀察、想辦法驗證，就不會被騙。什麼都相信、不思考，就容易上當。' },
      k2: { good: ['我會提醒他，靠自己的本事才會被尊重。', '我會告訴老師，請老師幫忙。'], bad: ['我也學他，借別人的力量欺負人。', '我假裝沒看到，讓他繼續欺負別人。'], why: '題目問的是看到有人借別人的威風欺負人，你會怎麼做。勸他、找大人幫忙，都是好方法。學他或不理，問題都不會解決。' }
    },
    hanzi: [
      { id: 'h-策', combo: { layout: 'tb', parts: [['竹', 'm', '竹子'], ['朿', 's', '']] }, char: '策', zhuyin: 'ㄘㄜˋ', radical: '竹', strokes: 12, words: ['戰國策', '政策'], say: '策，政策的策', cloze: '政＿', img: 'bamboo-scroll.png', options: ['策', '刺', '束', '棘'], clue: '這個字的上面是竹字頭。', explain: '答案是「策」，上面是竹字頭；「刺」的右邊是立刀旁，「束」沒有竹字頭。', parts: ['竹', '朿'], story: '上面是竹子，下面的「朿」念起來有點像「策」。古時候用竹片寫字、出主意，就是「策」；國家定的辦法叫「政策」。', sentence: '政府推出新的環保政策。', build: { layout: 'tb', show: ['？', '朿'], answer: '竹', options: ['竹', '艹', '雨', '木'], clue: '想一想：古時候寫字的細長片子，是什麼植物做的？' } },
      { id: 'h-劉', combo: { type: '形聲字', pict: '左上是「卯」，左下是「金」，右邊是立刀。古時候是一種兵器的名字，後來常用作姓。' }, char: '劉', zhuyin: 'ㄌㄧㄡˊ', radical: '刀', strokes: 15, words: ['劉向', '劉海'], say: '劉，劉海的劉', cloze: '＿海', img: 'bangs-hair.png', options: ['劉', '瀏', '柳', '留'], clue: '這個字的右邊是立刀旁，左下有「金」。', explain: '答案是「劉」；「瀏」的左邊是三點水，「柳」的左邊是木字旁。', parts: ['卯', '金', '刂'], story: '左邊上面是「卯」、下面是「金」，右邊是刀。原本是兵器，後來常當作姓；額頭前的短頭髮叫「劉海」。', sentence: '妹妹剪了整齊的劉海。' },
      { id: 'h-纂', combo: { type: '形聲字', pict: '上面是竹字頭，中間是「目」和「大」，下面是「糸」。把竹片上的文字整理好，用繩子串起來，就是「纂」。' }, char: '纂', zhuyin: 'ㄗㄨㄢˇ', radical: '糸', strokes: 20, words: ['編纂', '纂修'], say: '纂，編纂的纂', cloze: '編＿', img: 'edit-book.png', options: ['纂', '篡', '算', '纂修'], clue: '這個字的下面是「糸」。', explain: '答案是「纂」，下面是「糸」；「篡」的下面是「厶」，「算」的下面是「廾」。', parts: ['竹', '目', '大', '糸'], story: '上面是竹子，下面是絲線。把寫在竹片上的資料整理好，用線串成一本書，就是「編纂」。', sentence: '這本字典由很多學者一起編纂。' },
      { id: 'h-寓', combo: { layout: 'tb', parts: [['宀', 'm', '房子'], ['禺', 's', '']] }, char: '寓', zhuyin: 'ㄩˋ', radical: '宀', strokes: 12, words: ['寓言', '公寓'], say: '寓，公寓的寓', cloze: '公＿', img: 'apartment.png', options: ['寓', '遇', '隅', '偶'], clue: '這個字的上面是寶蓋頭。', explain: '答案是「寓」，上面是寶蓋頭；「遇」有辵字旁，「偶」的左邊是單人旁。', parts: ['宀', '禺'], story: '上面是房子，下面的「禺」念起來像「寓」。住在房子裡，就是「寓」；把道理住進故事裡，叫「寓言」。', sentence: '我家住在一棟十層樓的公寓。', build: { layout: 'tb', show: ['？', '禺'], answer: '宀', options: ['宀', '辶', '亻', '阝'], clue: '想一想：住的地方，上面放哪一個？' } },
      { id: 'h-鷸', combo: { type: '形聲字', pict: '左邊的「矞」念起來像「鷸」，右邊是「鳥」。一種嘴巴長長、住在水邊的鳥，就是「鷸」。' }, char: '鷸', zhuyin: 'ㄩˋ', radical: '鳥', strokes: 23, words: ['鷸蚌相爭', '鷸鳥'], say: '鷸，鷸鳥的鷸', cloze: '＿鳥', img: 'snipe-bird.png', options: ['鷸', '鷗', '鷹', '橘'], clue: '這個字的右邊是「鳥」，左邊是「矞」。', explain: '答案是「鷸」；「鷗」的左邊是「區」，「橘」的左邊是木字旁。', parts: ['矞', '鳥'], story: '左邊念起來像「鷸」，右邊是鳥。嘴巴長長、在水邊找東西吃的鳥，就是「鷸」。', sentence: '河邊有一隻鷸鳥在找小魚。' },
      { id: 'h-蚌', combo: { layout: 'lr', parts: [['虫', 'm', '小動物'], ['丰', 's', '']] }, char: '蚌', zhuyin: 'ㄅㄤˋ', radical: '虫', strokes: 10, words: ['鷸蚌相爭', '河蚌'], say: '蚌，河蚌的蚌', cloze: '河＿', img: 'clam.png', options: ['蚌', '棒', '邦', '蜂'], clue: '這個字的左邊是虫字旁。', explain: '答案是「蚌」，左邊是虫字旁；「棒」的左邊是木字旁，「蜂」的右邊是「夆」。', parts: ['虫', '丰'], story: '左邊是虫，表示小動物；右邊的「丰」念起來有點像「蚌」。住在水裡、有兩片殼的動物，就是「蚌」。', sentence: '河蚌張開殼在晒太陽。', build: { layout: 'lr', show: ['？', '丰'], answer: '虫', options: ['虫', '木', '扌', '阝'], clue: '想一想：有殼的小動物，左邊放哪一個？' } },
      { id: 'h-述', combo: { type: '形聲字', pict: '外面的「辶」和走路有關，裡面的「朮」念起來像「述」。照著前人走過的路說下去，就是「述」。' }, char: '述', zhuyin: 'ㄕㄨˋ', radical: '辵', strokes: 9, words: ['記述', '敘述'], say: '述，敘述的述', cloze: '敘＿', img: 'storyteller.png', options: ['述', '術', '迷', '逑'], clue: '這個字有辵字旁，裡面是「朮」。', explain: '答案是「述」；「術」的外面是「行」，「迷」的裡面是「米」。', parts: ['辶', '朮'], story: '外面是辵字旁，裡面念起來像「述」。把事情一件一件說出來，就是「敘述」。', sentence: '請你敘述一下事情的經過。' },
      { id: 'h-赫', combo: { type: '會意字', pict: '兩個「赤」並排，「赤」是火紅的顏色。紅通通、亮閃閃，非常顯眼，就是「赫」。' }, char: '赫', zhuyin: 'ㄏㄜˋ', radical: '赤', strokes: 14, words: ['顯赫', '赫赫有名'], say: '赫，顯赫的赫', cloze: '顯＿', img: 'famous-general.png', options: ['赫', '赤', '嚇', '郝'], clue: '這個字是兩個「赤」並排。', explain: '答案是「赫」；「赤」只有一個，「嚇」的左邊是口字旁。', parts: ['赤', '赤'], story: '兩個「赤」並排，紅通通的很顯眼。名聲很大、大家都知道，就是「顯赫」。', sentence: '他是一位赫赫有名的科學家。' },
      { id: 'h-畏', combo: { type: '會意字', pict: '上面像一個鬼怪的頭，下面像拿著東西的手。看到可怕的東西，心裡害怕，就是「畏」。' }, char: '畏', zhuyin: 'ㄨㄟˋ', radical: '田', strokes: 9, words: ['畏懼', '敬畏'], say: '畏，敬畏的畏', cloze: '敬＿', img: 'scared-animals.png', options: ['畏', '喂', '偎', '餵'], clue: '這個字的上面是「田」，左邊沒有偏旁。', explain: '答案是「畏」；「喂」的左邊是口字旁，「餵」的左邊是食字旁。', parts: ['田', '𧘇'], story: '上面像可怕的頭，下面像拿著棍子的手。看到了心裡發抖，就是「畏懼」。', sentence: '大家對大自然要有敬畏的心。' },
      { id: 'h-詢', combo: { layout: 'lr', parts: [['言', 'm', '說話'], ['旬', 's', '']] }, char: '詢', zhuyin: 'ㄒㄩㄣˊ', radical: '言', strokes: 13, words: ['詢問', '查詢'], say: '詢，查詢的詢', cloze: '查＿', img: 'ask-desk.png', options: ['詢', '殉', '旬', '洵'], clue: '這個字的左邊是言字旁。', explain: '答案是「詢」，左邊是言字旁；「殉」的左邊是「歹」，「洵」的左邊是三點水。', parts: ['言', '旬'], story: '左邊是說話，右邊的「旬」念起來像「詢」。開口問別人事情，就是「詢問」。', sentence: '我到櫃臺查詢火車的時間。', build: { layout: 'lr', show: ['？', '旬'], answer: '言', options: ['言', '竹', '歹', '氵'], clue: '想一想：開口問人要用什麼？' } },
      { id: 'h-曰', combo: { type: '指事字', pict: '「曰」像一張嘴巴，上面那一短橫是從嘴裡說出來的話。' }, char: '曰', zhuyin: 'ㄩㄝ', radical: '曰', strokes: 4, words: ['曰', '子曰'], say: '曰，子曰的曰', cloze: '子＿', img: 'old-teacher.png', options: ['曰', '日', '白', '目'], clue: '這個字比「日」扁，裡面的橫沒有碰到右邊。', explain: '答案是「曰」，形狀扁扁的；「日」是長方形，「白」上面多一撇。', parts: ['口', '一'], story: '像一張嘴，上面那一橫是說出來的話。古文裡「曰」就是「說」；「子曰」就是老師說。', sentence: '古書上寫著「子曰」，意思是孔子說。' },
      { id: 'h-吾', combo: { layout: 'tb', parts: [['五', 's', ''], ['口', 'm', '嘴巴']] }, char: '吾', zhuyin: 'ㄨˊ', radical: '口', strokes: 7, words: ['吾', '支吾'], say: '吾，支吾的吾', cloze: '支＿', img: 'stammer-kid.png', options: ['吾', '五', '午', '唔'], clue: '這個字的上面是「五」，下面是「口」。', explain: '答案是「吾」；「五」沒有「口」，「唔」的左邊多了口字旁。', parts: ['五', '口'], story: '上面的「五」念起來像「吾」，下面是口。用嘴巴說「我」，古文就寫作「吾」。', sentence: '他被問到功課，支支吾吾說不出話。', build: { layout: 'tb', show: ['五', '？'], answer: '口', options: ['口', '日', '目', '田'], clue: '想一想：說「我」要用什麼？' } },
      { id: 'h-遂', combo: { type: '形聲字', pict: '外面的「辶」和走路有關，裡面的「㒸」念起來像「遂」。順著路一直走下去，就是「遂」。' }, char: '遂', zhuyin: 'ㄙㄨㄟˋ', radical: '辵', strokes: 13, words: ['遂', '順遂'], say: '遂，順遂的遂', cloze: '順＿', img: 'smooth-road.png', options: ['遂', '逐', '隧', '邃'], clue: '這個字有辵字旁，左邊沒有阜字旁。', explain: '答案是「遂」；「逐」的裡面是「豕」，「隧」的左邊多了阜字旁。', parts: ['辶', '㒸'], story: '外面是走路，裡面念起來像「遂」。事情順順的走下去、都很如意，就是「順遂」。', sentence: '祝你新的一年事事順遂。' },
      { id: 'h-諷', combo: { layout: 'lr', parts: [['言', 'm', '說話'], ['風', 's', '']] }, char: '諷', zhuyin: 'ㄈㄥˋ', radical: '言', strokes: 16, words: ['諷刺', '嘲諷'], say: '諷，嘲諷的諷', cloze: '嘲＿', img: 'sneer.png', options: ['諷', '楓', '瘋', '颯'], clue: '這個字的左邊是言字旁。', explain: '答案是「諷」，左邊是言字旁；「楓」的左邊是木字旁，「瘋」的外面是病字旁。', parts: ['言', '風'], story: '左邊是說話，右邊的「風」念起來像「諷」。說話不直接，像風一樣拐彎去笑別人，就是「諷刺」。', sentence: '這幅漫畫諷刺浪費食物的人。', build: { layout: 'lr', show: ['？', '風'], answer: '言', options: ['言', '木', '疒', '立'], clue: '想一想：拐彎笑人是用什麼方式？' } },
      { id: 'h-蔽', combo: { layout: 'tb', parts: [['艹', 'm', '草'], ['敝', 's', '']] }, char: '蔽', zhuyin: 'ㄅㄧˋ', radical: '艸', strokes: 15, words: ['蒙蔽', '遮蔽'], say: '蔽，遮蔽的蔽', cloze: '遮＿', img: 'leaf-cover.png', options: ['蔽', '敝', '弊', '幣'], clue: '這個字的上面是草字頭。', explain: '答案是「蔽」，上面是草字頭；「弊」的下面是「廾」，「幣」的下面是「巾」。', parts: ['艹', '敝'], story: '上面是草，下面的「敝」念起來像「蔽」。用草擋住，看不到裡面，就是「遮蔽」；被騙了看不清真相，叫「蒙蔽」。', sentence: '大樹的枝葉遮蔽了陽光。', build: { layout: 'tb', show: ['？', '敝'], answer: '艹', options: ['艹', '廾', '巾', '竹'], clue: '想一想：用來擋住東西的植物，上面放哪一個？' } },
      { id: 'h-妨', combo: { layout: 'lr', parts: [['女', 'm', '女子'], ['方', 's', '']] }, char: '妨', zhuyin: 'ㄈㄤˊ', radical: '女', strokes: 7, words: ['不妨', '妨礙'], say: '妨，妨礙的妨', cloze: '＿礙', img: 'block-way.png', options: ['妨', '防', '坊', '芳'], clue: '這個字的左邊是女字旁。', explain: '答案是「妨」，左邊是女字旁；「防」的左邊是阜字旁，「坊」的左邊是土字旁。', parts: ['女', '方'], story: '左邊是女，右邊的「方」念起來像「妨」。擋住別人、讓人做不好事，就是「妨礙」。', sentence: '在走廊奔跑會妨礙別人通行。', build: { layout: 'lr', show: ['？', '方'], answer: '女', options: ['女', '阝', '土', '艹'], clue: '想一想：這個字的左邊，和「好」的左邊一樣。' } },
      { id: 'h-虛', combo: { type: '形聲字', pict: '上面的「虍」念起來有點像「虛」，下面像一個空空的大土丘。裡面空空的，就是「虛」。' }, char: '虛', zhuyin: 'ㄒㄩ', radical: '虍', strokes: 12, words: ['虛張聲勢', '謙虛'], say: '虛，謙虛的虛', cloze: '謙＿', img: 'humble-bow.png', options: ['虛', '虎', '處', '慮'], clue: '這個字的上面是「虍」，下面有「业」。', explain: '答案是「虛」；「虎」的下面是「几」，「慮」的下面是「思」。', parts: ['虍', '业'], story: '上面是「虍」，下面像空空的土丘。裡面空空的，就是「虛」；不驕傲、覺得自己還不夠好，叫「謙虛」。', sentence: '他得了冠軍還是很謙虛。' },
      { id: 'h-誘', combo: { layout: 'lr', parts: [['言', 'm', '說話'], ['秀', 's', '']] }, char: '誘', zhuyin: 'ㄧㄡˋ', radical: '言', strokes: 14, words: ['誘導', '引誘'], say: '誘，引誘的誘', cloze: '引＿', img: 'bait-fish.png', options: ['誘', '透', '秀', '銹'], clue: '這個字的左邊是言字旁。', explain: '答案是「誘」，左邊是言字旁；「透」有辵字旁，「銹」的左邊是金字旁。', parts: ['言', '秀'], story: '左邊是說話，右邊的「秀」念起來有點像「誘」。用話慢慢帶著別人往一個方向走，就是「誘導」。', sentence: '漁夫用魚餌引誘魚兒上鉤。', build: { layout: 'lr', show: ['？', '秀'], answer: '言', options: ['言', '辶', '禾', '金'], clue: '想一想：用話帶著別人走，左邊放哪一個？' } }
    ],
    vocab: [
      { id: 'v-戰國策', cloze: true, clozeOptions: ['戰國策', '西遊記', '三字經', '水滸傳'], word: '戰國策', meaning: '一本古書，記錄很久以前各諸侯的政治大事和言論。', example: '「狐假虎威」的故事出自＿＿＿。', img: 'bamboo-scroll.png', options: ['戰國策', '劉向', '寓言', '編纂'] },
      { id: 'v-劉向', cloze: true, clozeOptions: ['劉向', '李白', '孔子', '杜甫'], word: '劉向', meaning: '西漢的學者，整理過一本記錄諸侯政事的古書。', example: '那本古書是＿＿整理編成的。', img: 'old-scholar.png', options: ['劉向', '戰國策', '寓言', '記述'] },
      { id: 'v-編纂', cloze: true, clozeOptions: ['編纂', '撕破', '丟掉', '燒毀'], word: '編纂', meaning: '收集資料，整理成一本書。', example: '老師們一起＿＿這本鄉土教材。', img: 'edit-book.png', options: ['編纂', '記述', '詢問', '誘導'] },
      { id: 'v-寓言', cloze: true, clozeOptions: ['寓言', '新聞', '食譜', '地圖'], word: '寓言', meaning: '用簡單的小故事，說出一個道理。', example: '〈龜兔賽跑〉是一則有名的＿＿。', img: 'storyteller.png', options: ['寓言', '戰國策', '編纂', '諷刺'] },
      { id: 'v-鷸蚌相爭', cloze: true, clozeOptions: ['鷸蚌相爭', '同心協力', '互相幫忙', '和平共處'], word: '鷸蚌相爭', meaning: '兩方吵個不停，結果兩邊都吃虧，讓別人撿到便宜。', example: '兩隊＿＿＿＿，結果第三隊得了冠軍。', img: 'snipe-clam.png', options: ['鷸蚌相爭', '虛張聲勢', '落荒而逃', '急中生智'] },
      { id: 'v-記述', cloze: true, clozeOptions: ['記述', '忘記', '刪除', '擦掉'], word: '記述', meaning: '把事情寫下來、說出來。', example: '這本日記＿＿了他旅行的點點滴滴。', img: 'storyteller.png', options: ['記述', '編纂', '詢問', '蒙蔽'] },
      { id: 'v-顯赫', cloze: true, clozeOptions: ['顯赫', '平凡', '默默無名', '普通'], word: '顯赫', meaning: '名聲和地位很大，大家都知道。', example: '這位將軍戰功＿＿，人人敬佩。', img: 'famous-general.png', options: ['顯赫', '畏懼', '虛張聲勢', '不妨'] },
      { id: 'v-畏懼', cloze: true, clozeOptions: ['畏懼', '開心', '喜歡', '輕鬆'], word: '畏懼', meaning: '心裡很怕。', example: '面對困難，我們不要＿＿。', img: 'scared-animals.png', options: ['畏懼', '顯赫', '諷刺', '蒙蔽'] },
      { id: 'v-詢問', cloze: true, clozeOptions: ['詢問', '回答', '沉默', '閉嘴'], word: '詢問', meaning: '開口請教、打聽事情。', example: '迷路時，可以向警察＿＿。', img: 'ask-desk.png', options: ['詢問', '記述', '誘導', '編纂'] },
      { id: 'v-曰', cloze: true, clozeOptions: ['曰', '跑', '吃', '睡'], word: '曰', meaning: '古文裡表示「說」。', example: '古書上寫著：「孔子＿……」', img: 'old-teacher.png', options: ['曰', '吾', '遂', '寓言'] },
      { id: 'v-吾', cloze: true, clozeOptions: ['吾', '他', '它', '牠'], word: '吾', meaning: '古文裡表示「我」。', example: '「＿」是古時候說「我」的意思。', img: 'old-scholar.png', options: ['吾', '曰', '遂', '不妨'] },
      { id: 'v-遂', cloze: true, clozeOptions: ['遂', '卻', '但', '而'], word: '遂', meaning: '古文裡表示「就」、「於是」。', example: '大家一再勸說，他＿答應了。', img: 'smooth-road.png', options: ['遂', '曰', '吾', '不妨'] },
      { id: 'v-諷刺', cloze: true, clozeOptions: ['諷刺', '稱讚', '鼓勵', '感謝'], word: '諷刺', meaning: '用拐彎的方式嘲笑或批評別人。', example: '這篇故事在＿＿愛說大話的人。', img: 'sneer.png', options: ['諷刺', '詢問', '記述', '誘導'] },
      { id: 'v-蒙蔽', cloze: true, clozeOptions: ['蒙蔽', '揭穿', '看清', '明白'], word: '蒙蔽', meaning: '騙人，讓人看不清真相。', example: '不要被漂亮的包裝＿＿了。', img: 'leaf-cover.png', options: ['蒙蔽', '諷刺', '畏懼', '顯赫'] },
      { id: 'v-不妨', cloze: true, clozeOptions: ['不妨', '千萬別', '絕不可', '不准'], word: '不妨', meaning: '可以試試看，沒關係。', example: '遇到難題，你＿＿換個方法想想。', img: 'try-idea.png', options: ['不妨', '蒙蔽', '虛張聲勢', '遂'] },
      { id: 'v-虛張聲勢', cloze: true, clozeOptions: ['虛張聲勢', '實力堅強', '默默做事', '低調謙虛'], word: '虛張聲勢', meaning: '故意裝得很厲害來嚇人，其實沒什麼本事。', example: '那隻小狗叫得很大聲，其實只是＿＿＿＿。', img: 'puff-cat.png', options: ['虛張聲勢', '鷸蚌相爭', '急中生智', '落荒而逃'] },
      { id: 'v-誘導', cloze: true, clozeOptions: ['誘導', '逼迫', '強迫', '命令'], word: '誘導', meaning: '用話慢慢帶領別人往某個方向想。', example: '老師用問題＿＿我們找出答案。', img: 'bait-fish.png', options: ['誘導', '詢問', '編纂', '記述'] },
      { id: 'v-落荒而逃', cloze: true, clozeOptions: ['落荒而逃', '勇往直前', '奮戰到底', '站穩腳步'], word: '落荒而逃', meaning: '被嚇到，慌慌張張的跑走。', example: '小偷看到警察，嚇得＿＿＿＿。', img: 'scared-animals.png', options: ['落荒而逃', '虛張聲勢', '急中生智', '作威作福'] },
      { id: 'v-急中生智', cloze: true, clozeOptions: ['急中生智', '手足無措', '一籌莫展', '束手無策'], word: '急中生智', meaning: '情況危險時，突然想出好辦法。', example: '門被鎖住了，他＿＿＿＿，從窗戶爬出去。', img: 'try-idea.png', options: ['急中生智', '落荒而逃', '鷸蚌相爭', '作威作福'] },
      { id: 'v-作威作福', cloze: true, clozeOptions: ['作威作福', '和藹可親', '平易近人', '謙虛有禮'], word: '作威作福', meaning: '仗著自己有權力，欺負別人。', example: '那個惡霸在村子裡＿＿＿＿，大家都很討厭他。', img: 'bully-boss.png', options: ['作威作福', '虛張聲勢', '落荒而逃', '鷸蚌相爭'] }
    ],
    charwords: [
      { id: 'cw-策', char: '策', img: 'bamboo-scroll.png', charMeaning: '辦法、計畫。', word: '政策', meaning: '國家或政府決定的辦法。', example: '新的＿＿鼓勵大家多搭公車。', options: ['政策', '劉海', '公寓', '河蚌'] },
      { id: 'cw-劉', char: '劉', img: 'bangs-hair.png', charMeaning: '一個姓。', word: '劉海', meaning: '垂在額頭前面的短頭髮。', example: '她的＿＿剪得太短了。', options: ['劉海', '敘述', '顯赫', '敬畏'] },
      { id: 'cw-纂', char: '纂', img: 'edit-book.png', charMeaning: '收集整理成書。', word: '纂修', meaning: '收集資料，整理修訂成書。', example: '學者們花了十年＿＿這部歷史書。', options: ['纂修', '查詢', '支吾', '順遂'] },
      { id: 'cw-寓', char: '寓', img: 'apartment.png', charMeaning: '住的地方；藏在裡面。', word: '公寓', meaning: '很多戶人家住在一起的樓房。', example: '阿姨住在一棟新蓋的＿＿裡。', options: ['公寓', '嘲諷', '遮蔽', '妨礙'] },
      { id: 'cw-鷸', char: '鷸', img: 'snipe-bird.png', charMeaning: '一種長嘴的水鳥。', word: '鷸鳥', meaning: '嘴巴長長、住在水邊的鳥。', example: '＿＿用長嘴在泥裡找小蟲。', options: ['鷸鳥', '謙虛', '引誘', '政策'] },
      { id: 'cw-蚌', char: '蚌', img: 'clam.png', charMeaning: '有兩片殼的水中動物。', word: '河蚌', meaning: '住在河裡、有兩片殼的動物。', example: '＿＿的殼裡有時候會長出珍珠。', options: ['河蚌', '劉海', '纂修', '公寓'] },
      { id: 'cw-述', char: '述', img: 'storyteller.png', charMeaning: '說出來、寫下來。', word: '敘述', meaning: '把事情的經過說出來或寫下來。', example: '請你＿＿一下比賽的過程。', options: ['敘述', '鷸鳥', '河蚌', '顯赫'] },
      { id: 'cw-赫', char: '赫', img: 'famous-general.png', charMeaning: '顯眼、很有名。', word: '赫赫有名', meaning: '名氣非常大。', example: '這是一家＿＿＿＿的老店。', options: ['赫赫有名', '敬畏', '查詢', '支吾'] },
      { id: 'cw-畏', char: '畏', img: 'scared-animals.png', charMeaning: '害怕。', word: '敬畏', meaning: '又尊敬又有點害怕。', example: '我們對大海要心存＿＿。', options: ['敬畏', '順遂', '嘲諷', '遮蔽'] },
      { id: 'cw-詢', char: '詢', img: 'ask-desk.png', charMeaning: '問。', word: '查詢', meaning: '查一查、問一問。', example: '可以上網＿＿天氣預報。', options: ['查詢', '妨礙', '謙虛', '引誘'] },
      { id: 'cw-曰', char: '曰', img: 'old-teacher.png', charMeaning: '說。', word: '子曰', meaning: '古書上的「老師說」，常指孔子說。', example: '論語裡常常出現「＿＿」兩個字。', options: ['子曰', '政策', '劉海', '纂修'] },
      { id: 'cw-吾', char: '吾', img: 'stammer-kid.png', charMeaning: '我。', word: '支吾', meaning: '說話含含糊糊，不清楚。', example: '他被問到作業，＿＿了半天說不出來。', options: ['支吾', '公寓', '鷸鳥', '河蚌'] },
      { id: 'cw-遂', char: '遂', img: 'smooth-road.png', charMeaning: '就；如意。', word: '順遂', meaning: '事情很順利，都很如意。', example: '祝你一切＿＿。', options: ['順遂', '敘述', '赫赫有名', '敬畏'] },
      { id: 'cw-諷', char: '諷', img: 'sneer.png', charMeaning: '拐彎說話來批評。', word: '嘲諷', meaning: '用話取笑別人。', example: '不要＿＿別人的缺點。', options: ['嘲諷', '查詢', '子曰', '支吾'] },
      { id: 'cw-蔽', char: '蔽', img: 'leaf-cover.png', charMeaning: '擋住、遮住。', word: '遮蔽', meaning: '擋住，讓人看不到。', example: '烏雲＿＿了月亮。', options: ['遮蔽', '順遂', '政策', '劉海'] },
      { id: 'cw-妨', char: '妨', img: 'block-way.png', charMeaning: '阻擋。', word: '妨礙', meaning: '擋住，讓事情不順利。', example: '大聲說話會＿＿別人看書。', options: ['妨礙', '纂修', '公寓', '鷸鳥'] },
      { id: 'cw-虛', char: '虛', img: 'humble-bow.png', charMeaning: '空的；不驕傲。', word: '謙虛', meaning: '不自大，覺得自己還要學習。', example: '他很有本事，卻一直很＿＿。', options: ['謙虛', '河蚌', '敘述', '赫赫有名'] },
      { id: 'cw-誘', char: '誘', img: 'bait-fish.png', charMeaning: '用東西或話來吸引。', word: '引誘', meaning: '用好處吸引別人上當。', example: '不要被陌生人的糖果＿＿。', options: ['引誘', '敬畏', '查詢', '子曰'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-後生可畏', situationImg: 'id-young-winner.png',
        anim: { bg: 'school', a: { old: ['👴', 30, 58, 13], kid: ['🧒', 66, 64, 11], board: ['♟️', 48, 66, 10], trophy: ['🏆', 66, 40, 10, 'h'], wow: ['😮', 30, 34, 9, 'h'] },
          s: [['爺爺下棋下了五十年。', [['bob', 'old']]],
            ['今天和十歲的孫子比賽，', [['wig', 'board']]],
            ['沒想到孫子贏了，爺爺好驚訝！', [['in', 'trophy'], ['in', 'wow'], ['jump', 'kid']]],
            ['年輕人進步很快，讓人佩服，就是後生可畏。', [['pop', 'trophy']]]] },
        idiom: '後生可畏', char: '畏', meaning: '年輕人進步很快，將來可能超過前輩，讓人佩服。', example: '這位十歲的鋼琴家彈得這麼好，真是後生可畏。', situation: '爺爺下了五十年的棋，卻輸給十歲的孫子。',
        fill: { options: ['小學生就發明了新玩具，真是＿＿＿＿。', '他年紀很大了，還在學寫字，真是＿＿＿＿。'], clue: '提示：哪一句是在說年輕人表現很好？', explain: '第一句用得對：年輕的小學生很厲害。年紀大的人，不能用這個成語。' } },
      { id: 'i-支吾其詞', situationImg: 'id-stammer.png',
        anim: { bg: 'room', a: { mom: ['👩', 30, 58, 13], kid: ['🧒', 66, 64, 11], cookie: ['🍪', 82, 44, 8], q: ['❓', 30, 34, 9, 'h'], sweat: ['💦', 76, 40, 8, 'h'] },
          s: [['媽媽問：「餅乾怎麼不見了？」', [['in', 'q']]],
            ['弟弟說：「嗯……那個……可能是……」', [['in', 'sweat'], ['shake', 'kid']]],
            ['說了半天，還是講不清楚。', [['wig', 'cookie']]],
            ['說話含含糊糊、不肯說清楚，就是支吾其詞。', [['shake', 'kid']]]] },
        idiom: '支吾其詞', char: '吾', meaning: '說話含含糊糊，故意不說清楚。', example: '問他功課寫完沒，他支吾其詞，一定是還沒寫。', situation: '媽媽問餅乾去哪了，弟弟說了半天都講不清楚。',
        fill: { options: ['被問到為什麼遲到，他＿＿＿＿，說不出理由。', '他回答得清清楚楚，一點也沒有＿＿＿＿。'], clue: '提示：哪一句是說話含糊、不肯講清楚？', explain: '第一句用得對：說不出理由，含含糊糊。回答清楚，剛好相反。' } },
      { id: 'i-毛遂自薦', situationImg: 'id-volunteer.png',
        anim: { bg: 'school', a: { teacher: ['🧑‍🏫', 30, 58, 13], kid: ['🙋', 66, 64, 11], q: ['📢', 30, 34, 9], star: ['⭐', 66, 40, 9, 'h'] },
          s: [['老師問：「誰願意當班長？」', [['wig', 'q']]],
            ['大家都低著頭不說話。', [['bob', 'teacher']]],
            ['小芳舉手說：「我可以！我會努力做好！」', [['jump', 'kid'], ['in', 'star']]],
            ['自己推薦自己，就是毛遂自薦。', [['pop', 'star']]]] },
        idiom: '毛遂自薦', char: '遂', meaning: '自己推薦自己，主動要求去做事。', example: '畢業典禮要找人致詞，小明毛遂自薦。', situation: '老師問誰要當班長，大家都不說話，小芳主動舉手。',
        fill: { options: ['合唱團缺人，她＿＿＿＿，報名參加。', '老師點名叫他上臺，他才不情願的去，這就是＿＿＿＿。'], clue: '提示：哪一句是自己主動推薦自己？', explain: '第一句用得對：自己主動報名。被老師點名才去，不是自己推薦。' } },
      { id: 'i-冷嘲熱諷', situationImg: 'id-mock.png',
        anim: { bg: 'school', a: { kid: ['🧒', 30, 62, 12], a1: ['😏', 62, 54, 10], a2: ['😝', 80, 62, 10], drop: ['💧', 30, 40, 8, 'h'] },
          s: [['小華畫了一張畫。', [['bob', 'kid']]],
            ['有人說：「畫得真『好』啊，像小嬰兒畫的。」', [['wig', 'a1']]],
            ['另一個人也跟著哈哈大笑。', [['wig', 'a2'], ['in', 'drop']]],
            ['用尖酸刻薄的話嘲笑別人，就是冷嘲熱諷。', [['shake', 'kid']]]] },
        idiom: '冷嘲熱諷', char: '諷', meaning: '用尖酸、刻薄的話嘲笑和挖苦別人。', example: '面對別人的冷嘲熱諷，他還是努力練習。', situation: '小華畫了一張畫，有人說反話取笑他，還有人跟著笑。',
        fill: { options: ['我們不應該對別人＿＿＿＿，要多給鼓勵。', '他對每個人都說好話稱讚，總是＿＿＿＿。'], clue: '提示：哪一句是用刻薄的話嘲笑人？', explain: '第一句用得對：不該嘲笑別人。說好話稱讚，剛好相反。' } },
      { id: 'i-虛有其表', situationImg: 'id-fancy-box.png',
        anim: { bg: 'room', a: { box: ['🎁', 50, 58, 15], kid: ['🧒', 20, 64, 11], empty: ['💨', 50, 40, 10, 'h'], sad: ['😕', 20, 40, 9, 'h'] },
          s: [['一個包裝得好漂亮的禮物盒。', [['bob', 'box']]],
            ['小明開心的打開，', [['wig', 'box'], ['jump', 'kid']]],
            ['裡面什麼都沒有，空空的！', [['in', 'empty'], ['in', 'sad']]],
            ['外表很好看，裡面卻什麼都沒有，就是虛有其表。', [['shake', 'box']]]] },
        idiom: '虛有其表', char: '虛', meaning: '外表看起來很好，其實沒有內容。', example: '這支手機看起來很高級，用起來卻常當機，真是虛有其表。', situation: '包裝很漂亮的禮物盒，打開來裡面卻是空的。',
        fill: { options: ['這家餐廳裝潢很漂亮，菜卻很難吃，真是＿＿＿＿。', '這本書封面普通，內容卻很精采，真是＿＿＿＿。'], clue: '提示：哪一句是外表好看、裡面沒東西？', explain: '第一句用得對：裝潢漂亮，菜卻難吃。封面普通內容精采，剛好相反。' } },
      { id: 'i-循循善誘', situationImg: 'id-patient-teacher.png',
        anim: { bg: 'school', a: { teacher: ['🧑‍🏫', 30, 58, 13], kid: ['🧒', 66, 64, 11], s1: ['1️⃣', 50, 30, 8, 'h'], s2: ['2️⃣', 60, 30, 8, 'h'], s3: ['💡', 70, 30, 9, 'h'] },
          s: [['小安不會算這一題。', [['shake', 'kid']]],
            ['老師沒有直接說答案，先問他第一步，', [['in', 's1']]],
            ['再問第二步，小安慢慢想通了！', [['in', 's2'], ['in', 's3'], ['jump', 'kid']]],
            ['很有耐心、一步一步引導別人學習，就是循循善誘。', [['pop', 's3']]]] },
        idiom: '循循善誘', char: '誘', meaning: '很有耐心，一步一步引導別人學習。', example: '在老師循循善誘下，我終於學會了分數。', situation: '小安不會算題目，老師一步一步問他，他終於想通了。',
        fill: { options: ['教練＿＿＿＿，讓我慢慢學會游泳。', '他一看到別人做錯就大罵，真是＿＿＿＿。'], clue: '提示：哪一句是有耐心的一步一步教？', explain: '第一句用得對：教練耐心教。大罵別人，剛好相反。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-策', char: '策', wrong: '刺', sentence: '大家一起想對策，解決問題。', options: ['策', '刺', '束'], clue: '這裡說的是解決問題的辦法，想一想，哪一個字有竹字頭？', explain: '要改成「策」。辦法是「對策」；「刺」是刺痛的刺。' },
      { id: 'fx-寓', char: '寓', wrong: '遇', sentence: '這個故事寓含深刻的道理。', options: ['寓', '遇', '偶'], clue: '這裡是說道理藏在裡面，想一想，哪一個字有寶蓋頭？', explain: '要改成「寓」。藏在裡面是「寓含」；「遇」是遇見的遇。' },
      { id: 'fx-蚌', char: '蚌', wrong: '棒', sentence: '海灘上有很多蚌殼。', options: ['蚌', '棒', '蜂'], clue: '這裡說的是有兩片殼的水中動物，想一想，哪一個字有虫字旁？', explain: '要改成「蚌」。有殼的動物是「蚌」；「棒」是木棒的棒。' },
      { id: 'fx-述', char: '述', wrong: '術', sentence: '他把旅行的經過敘述得很生動。', options: ['述', '術', '迷'], clue: '這裡是說把事情說出來，想一想，哪一個字有辵字旁？', explain: '要改成「述」。說出經過是「敘述」；「術」是美術的術。' },
      { id: 'fx-赫', char: '赫', wrong: '嚇', sentence: '這位將軍的名聲很顯赫。', options: ['赫', '嚇', '赤'], clue: '這裡是說名氣很大，想一想，哪一個字是兩個「赤」並排？', explain: '要改成「赫」。名氣大是「赫赫有名」；「嚇」是驚嚇的嚇。' },
      { id: 'fx-畏', char: '畏', wrong: '喂', sentence: '他不畏風雨，每天練跑。', options: ['畏', '喂', '餵'], clue: '這裡是說害怕，想一想，哪一個字沒有偏旁？', explain: '要改成「畏」。害怕是「畏」；「喂」是打招呼的聲音。' },
      { id: 'fx-詢', char: '詢', wrong: '殉', sentence: '他向路人詢問郵局在哪裡。', options: ['詢', '殉', '旬'], clue: '這裡是說開口問，想一想，哪一個字有言字旁？', explain: '要改成「詢」。開口問是「詢問」；「殉」的左邊是「歹」。' },
      { id: 'fx-遂', char: '遂', wrong: '逐', sentence: '他的心願終於得遂。', options: ['遂', '逐', '隧'], clue: '這裡是說心願實現了，想一想，哪一個字的裡面是「㒸」？', explain: '要改成「遂」。如願是「得遂」；「逐」是追逐的逐。' },
      { id: 'fx-諷', char: '諷', wrong: '楓', sentence: '這部電影諷刺貪心的人。', options: ['諷', '楓', '瘋'], clue: '這裡是說拐彎批評，想一想，哪一個字有言字旁？', explain: '要改成「諷」。拐彎批評是「諷刺」；「楓」是楓葉的楓。' },
      { id: 'fx-蔽', char: '蔽', wrong: '幣', sentence: '我們躲到大樹下蔽雨。', options: ['蔽', '幣', '弊'], clue: '這裡是說遮擋，想一想，哪一個字有草字頭？', explain: '要改成「蔽」。遮擋是「蔽」；「幣」是錢幣的幣。' },
      { id: 'fx-妨', char: '妨', wrong: '防', sentence: '你不妨試試看這個方法。', options: ['妨', '防', '坊'], clue: '這裡是說可以試試、沒關係，想一想，哪一個字有女字旁？', explain: '要改成「妨」。沒關係是「不妨」；「防」是防守的防。' },
      { id: 'fx-虛', char: '虛', wrong: '慮', sentence: '他生病後身體很虛弱。', options: ['虛', '慮', '處'], clue: '這裡是說沒有力氣，想一想，哪一個字的下面是「业」？', explain: '要改成「虛」。沒力氣是「虛弱」；「慮」是考慮的慮。' },
      { id: 'fx-誘', char: '誘', wrong: '透', sentence: '甜甜的蛋糕誘人食慾。', options: ['誘', '透', '秀'], clue: '這裡是說吸引人，想一想，哪一個字有言字旁？', explain: '要改成「誘」。吸引人是「誘人」；「透」是透明的透。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿蝟」是身上長滿尖尖硬毛的小動物。', sentence: '＿蝟遇到危險會縮成一團。', frame: '＿蝟', options: ['刺', '策'], answer: '刺', clue: '提示：和尖尖的東西有關，右邊是立刀旁。', explain: '答案是「刺」；「策」是政策的策。' },
      { id: 's2', meaning: '「＿下」是把東西放著不帶走。', sentence: '他把雨傘＿在教室裡。', frame: '＿在', options: ['留', '劉'], answer: '留', clue: '提示：這個字的下面是「田」。', explain: '答案是「留」；「劉」是劉海的劉。' },
      { id: 's3', meaning: '「＿數」是加減乘除的練習。', sentence: '我最喜歡上＿數課。', frame: '＿數', options: ['算', '纂'], answer: '算', clue: '提示：這個字的下面是「廾」。', explain: '答案是「算」；「纂」是編纂的纂。' },
      { id: 's4', meaning: '「＿見」是碰到、看到。', sentence: '我在路上＿見老師。', frame: '＿見', options: ['遇', '寓'], answer: '遇', clue: '提示：和走路有關，有辵字旁。', explain: '答案是「遇」；「寓」是寓言的寓。' },
      { id: 's5', meaning: '「蜜＿」是會採花蜜的昆蟲。', sentence: '花園裡有很多蜜＿在飛。', frame: '蜜＿', options: ['蜂', '蚌'], answer: '蜂', clue: '提示：這個字的右邊是「夆」。', explain: '答案是「蜂」；「蚌」是河蚌的蚌。' },
      { id: 's6', meaning: '「美＿」是畫畫、做勞作的課。', sentence: '今天的美＿課要畫風景。', frame: '美＿', options: ['術', '述'], answer: '術', clue: '提示：這個字的外面是「行」。', explain: '答案是「術」；「述」是敘述的述。' },
      { id: 's7', meaning: '「驚＿」是突然受到很大的驚慌。', sentence: '一聲巨響，讓我受到驚＿。', frame: '驚＿', options: ['嚇', '赫'], answer: '嚇', clue: '提示：和聲音有關，左邊是口字旁。', explain: '答案是「嚇」；「赫」是顯赫的赫。' },
      { id: 's8', meaning: '「＿食」是拿東西給人或動物吃。', sentence: '我每天幫小狗＿食。', frame: '＿食', options: ['餵', '畏'], answer: '餵', clue: '提示：和吃有關，左邊是食字旁。', explain: '答案是「餵」；「畏」是畏懼的畏。' },
      { id: 's9', meaning: '「生＿」是出生的那一天。', sentence: '今天是我的生＿。', frame: '生＿', options: ['日', '曰'], answer: '日', clue: '提示：這個字瘦瘦長長，像一個長方形。', explain: '答案是「日」；「曰」是古文的說，形狀比較扁。' },
      { id: 's10', meaning: '「追＿」是在後面一直追。', sentence: '小狗追＿著蝴蝶。', frame: '追＿', options: ['逐', '遂'], answer: '逐', clue: '提示：這個字的裡面是「豕」。', explain: '答案是「逐」；「遂」是順遂的遂。' },
      { id: 's11', meaning: '「＿葉」是秋天會變紅的葉子。', sentence: '秋天的＿葉紅通通的。', frame: '＿葉', options: ['楓', '諷'], answer: '楓', clue: '提示：這是一種樹，左邊是木字旁。', explain: '答案是「楓」；「諷」是諷刺的諷。' },
      { id: 's12', meaning: '「錢＿」是用來買東西的銅板或紙鈔。', sentence: '撲滿裡裝滿了錢＿。', frame: '錢＿', options: ['幣', '蔽'], answer: '幣', clue: '提示：這個字的下面是「巾」。', explain: '答案是「幣」；「蔽」是遮蔽的蔽。' },
      { id: 's13', meaning: '「＿守」是擋住敵人，保護自己。', sentence: '這場球賽我們要加強＿守。', frame: '＿守', options: ['防', '妨'], answer: '防', clue: '提示：這個字的左邊是阜字旁。', explain: '答案是「防」；「妨」是妨礙的妨。' },
      { id: 's14', meaning: '「老＿」是一種有斑紋、很凶猛的大貓。', sentence: '動物園裡的老＿在睡覺。', frame: '老＿', options: ['虎', '虛'], answer: '虎', clue: '提示：這個字的下面是「几」。', explain: '答案是「虎」；「虛」是謙虛的虛。' }
    ],
    listen: [
      { id: 'l1', text: '用簡單的小故事，說出一個道理。', answer: 0, options: [{ text: '寓言', img: 'storyteller.png' }, { text: '戰國策', img: 'bamboo-scroll.png' }, { text: '編纂', img: 'edit-book.png' }, { text: '諷刺', img: 'sneer.png' }] },
      { id: 'l2', text: '那隻貓把毛豎起來，裝得很凶，其實很害怕。', answer: 0, options: [{ text: '虛張聲勢', img: 'puff-cat.png' }, { text: '鷸蚌相爭', img: 'snipe-clam.png' }, { text: '急中生智', img: 'try-idea.png' }, { text: '作威作福', img: 'bully-boss.png' }] },
      { id: 'l3', text: '情況很緊急，他突然想到一個好辦法。', answer: 0, options: [{ text: '急中生智', img: 'try-idea.png' }, { text: '落荒而逃', img: 'scared-animals.png' }, { text: '虛張聲勢', img: 'puff-cat.png' }, { text: '鷸蚌相爭', img: 'snipe-clam.png' }] },
      { id: 'l4', text: '兩隊吵個不停，結果被第三隊撿到便宜。', answer: 0, options: [{ text: '鷸蚌相爭', img: 'snipe-clam.png' }, { text: '作威作福', img: 'bully-boss.png' }, { text: '落荒而逃', img: 'scared-animals.png' }, { text: '急中生智', img: 'try-idea.png' }] },
      { id: 'l5', text: '小偷看到警察，嚇得慌慌張張的跑走了。', answer: 0, options: [{ text: '落荒而逃', img: 'scared-animals.png' }, { text: '虛張聲勢', img: 'puff-cat.png' }, { text: '作威作福', img: 'bully-boss.png' }, { text: '顯赫', img: 'famous-general.png' }] },
      { id: 'l6', text: '迷路時，我向警察開口問路。', answer: 0, options: [{ text: '詢問', img: 'ask-desk.png' }, { text: '記述', img: 'storyteller.png' }, { text: '誘導', img: 'bait-fish.png' }, { text: '蒙蔽', img: 'leaf-cover.png' }] },
      { id: 'l7', text: '不要被漂亮的包裝騙了，看不清真相。', answer: 0, options: [{ text: '蒙蔽', img: 'leaf-cover.png' }, { text: '畏懼', img: 'scared-animals.png' }, { text: '諷刺', img: 'sneer.png' }, { text: '不妨', img: 'try-idea.png' }] },
      { id: 'l8', text: '那個惡霸仗著有權力，到處欺負人。', answer: 0, options: [{ text: '作威作福', img: 'bully-boss.png' }, { text: '虛張聲勢', img: 'puff-cat.png' }, { text: '鷸蚌相爭', img: 'snipe-clam.png' }, { text: '顯赫', img: 'famous-general.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '看見一隻', answer: '怎麼樣', noun: '什麼動物' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看你看見什麼樣的動物。',
      /* 短語：看見一隻＋形容詞＋的＋動物（句子都是自己寫的） */
      intro: { example: '看見一隻可愛的小狗', img: 'pr-puppy.png',
        parts: [{ text: '看見一隻', role: '看見一隻' }, { text: '可愛', role: '怎麼樣' }, { text: '的' }, { text: '小狗', role: '什麼動物' }],
        explain: '先說「看見一隻」，再說出動物的樣子或個性，加上「的」，最後說是什麼動物。' },
      pick: [
        { id: 'ph1', img: 'pr-tiger.png', before: '看見一隻', noun: '老虎', ask: '看見一隻什麼樣的老虎', look: '再看看圖片，老虎看起來怎麼樣？', options: ['威風', '膽小', '瘦弱', '可憐'], clue: '提示：抬頭挺胸，大家都怕牠。', explain: '答案是「威風」，完整的短語是「看見一隻威風的老虎」。' },
        { id: 'ph2', img: 'pr-fox.png', before: '看見一隻', noun: '狐狸', ask: '看見一隻什麼樣的狐狸', look: '再看看圖片，狐狸的眼睛在想什麼？', options: ['狡猾', '老實', '笨拙', '憨厚'], clue: '提示：眼睛轉來轉去，想騙人。', explain: '答案是「狡猾」，完整的短語是「看見一隻狡猾的狐狸」。' },
        { id: 'ph3', img: 'pr-rabbit.png', before: '看見一隻', noun: '兔子', ask: '看見一隻什麼樣的兔子', look: '再看看圖片，兔子在做什麼？', options: ['膽小', '凶猛', '威風', '霸道'], clue: '提示：一聽到聲音就躲起來。', explain: '答案是「膽小」，完整的短語是「看見一隻膽小的兔子」。' },
        { id: 'ph4', img: 'pr-elephant.png', before: '看見一隻', noun: '大象', ask: '看見一隻什麼樣的大象', look: '再看看圖片，大象有多大？', options: ['巨大', '迷你', '瘦弱', '輕巧'], clue: '提示：像一座會走路的小山。', explain: '答案是「巨大」，完整的短語是「看見一隻巨大的大象」。' },
        { id: 'ph5', img: 'pr-monkey.png', before: '看見一隻', noun: '猴子', ask: '看見一隻什麼樣的猴子', look: '再看看圖片，猴子在做什麼？', options: ['頑皮', '安靜', '懶惰', '害羞'], clue: '提示：在樹上跳來跳去，還搶別人的香蕉。', explain: '答案是「頑皮」，完整的短語是「看見一隻頑皮的猴子」。' },
        { id: 'ph6', img: 'pr-turtle.png', before: '看見一隻', noun: '烏龜', ask: '看見一隻什麼樣的烏龜', look: '再看看圖片，烏龜走得快不快？', options: ['緩慢', '飛快', '急躁', '敏捷'], clue: '提示：走了半天，才前進一點點。', explain: '答案是「緩慢」，完整的短語是「看見一隻緩慢的烏龜」。' },
        { id: 'ph7', img: 'pr-peacock.png', before: '看見一隻', noun: '孔雀', ask: '看見一隻什麼樣的孔雀', look: '再看看圖片，孔雀的尾巴怎麼樣？', options: ['美麗', '醜陋', '灰暗', '骯髒'], clue: '提示：張開尾巴，像一把彩色的扇子。', explain: '答案是「美麗」，完整的短語是「看見一隻美麗的孔雀」。' },
        { id: 'ph8', img: 'pr-ant.png', before: '看見一隻', noun: '螞蟻', ask: '看見一隻什麼樣的螞蟻', look: '再看看圖片，螞蟻在做什麼？', options: ['勤勞', '懶惰', '貪睡', '偷懶'], clue: '提示：一整天搬食物，從不休息。', explain: '答案是「勤勞」，完整的短語是「看見一隻勤勞的螞蟻」。' }
      ],
      say: [],
      words: [
        { word: '落荒而逃', meaning: '被嚇到，慌慌張張的跑走。', img: 'scared-animals.png' },
        { word: '急中生智', meaning: '情況危險時，突然想出好辦法。', img: 'try-idea.png' },
        { word: '作威作福', meaning: '仗著自己有權力，欺負別人。', img: 'bully-boss.png' },
        { word: '虛張聲勢', meaning: '故意裝得很厲害來嚇人，其實沒什麼本事。', img: 'puff-cat.png' }
      ],
      choose: [
        { id: 'pw1', word: '落荒而逃', options: ['蟑螂一出現，妹妹就落荒而逃。', '他勇敢的站在原地，落荒而逃。'], clue: '提示：想一想，「落荒而逃」是慌張跑走，還是勇敢留下？', explain: '第一句用得對：被嚇到跑走。站在原地，剛好相反。' },
        { id: 'pw2', word: '急中生智', options: ['球卡在樹上，他急中生智，用竹竿把球打下來。', '他花了三天慢慢想，終於急中生智。'], clue: '提示：想一想，「急中生智」是緊急時很快想到，還是慢慢想？', explain: '第一句用得對：緊急時馬上想到辦法。花三天慢慢想，不是急中生智。' },
        { id: 'pw3', word: '作威作福', options: ['他當上隊長後就作威作福，大家都不喜歡他。', '班長很照顧同學，大家都說他作威作福。'], clue: '提示：想一想，「作威作福」是欺負人，還是照顧人？', explain: '第一句用得對：仗勢欺人。照顧同學，剛好相反。' },
        { id: 'pw4', word: '虛張聲勢', options: ['那隻小狗叫得很凶，其實只是虛張聲勢。', '他真的很厲害，每次比賽都虛張聲勢的贏了。'], clue: '提示：想一想，「虛張聲勢」是假裝厲害，還是真的厲害？', explain: '第一句用得對：裝凶其實沒本事。真的很厲害，不是虛張聲勢。' }
      ],
      make: [
        { id: 'pm1', word: '落荒而逃', clue: '提示：想想看，什麼東西會讓人嚇得跑走？', model: '一隻大蜜蜂飛過來，大家都落荒而逃。' },
        { id: 'pm2', word: '急中生智', clue: '提示：想想看，遇到緊急的事，你想到什麼好辦法？', model: '忘了帶傘，我急中生智，用書包擋雨。' },
        { id: 'pm3', word: '作威作福', clue: '提示：想想看，故事裡有誰會仗勢欺人？', model: '故事裡的壞國王作威作福，百姓都很痛苦。' },
        { id: 'pm4', word: '虛張聲勢', clue: '提示：想想看，什麼動物會故意裝得很凶？', model: '河豚把身體脹得大大的，其實是虛張聲勢。' }
      ]
    },
    pattern: [
      { key: 'yaoshijiu', id: 'yj', title: '要是……就……', img: 'yaoshijiu.png',
        meaning: '用「要是」、「就」，先假設一個情況，再說會有什麼結果。',
        examples: ['要是明天放晴，我們就去爬山。'],
        match: [
          { id: 'pt-yj-m1', img: 'pt-rain-home.png', front: '要是下雨了，', options: ['我們就在家看書。', '我們就去晒太陽。', '太陽就很大。'], clue: '提示：看看圖片，下雨天大家在做什麼？', explain: '答案是「我們就在家看書」：下雨就待在家，前後合理。' },
          { id: 'pt-yj-m2', img: 'pt-alarm.png', front: '要是不早點睡，', options: ['明天就會起不來。', '明天就會很有精神。', '就會長高很快。'], clue: '提示：看看圖片，晚睡的隔天早上會怎樣？', explain: '答案是「明天就會起不來」：晚睡的結果是起不來。' },
          { id: 'pt-yj-m3', img: 'pt-dry-flower.png', front: '要是忘了澆水，', options: ['花就會枯掉。', '花就會開得更好。', '花就會變很大。'], clue: '提示：看看圖片，沒有水的花會怎樣？', explain: '答案是「花就會枯掉」：沒水的結果是枯掉。' }
        ],
        conj: [
          { id: 'pt-yj-c1', full: '要是你需要幫忙，就告訴我。', img: 'pt-help-hand.png', sentence: '＿＿你需要幫忙，＿告訴我。', options: ['要是……就……', '是……還是……', '無論……都……'], clue: '提示：先假設，再說結果。數數看有幾個空格。', explain: '答案是「要是……就……」：要是你需要幫忙，就告訴我。' },
          { id: 'pt-yj-c2', full: '要是天氣太熱，我們就去游泳。', img: 'pt-swim.png', sentence: '＿＿天氣太熱，我們＿去游泳。', options: ['要是……就……', '是……還是……', '無論……都……'], clue: '提示：先假設，再說結果。數數看有幾個空格。', explain: '答案是「要是……就……」：要是天氣太熱，我們就去游泳。' }
        ],
        half: [
          { id: 'pt-yj-h1', front: '要是我有一雙翅膀，', clue: '提示：有了翅膀，你想做什麼？記得要說「就」。', model: '我就要飛到雲上面看看。' },
          { id: 'pt-yj-h2', front: '要是大家都隨手關燈，', clue: '提示：大家都關燈，會有什麼好結果？記得要說「就」。', model: '就能省下很多電。' }
        ],
        whole: [
          { id: 'pt-yj-w1', clue: '提示：用「要是」、「就」先假設一個情況，再說結果。想想看：如果明天放假，你要做什麼？', model: '要是明天放假，我就要去外婆家。' }
        ] },
      { key: 'shihaishi', id: 'sh', title: '是……還是……', img: 'shihaishi.png',
        meaning: '用「是」、「還是」，提出兩個選擇，問別人或問自己要選哪一個。',
        examples: ['你是想喝紅茶，還是想喝綠茶？'],
        match: [
          { id: 'pt-sh-m1', img: 'pt-two-shirts.png', front: '你想穿的是紅色上衣，', options: ['還是藍色上衣？', '所以很好看。', '而且很便宜。'], clue: '提示：看看圖片，有兩件衣服可以選。', explain: '答案是「還是藍色上衣？」：提出兩個選擇。' },
          { id: 'pt-sh-m2', img: 'pt-fox-think.png', front: '那隻狐狸是真的很厲害，', options: ['還是在騙人？', '所以大家怕牠。', '而且跑很快。'], clue: '提示：看看圖片，狐狸可能是哪兩種情形？', explain: '答案是「還是在騙人？」：提出兩種可能。' },
          { id: 'pt-sh-m3', img: 'pt-ice-cream.png', front: '你要吃的是草莓口味，', options: ['還是巧克力口味？', '因為很好吃。', '所以很甜。'], clue: '提示：看看圖片，有兩種口味可以選。', explain: '答案是「還是巧克力口味？」：提出兩個選擇。' }
        ],
        conj: [
          { id: 'pt-sh-c1', full: '他是生病了，還是太累了？', img: 'pt-tired-kid.png', sentence: '他＿生病了，＿＿太累了？', options: ['是……還是……', '要是……就……', '無論……都……'], clue: '提示：提出兩種可能。數數看有幾個空格。', explain: '答案是「是……還是……」：他是生病了，還是太累了？' },
          { id: 'pt-sh-c2', full: '我們是搭公車，還是坐捷運？', img: 'pt-bus-metro.png', sentence: '我們＿搭公車，＿＿坐捷運？', options: ['是……還是……', '要是……就……', '無論……都……'], clue: '提示：提出兩個選擇。數數看有幾個空格。', explain: '答案是「是……還是……」：我們是搭公車，還是坐捷運？' }
        ],
        half: [
          { id: 'pt-sh-h1', front: '這個週末，我們是去海邊，', clue: '提示：還有什麼地方可以選？記得要說「還是」。', model: '還是去山上？' },
          { id: 'pt-sh-h2', front: '你是喜歡貓，', clue: '提示：還有什麼動物可以選？記得要說「還是」。', model: '還是喜歡狗？' }
        ],
        whole: [
          { id: 'pt-sh-w1', clue: '提示：用「是」、「還是」提出兩個選擇。想想看：午餐想吃什麼？', model: '中午我們是吃麵，還是吃飯？' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'question', name: '設問', meaning: '用問句來說話，引起大家注意。有時自己問、自己回答；有時只問不答，答案就藏在問題裡。', example: '狐狸對老虎說：跟在我後面，看看誰敢不逃跑？用問題讓老虎自己去看，答案就藏在問題裡。',
          show: { sentence: '誰能想到，一隻小狐狸竟然騙過了老虎？' },
          yesno: [
            { id: 'rh-qu-y1', sentence: '你知道為什麼烏龜能贏兔子嗎？因為牠從不停下來。', answer: true, clue: '提示：這句話是不是先問一個問題，再自己回答？', explain: '是設問：先問一個問題，再自己回答。' },
            { id: 'rh-qu-y2', sentence: '烏龜贏了兔子。', answer: false, clue: '提示：這句話裡有沒有問題？', explain: '不是設問：這句話沒有用問句。' }
          ],
          pick: [
            { id: 'rh-qu-p1', options: ['什麼動物最會騙人？是狐狸。', '狐狸很會騙人。'], clue: '提示：哪一句先問問題，再自己回答？', explain: '先問「什麼動物最會騙人」，再回答，是設問。' },
            { id: 'rh-qu-p2', options: ['誰敢不怕老虎呢？', '大家都怕老虎。'], clue: '提示：哪一句用問題來說話？', explain: '「誰敢不怕老虎呢」是設問：答案藏在問題裡。' },
            { id: 'rh-qu-p3', options: ['為什麼要多思考？因為才不會被騙。', '我們要多思考。', '他很聰明。'], clue: '提示：哪一句先問「為什麼」，再自己回答？', explain: '先問再答，是設問。' },
            { id: 'rh-qu-p4', options: ['你聽過狐狸騙老虎的故事嗎？', '狐狸騙了老虎。', '老虎很生氣。'], clue: '提示：哪一句用問題引起大家注意？', explain: '「你聽過狐狸騙老虎的故事嗎」是設問。' },
            { id: 'rh-qu-p5', options: ['動物們怕的是誰？其實是老虎。', '動物們跑走了。', '森林很大。', '狐狸走在前面。'], clue: '提示：哪一句先問問題，再說出答案？', explain: '先問「動物們怕的是誰」，再回答，是設問。' },
            { id: 'rh-qu-p6', options: ['有什麼比靠自己更值得驕傲呢？', '他靠自己完成了。', '他得了獎。', '大家拍手。'], clue: '提示：哪一句用問題來說話，答案藏在問題裡？', explain: '答案藏在問題裡：靠自己最值得驕傲，是設問。' }
          ] },
        { key: 'personify', name: '擬人', meaning: '把東西或動物當成人來寫，讓它們會說話、會笑、會做人做的事。', example: '寓言裡的狐狸會開口說話，還會想辦法騙老虎，就像一個聰明的人。',
          show: { sentence: '狐狸眨眨眼，笑著說：「跟我來吧！」', mark: ['笑著說'] },
          yesno: [
            { id: 'rh-pe-y1', sentence: '小兔子對烏龜說：「我們來比賽吧！」', answer: true, mark: ['對烏龜說'], clue: '提示：這句話有沒有把兔子寫得像人一樣會說話？', explain: '是擬人：兔子像人一樣會說話。' },
            { id: 'rh-pe-y2', sentence: '兔子跑得很快。', answer: false, clue: '提示：這句話裡的兔子，有沒有做人做的事？', explain: '不是擬人：這句話只是說兔子跑得快。' }
          ],
          pick: [
            { id: 'rh-pe-p1', mark: ['得意的笑了'], options: ['狐狸得意的笑了。', '狐狸走進森林。'], clue: '提示：哪一句的狐狸像人一樣會笑？', explain: '「狐狸得意的笑了」是擬人。' },
            { id: 'rh-pe-p2', mark: ['皺著眉頭想'], options: ['老虎皺著眉頭想了一下。', '老虎站在樹下。'], clue: '提示：哪一句的老虎像人一樣會思考？', explain: '「老虎皺著眉頭想」是擬人。' },
            { id: 'rh-pe-p3', mark: ['互相商量'], options: ['小鳥們在樹上互相商量。', '樹上有小鳥。', '小鳥飛走了。'], clue: '提示：哪一句的小鳥像人一樣會商量？', explain: '「小鳥們互相商量」是擬人。' },
            { id: 'rh-pe-p4', mark: ['大聲抗議'], options: ['青蛙在池塘邊大聲抗議。', '青蛙在池塘邊。', '池塘的水很清。'], clue: '提示：哪一句的青蛙像人一樣會抗議？', explain: '「青蛙大聲抗議」是擬人。' },
            { id: 'rh-pe-p5', mark: ['向大家道歉'], options: ['小熊低著頭向大家道歉。', '小熊吃了蜂蜜。', '森林裡有熊。', '熊的毛是棕色的。'], clue: '提示：哪一句的小熊像人一樣會道歉？', explain: '「小熊向大家道歉」是擬人。' },
            { id: 'rh-pe-p6', mark: ['寫了一封信'], options: ['松鼠寫了一封信給朋友。', '松鼠在吃果子。', '樹上有果子。', '松鼠跳到樹上。'], clue: '提示：哪一句的松鼠像人一樣會寫信？', explain: '「松鼠寫了一封信」是擬人。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '老虎為什麼會被騙？因為牠只看表面。', answer: '設問', clue: '提示：這句話是不是先問問題，再自己回答？', explain: '答案是「設問」：先問再答。' },
        { id: 'rh2', sentence: '你遇過說大話的人嗎？', answer: '設問', clue: '提示：這句話是不是用問題引起大家注意？', explain: '答案是「設問」：用問題引起注意。' },
        { id: 'rh3', sentence: '狐狸挺起胸膛，神氣的走在前面。', answer: '擬人', mark: ['挺起胸膛'], clue: '提示：這句話有沒有把狐狸寫得像人？', explain: '答案是「擬人」：狐狸像人一樣挺胸走路。' },
        { id: 'rh4', sentence: '小鹿害羞的躲在媽媽身後。', answer: '擬人', mark: ['害羞的'], clue: '提示：這句話的小鹿有沒有像人一樣的心情？', explain: '答案是「擬人」：小鹿像人一樣會害羞。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L08 = d; }
})(this);
