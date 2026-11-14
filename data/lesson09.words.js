/* 第 9 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 三個場景、動作的句子用三張圖（老師要求）：原本的圖 → 第一、二、三張（還沒上傳就先用原本那一張） */
    multiImg: {
      'youdesan.png': ['youdesan-1.png', 'youdesan-2.png', 'youdesan-3.png']
    },
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'infer', qe: 'infer', qf: 'infer', qg: 'interpret', qh: 'interpret',
      qi: 'evaluate', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qg: { think: ['孔明打開城門、悠閒彈琴，是想讓敵人以為什麼？', '敵方將軍為什麼會相信？'], why: '孔明知道對方認為自己一向小心、不冒險，所以故意大開城門、輕鬆彈琴，讓對方以為城裡有埋伏。他是利用對手對自己的了解來設局。' },
      qh: { think: ['士兵們一開始是什麼心情？', '敵軍退了以後，他們的心情又變成怎樣？'], why: '一開始聽說大軍來了，大家嚇得慌了手腳；看到敵軍退走、聽完孔明的解釋，又變成佩服得不得了。心情從害怕變成佩服。' },
      qi: { think: ['孔明說自己不是想冒險，是不得已。你同意嗎？', '如果逃跑，會有什麼結果？'], why: '城裡兵太少，逃也逃不遠，所以孔明只能想出險招。說他冒險或說他聰明都可以，重要的是說出理由。' },
      qj: { think: ['敵方將軍退兵，是太謹慎，還是判斷錯誤？', '如果你是他，你會怎麼做？'], why: '他因為太相信對手一向小心，才不敢進城。可以說他謹慎，也可以說他想太多。如果是你，可能會先派一小隊人去探路，再做決定。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['我會先派幾個人進城看看，確認有沒有埋伏。', '我會在城外多等幾天，觀察城裡的動靜。'], bad: ['我會馬上逃回家，什麼都不看。', '我會閉上眼睛，隨便決定。'], why: '題目問的是如果你是敵方將軍，會怎麼做。先派人探查、多觀察，就能做出比較好的判斷。馬上逃走、隨便決定，都不是好方法。' },
      k2: { good: ['我會先冷靜下來，想想有什麼辦法。', '我會找大家一起商量，分工合作。'], bad: ['我會大哭，什麼都不做。', '我會丟下大家自己跑掉。'], why: '題目問的是遇到危險或緊急的事，你會怎麼做。先冷靜、想辦法、找人合作，就像孔明一樣。哭著不動或自己逃走，都不能解決問題。' }
    },
    hanzi: [
      { id: 'h-亭', combo: { type: '形聲字', pict: '上面像高高的屋頂，下面的「丁」念起來有點像「亭」。路邊讓人停下來休息的小房子，就是「亭」。' }, char: '亭', zhuyin: 'ㄊㄧㄥˊ', radical: '亠', strokes: 9, words: ['街亭', '涼亭'], say: '亭，涼亭的亭', cloze: '涼＿', img: 'pavilion.png', options: ['亭', '停', '婷', '享'], clue: '這個字的下面是「丁」，左邊沒有偏旁。', explain: '答案是「亭」；「停」的左邊多了單人旁，「享」的下面是「子」。', parts: ['亠', '口', '冖', '丁'], story: '上面像屋頂，下面的「丁」念起來有點像「亭」。路邊讓人停下來歇腳的小房子，就是「涼亭」。', sentence: '我們在公園的涼亭裡休息。' },
      { id: 'h-支', combo: { type: '會意字', pict: '上面是「十」，像一根樹枝；下面是「又」，像一隻手。手拿著一根樹枝，就是「支」。' }, char: '支', zhuyin: 'ㄓ', radical: '支', strokes: 4, words: ['數支', '支持'], say: '支，支持的支', cloze: '＿持', img: 'cheer-team.png', options: ['支', '枝', '技', '吱'], clue: '這個字只有四畫，上面是「十」，下面是「又」。', explain: '答案是「支」；「枝」的左邊多了木字旁，「技」的左邊是提手旁。', parts: ['十', '又'], story: '上面像一根樹枝，下面是一隻手。手撐著樹枝，就是「支」；在旁邊幫忙撐著別人，叫「支持」。', sentence: '謝謝大家一直支持我。' },
      { id: 'h-縣', combo: { type: '會意字', pict: '左邊像倒掛著的頭，右邊的「系」是繩子。用繩子把東西掛起來，是「縣」最早的意思，後來變成地方的名稱。' }, char: '縣', zhuyin: 'ㄒㄧㄢˋ', radical: '糸', strokes: 16, words: ['縣長', '縣市'], say: '縣，縣長的縣', cloze: '＿長', img: 'county-office.png', options: ['縣', '懸', '線', '綿'], clue: '這個字的右邊是「系」，下面沒有「心」。', explain: '答案是「縣」；「懸」的下面多了「心」，「線」的左邊是糸字旁。', parts: ['県', '系'], story: '原本是用繩子掛東西，後來變成地方的名字。管理一個縣的人，叫「縣長」。', sentence: '縣長來學校參觀運動會。' },
      { id: 'h-懿', combo: { type: '形聲字', pict: '左邊是「壹」，右邊上面是「次」、下面是「心」。心地很專一、很美好，就是「懿」。' }, char: '懿', zhuyin: 'ㄧˋ', radical: '心', strokes: 22, words: ['司馬懿', '懿德'], say: '懿，懿德的懿', cloze: '＿德', img: 'kind-elder.png', options: ['懿', '壹', '意', '憶'], clue: '這個字的左邊是「壹」，右下是「心」。', explain: '答案是「懿」；「壹」沒有右邊，「憶」的左邊是豎心旁。', parts: ['壹', '次', '心'], story: '左邊是「壹」，右邊有「次」和「心」。專一又美好的品德，就是「懿德」；三國時有一位將軍叫「司馬懿」。', sentence: '奶奶的懿德讓大家都很敬重。' },
      { id: 'h-剩', combo: { layout: 'lr', parts: [['乘', 's', ''], ['刂', 'm', '刀']] }, char: '剩', zhuyin: 'ㄕㄥˋ', radical: '刀', strokes: 12, words: ['只剩', '剩下'], say: '剩，剩下的剩', cloze: '＿下', img: 'last-cookie.png', options: ['剩', '乘', '勝', '盛'], clue: '這個字的右邊是立刀旁。', explain: '答案是「剩」，右邊是立刀旁；「乘」沒有立刀旁，「勝」的右下是「力」。', parts: ['乘', '刂'], story: '左邊的「乘」念起來有點像「剩」，右邊是刀。用刀切過，多出來留著的部分，就是「剩下」。', sentence: '盤子裡只剩下一塊餅乾。', build: { layout: 'lr', show: ['乘', '？'], answer: '刂', options: ['刂', '力', '月', '皿'], clue: '想一想：切東西的工具，右邊放哪一個？' } },
      { id: 'h-魏', combo: { layout: 'lr', parts: [['委', 's', ''], ['鬼', 'm', '鬼']] }, char: '魏', zhuyin: 'ㄨㄟˋ', radical: '鬼', strokes: 18, words: ['魏軍', '魏國'], say: '魏，魏國的魏', cloze: '＿國', img: 'ancient-army.png', options: ['魏', '巍', '委', '鬼'], clue: '這個字的左邊是「委」，右邊是「鬼」。', explain: '答案是「魏」；「巍」的上面多了「山」，「委」沒有「鬼」。', parts: ['委', '鬼'], story: '左邊的「委」念起來像「魏」，右邊是「鬼」。三國時候北方的國家，就叫「魏國」。', sentence: '三國指的是魏、蜀、吳三個國家。', build: { layout: 'lr', show: ['委', '？'], answer: '鬼', options: ['鬼', '山', '女', '禾'], clue: '想一想：「委」的右邊放什麼，才是三國之一？' } },
      { id: 'h-旗', combo: { type: '形聲字', pict: '左邊的「方」和上面的「𠂉」像一根掛著旗子的旗桿，右下的「其」念起來像「旗」。' }, char: '旗', zhuyin: 'ㄑㄧˊ', radical: '方', strokes: 14, words: ['旗幟', '國旗'], say: '旗，國旗的旗', cloze: '國＿', img: 'flag-pole.png', options: ['旗', '棋', '期', '欺'], clue: '這個字的左邊是「方」。', explain: '答案是「旗」，左邊是「方」；「棋」的左邊是木字旁，「期」的右邊是「月」。', parts: ['方', '𠂉', '其'], story: '左邊像旗桿和飄動的布，右邊的「其」念起來像「旗」。掛在桿子上飄的布，就是「旗子」。', sentence: '升旗典禮時，國旗慢慢升上去。' },
      { id: 'h-幟', combo: { layout: 'lr', parts: [['巾', 'm', '布'], ['戠', 's', '']] }, char: '幟', zhuyin: 'ㄓˋ', radical: '巾', strokes: 15, words: ['旗幟', '標幟'], say: '幟，標幟的幟', cloze: '標＿', img: 'banner.png', options: ['幟', '職', '織', '識'], clue: '這個字的左邊是巾字旁。', explain: '答案是「幟」，左邊是巾字旁；「職」的左邊是「耳」，「織」的左邊是糸字旁。', parts: ['巾', '戠'], story: '左邊是布，右邊的「戠」念起來像「幟」。做記號用的布旗子，就是「旗幟」。', sentence: '球場上揮舞著各隊的旗幟。', build: { layout: 'lr', show: ['？', '戠'], answer: '巾', options: ['巾', '耳', '糸', '言'], clue: '想一想：旗子是用什麼做的？' } },
      { id: 'h-崗', combo: { layout: 'tb', parts: [['山', 'm', '山'], ['岡', 's', '']] }, char: '崗', zhuyin: 'ㄍㄤ', radical: '山', strokes: 11, words: ['崗位', '站崗'], say: '崗，站崗的崗', cloze: '站＿', img: 'guard-post.png', options: ['崗', '岡', '鋼', '綱'], clue: '這個字的上面是「山」。', explain: '答案是「崗」，上面是「山」；「鋼」的左邊是金字旁，「綱」的左邊是糸字旁。', parts: ['山', '岡'], story: '上面是山，下面的「岡」是小山丘。站在高處看守的地方，就是「崗」；守在那裡，叫「站崗」。', sentence: '衛兵在門口站崗。', build: { layout: 'tb', show: ['？', '岡'], answer: '山', options: ['山', '金', '糸', '木'], clue: '想一想：高高的地方，上面放哪一個？' } },
      { id: 'h-姓', combo: { layout: 'lr', parts: [['女', 'm', '女子'], ['生', 's', '']] }, char: '姓', zhuyin: 'ㄒㄧㄥˋ', radical: '女', strokes: 8, words: ['百姓', '姓名'], say: '姓，姓名的姓', cloze: '＿名', img: 'name-tag.png', options: ['姓', '性', '星', '牲'], clue: '這個字的左邊是女字旁。', explain: '答案是「姓」，左邊是女字旁；「性」的左邊是豎心旁，「牲」的左邊是牛字旁。', parts: ['女', '生'], story: '左邊是女，右邊是「生」。古時候孩子跟著媽媽那一家生出來的名號，就是「姓」。', sentence: '請在考卷上寫好姓名。', build: { layout: 'lr', show: ['？', '生'], answer: '女', options: ['女', '忄', '日', '牛'], clue: '想一想：古時候孩子的名號跟著誰？' } },
      { id: 'h-倘', combo: { layout: 'lr', parts: [['亻', 'm', '人'], ['尚', 's', '']] }, char: '倘', zhuyin: 'ㄊㄤˇ', radical: '人', strokes: 10, words: ['倘若', '倘使'], say: '倘，倘若的倘', cloze: '＿若', img: 'think-if.png', options: ['倘', '淌', '躺', '徜'], clue: '這個字的左邊是單人旁。', explain: '答案是「倘」，左邊是單人旁；「淌」的左邊是三點水，「躺」的左邊是「身」。', parts: ['亻', '尚'], story: '左邊是人，右邊的「尚」念起來像「倘」。人在想「如果……會怎樣」，就是「倘若」。', sentence: '倘若明天下雨，比賽就延期。', build: { layout: 'lr', show: ['？', '尚'], answer: '亻', options: ['亻', '氵', '身', '彳'], clue: '想一想：在想「如果」的是誰？' } },
      { id: 'h-僮', combo: { layout: 'lr', parts: [['亻', 'm', '人'], ['童', 's', '']] }, char: '僮', zhuyin: 'ㄊㄨㄥˊ', radical: '人', strokes: 14, words: ['書僮', '僮僕'], say: '僮，書僮的僮', cloze: '書＿', img: 'book-boy.png', options: ['僮', '童', '撞', '瞳'], clue: '這個字的左邊是單人旁。', explain: '答案是「僮」，左邊是單人旁；「撞」的左邊是提手旁，「瞳」的左邊是目字旁。', parts: ['亻', '童'], story: '左邊是人，右邊的「童」是小孩。古時候在主人身邊幫忙做事的小孩，就是「僮」；陪讀書的叫「書僮」。', sentence: '古時候的讀書人身邊常有書僮。', build: { layout: 'lr', show: ['？', '童'], answer: '亻', options: ['亻', '扌', '目', '氵'], clue: '想一想：幫忙做事的小孩是什麼？' } },
      { id: 'h-薰', combo: { layout: 'tb', parts: [['艹', 'm', '草'], ['熏', 's', '']] }, char: '薰', zhuyin: 'ㄒㄩㄣ', radical: '艸', strokes: 18, words: ['薰香', '薰衣草'], say: '薰，薰衣草的薰', cloze: '＿衣草', img: 'lavender.png', options: ['薰', '熏', '勳', '燻'], clue: '這個字的上面是草字頭。', explain: '答案是「薰」，上面是草字頭；「熏」沒有草字頭，「勳」的右邊是「力」。', parts: ['艹', '熏'], story: '上面是草，下面的「熏」是煙往上冒。點燃香草，讓香味飄出來，就是「薰香」。', sentence: '紫色的薰衣草田好香。', build: { layout: 'tb', show: ['？', '熏'], answer: '艹', options: ['艹', '竹', '力', '火'], clue: '想一想：會發出香味的植物，上面放哪一個？' } },
      { id: 'h-撤', combo: { type: '形聲字', pict: '左邊是提手旁，右邊念起來像「撤」。用手把東西拿走、收回來，就是「撤」。' }, char: '撤', zhuyin: 'ㄔㄜˋ', radical: '手', strokes: 15, words: ['撤退', '撤離'], say: '撤，撤離的撤', cloze: '＿離', img: 'retreat.png', options: ['撤', '澈', '徹', '轍'], clue: '這個字的左邊是提手旁。', explain: '答案是「撤」，左邊是提手旁；「澈」的左邊是三點水，「徹」的左邊是雙人旁。', parts: ['扌', '育', '攵'], story: '左邊是手，右邊念起來像「撤」。把東西收回、往後退走，就是「撤退」。', sentence: '颱風來了，遊客都撤離海邊。' },
      { id: 'h-諸', combo: { layout: 'lr', parts: [['言', 'm', '說話'], ['者', 's', '']] }, char: '諸', zhuyin: 'ㄓㄨ', radical: '言', strokes: 16, words: ['諸葛亮', '諸位'], say: '諸，諸位的諸', cloze: '＿位', img: 'speaker.png', options: ['諸', '豬', '著', '煮'], clue: '這個字的左邊是言字旁。', explain: '答案是「諸」，左邊是言字旁；「豬」的左邊是「豕」，「煮」的下面是四點火。', parts: ['言', '者'], story: '左邊是說話，右邊的「者」念起來有點像「諸」。對著很多人說話，叫「諸位」，就是「各位」。', sentence: '諸位同學，請安靜聽我說。', build: { layout: 'lr', show: ['？', '者'], answer: '言', options: ['言', '豕', '灬', '艹'], clue: '想一想：對大家說話，左邊放哪一個？' } },
      { id: 'h-葛', combo: { layout: 'tb', parts: [['艹', 'm', '草'], ['曷', 's', '']] }, char: '葛', zhuyin: 'ㄍㄜˊ', radical: '艸', strokes: 13, words: ['諸葛亮', '瓜葛'], say: '葛，瓜葛的葛', cloze: '瓜＿', img: 'vine.png', options: ['葛', '喝', '渴', '歇'], clue: '這個字的上面是草字頭。', explain: '答案是「葛」，上面是草字頭；「喝」的左邊是口字旁，「渴」的左邊是三點水。', parts: ['艹', '曷'], story: '上面是草，下面的「曷」念起來有點像「葛」。一種會爬藤、纏來纏去的植物，就是「葛」；兩件事纏在一起有關係，叫「瓜葛」。', sentence: '這件事和我沒有任何瓜葛。', build: { layout: 'tb', show: ['？', '曷'], answer: '艹', options: ['艹', '口', '氵', '欠'], clue: '想一想：會爬藤的植物，上面放哪一個？' } },
      { id: 'h-慎', combo: { layout: 'lr', parts: [['忄', 'm', '心'], ['真', 's', '']] }, char: '慎', zhuyin: 'ㄕㄣˋ', radical: '心', strokes: 13, words: ['謹慎', '慎重'], say: '慎，慎重的慎', cloze: '＿重', img: 'careful-walk.png', options: ['慎', '鎮', '填', '真'], clue: '這個字的左邊是豎心旁。', explain: '答案是「慎」，左邊是豎心旁；「鎮」的左邊是金字旁，「填」的左邊是土字旁。', parts: ['忄', '真'], story: '左邊是心，右邊的「真」念起來有點像「慎」。用真心仔細想、很小心，就是「慎重」。', sentence: '這件事很重要，要慎重考慮。', build: { layout: 'lr', show: ['？', '真'], answer: '忄', options: ['忄', '金', '土', '口'], clue: '想一想：小心仔細是用什麼在想？' } },
      { id: 'h-丞', combo: { type: '會意字', pict: '中間像一個人，下面像兩隻手把他往上托起來。幫助、托住別人，就是「丞」。' }, char: '丞', zhuyin: 'ㄔㄥˊ', radical: '一', strokes: 6, words: ['丞相', '丞相府'], say: '丞，丞相的丞', cloze: '＿相', img: 'prime-minister.png', options: ['丞', '承', '函', '蒸'], clue: '這個字只有六畫，下面是一長橫。', explain: '答案是「丞」；「承」的筆畫比較多，「蒸」的上面有草字頭。', parts: ['了', '水', '一'], story: '像兩隻手把人往上托。幫皇帝處理國家大事的大官，就是「丞相」。', sentence: '丞相每天都忙著處理國家大事。' }
    ],
    vocab: [
      { id: 'v-街亭', cloze: true, clozeOptions: ['街亭', '月球', '海底', '火星'], word: '街亭', meaning: '三國時代一個很重要的地方，在今天的甘肅。', example: '＿＿失守後，大軍只好撤退。', img: 'ancient-army.png', options: ['街亭', '魏國', '縣長', '丞相'] },
      { id: 'v-支持', cloze: true, clozeOptions: ['支持', '反對', '討厭', '阻止'], word: '支持', meaning: '贊成並幫助別人。', example: '爸媽很＿＿我學畫畫。', img: 'cheer-team.png', options: ['支持', '撤退', '剩下', '倘若'] },
      { id: 'v-縣長', cloze: true, clozeOptions: ['縣長', '校長', '店長', '班長'], word: '縣長', meaning: '管理一個地方政府的最高主管。', example: '＿＿來參加我們的畢業典禮。', img: 'county-office.png', options: ['縣長', '丞相', '書僮', '百姓'] },
      { id: 'v-司馬懿', cloze: true, clozeOptions: ['司馬懿', '孫悟空', '小紅帽', '白雪公主'], word: '司馬懿', meaning: '三國時北方國家的大將，很會打仗。', example: '＿＿＿帶著大批軍隊來攻城。', img: 'ancient-army.png', options: ['司馬懿', '諸葛亮', '丞相', '書僮'] },
      { id: 'v-剩下', cloze: true, clozeOptions: ['剩下', '增加', '變多', '補滿'], word: '剩下', meaning: '用掉一部分以後，還留著的。', example: '蛋糕吃完了，只＿＿一點奶油。', img: 'last-cookie.png', options: ['剩下', '支持', '撤退', '謹慎'] },
      { id: 'v-魏國', cloze: true, clozeOptions: ['魏國', '美國', '英國', '法國'], word: '魏國', meaning: '漢朝末年在北方建立的政權。', example: '三國是指＿＿、蜀國和吳國。', img: 'ancient-army.png', options: ['魏國', '街亭', '縣長', '百姓'] },
      { id: 'v-旗幟', cloze: true, clozeOptions: ['旗幟', '帽子', '鞋子', '書包'], word: '旗幟', meaning: '掛在桿子上、用來做記號的布。', example: '運動會上，各班揮舞著＿＿。', img: 'banner.png', options: ['旗幟', '崗位', '百姓', '書僮'] },
      { id: 'v-崗位', cloze: true, clozeOptions: ['崗位', '床上', '沙發', '公園'], word: '崗位', meaning: '每個人負責守著、做事的地方。', example: '大家都守在自己的＿＿上。', img: 'guard-post.png', options: ['崗位', '旗幟', '縣長', '街亭'] },
      { id: 'v-百姓', cloze: true, clozeOptions: ['百姓', '國王', '將軍', '皇帝'], word: '百姓', meaning: '一般的人民。', example: '好的官員會照顧＿＿。', img: 'villagers.png', options: ['百姓', '丞相', '書僮', '縣長'] },
      { id: 'v-倘若', cloze: true, clozeOptions: ['倘若', '因為', '所以', '而且'], word: '倘若', meaning: '如果、假使。', example: '＿＿你有困難，可以來找我。', img: 'think-if.png', options: ['倘若', '謹慎', '剩下', '支持'] },
      { id: 'v-書僮', cloze: true, clozeOptions: ['書僮', '國王', '將軍', '老師'], word: '書僮', meaning: '古時候陪主人念經史、幫忙做雜事的小孩。', example: '讀書人身邊跟著一個＿＿。', img: 'book-boy.png', options: ['書僮', '百姓', '丞相', '縣長'] },
      { id: 'v-薰香', cloze: true, clozeOptions: ['薰香', '吃飯', '跑步', '睡覺'], word: '薰香', meaning: '點燃有氣味的草料，讓好聞的味道飄出來。', example: '奶奶在房間裡＿＿，好舒服。', img: 'incense.png', options: ['薰香', '撤退', '支持', '剩下'] },
      { id: 'v-撤退', cloze: true, clozeOptions: ['撤退', '前進', '進攻', '衝鋒'], word: '撤退', meaning: '軍隊離開原來的地方，往回走。', example: '敵人太多了，將軍下令＿＿。', img: 'retreat.png', options: ['撤退', '支持', '薰香', '倘若'] },
      { id: 'v-諸葛亮', cloze: true, clozeOptions: ['諸葛亮', '孫悟空', '小紅帽', '白雪公主'], word: '諸葛亮', meaning: '三國時很聰明的軍師，字孔明。', example: '＿＿＿是一位很有智慧的軍師。', img: 'wise-strategist.png', options: ['諸葛亮', '司馬懿', '書僮', '縣長'] },
      { id: 'v-謹慎', cloze: true, clozeOptions: ['謹慎', '粗心', '隨便', '馬虎'], word: '謹慎', meaning: '做事說話都很小心仔細。', example: '過馬路時要很＿＿。', img: 'careful-walk.png', options: ['謹慎', '倘若', '剩下', '撤退'] },
      { id: 'v-丞相', cloze: true, clozeOptions: ['丞相', '小兵', '農夫', '商人'], word: '丞相', meaning: '古時候幫皇帝處理國家大事的最高官員。', example: '皇帝請＿＿一起商量國家大事。', img: 'prime-minister.png', options: ['丞相', '書僮', '百姓', '縣長'] },
      { id: 'v-不時之需', cloze: true, clozeOptions: ['不時之需', '永遠用不到', '馬上丟掉', '從來不要'], word: '不時之需', meaning: '突然、沒料到的狀況下會用到的東西。', example: '書包裡放一把傘，以備＿＿＿＿。', img: 'umbrella-bag.png', options: ['不時之需', '迫不得已', '一探究竟', '氣定神閒'] },
      { id: 'v-驚慌失措', cloze: true, clozeOptions: ['驚慌失措', '冷靜沉著', '鎮定自若', '從容不迫'], word: '驚慌失措', meaning: '嚇得手忙腳亂，不知道怎麼辦。', example: '地震來時，不要＿＿＿＿，要先躲好。', img: 'panic-crowd.png', options: ['驚慌失措', '氣定神閒', '一探究竟', '迫不得已'] },
      { id: 'v-氣定神閒', cloze: true, clozeOptions: ['氣定神閒', '手忙腳亂', '驚慌失措', '坐立難安'], word: '氣定神閒', meaning: '樣子很安穩、輕鬆，一點也不慌。', example: '比賽前，他＿＿＿＿的喝著水。', img: 'calm-guqin.png', options: ['氣定神閒', '驚慌失措', '迫不得已', '不時之需'] },
      { id: 'v-一探究竟', cloze: true, clozeOptions: ['一探究竟', '假裝沒看到', '轉身離開', '不聞不問'], word: '一探究竟', meaning: '去看清楚、弄明白到底怎麼回事。', example: '聽到奇怪的聲音，我決定去＿＿＿＿。', img: 'peek-door.png', options: ['一探究竟', '不時之需', '氣定神閒', '驚慌失措'] },
      { id: 'v-迫不得已', cloze: true, clozeOptions: ['迫不得已', '心甘情願', '高高興興', '自動自發'], word: '迫不得已', meaning: '沒有辦法，只好這樣做。', example: '下大雨了，我們＿＿＿＿取消野餐。', img: 'rain-cancel.png', options: ['迫不得已', '一探究竟', '驚慌失措', '氣定神閒'] }
    ],
    charwords: [
      { id: 'cw-亭', char: '亭', img: 'pavilion.png', charMeaning: '有屋頂、讓人休息的小房子。', word: '涼亭', meaning: '讓人乘涼、休息的小亭子。', example: '我們在＿＿裡躲雨。', options: ['涼亭', '支持', '縣長', '懿德'] },
      { id: 'cw-支', char: '支', img: 'cheer-team.png', charMeaning: '撐著；計算隊伍或筆的單位。', word: '支持', meaning: '贊成並幫忙。', example: '全班都＿＿他參加比賽。', options: ['支持', '剩下', '魏國', '國旗'] },
      { id: 'cw-縣', char: '縣', img: 'county-office.png', charMeaning: '地方的區域名稱。', word: '縣長', meaning: '管理一個地方政府的首長。', example: '＿＿到災區關心大家。', options: ['縣長', '標幟', '站崗', '姓名'] },
      { id: 'cw-懿', char: '懿', img: 'kind-elder.png', charMeaning: '美好。', word: '懿德', meaning: '美好的品德。', example: '老校長的＿＿，大家都很敬佩。', options: ['懿德', '倘若', '書僮', '薰衣草'] },
      { id: 'cw-剩', char: '剩', img: 'last-cookie.png', charMeaning: '多出來、留下來。', word: '剩下', meaning: '用掉一部分以後還留著的。', example: '暑假只＿＿三天了。', options: ['剩下', '撤離', '諸位', '瓜葛'] },
      { id: 'cw-魏', char: '魏', img: 'ancient-army.png', charMeaning: '三國時的國名。', word: '魏國', meaning: '三國時在北方的國家。', example: '＿＿的軍隊人數很多。', options: ['魏國', '慎重', '丞相', '涼亭'] },
      { id: 'cw-旗', char: '旗', img: 'flag-pole.png', charMeaning: '掛在桿子上的布。', word: '國旗', meaning: '代表一個國家的旗子。', example: '升旗時，大家看著＿＿。', options: ['國旗', '支持', '縣長', '懿德'] },
      { id: 'cw-幟', char: '幟', img: 'banner.png', charMeaning: '做記號用的旗子。', word: '標幟', meaning: '用來做記號、讓人認得出來的東西。', example: '紅十字是醫院的＿＿。', options: ['標幟', '剩下', '魏國', '國旗'] },
      { id: 'cw-崗', char: '崗', img: 'guard-post.png', charMeaning: '守衛的地方。', word: '站崗', meaning: '站在一個地方看守。', example: '士兵在大門口＿＿。', options: ['站崗', '標幟', '姓名', '倘若'] },
      { id: 'cw-姓', char: '姓', img: 'name-tag.png', charMeaning: '家族的名稱。', word: '姓名', meaning: '姓和名字。', example: '請在這裡寫上你的＿＿。', options: ['姓名', '書僮', '薰衣草', '撤離'] },
      { id: 'cw-倘', char: '倘', img: 'think-if.png', charMeaning: '如果。', word: '倘若', meaning: '如果、假使。', example: '＿＿你遲到，就趕不上車了。', options: ['倘若', '諸位', '瓜葛', '慎重'] },
      { id: 'cw-僮', char: '僮', img: 'book-boy.png', charMeaning: '幫忙做事的小孩。', word: '書僮', meaning: '陪主人讀書的小孩。', example: '讀書人帶著＿＿去上京考試。', options: ['書僮', '丞相', '涼亭', '支持'] },
      { id: 'cw-薰', char: '薰', img: 'lavender.png', charMeaning: '香草；用煙香味來染。', word: '薰衣草', meaning: '開紫色小花、很香的植物。', example: '這個枕頭有＿＿＿的香味。', options: ['薰衣草', '縣長', '懿德', '剩下'] },
      { id: 'cw-撤', char: '撤', img: 'retreat.png', charMeaning: '收回；往後退。', word: '撤離', meaning: '離開危險的地方。', example: '火災時，大家要快速＿＿。', options: ['撤離', '魏國', '國旗', '標幟'] },
      { id: 'cw-諸', char: '諸', img: 'speaker.png', charMeaning: '許多、各個。', word: '諸位', meaning: '各位，對很多人的稱呼。', example: '＿＿來賓，歡迎光臨。', options: ['諸位', '站崗', '姓名', '倘若'] },
      { id: 'cw-葛', char: '葛', img: 'vine.png', charMeaning: '一種爬藤的植物。', word: '瓜葛', meaning: '互相牽連的關係。', example: '我和這件事一點＿＿都沒有。', options: ['瓜葛', '書僮', '薰衣草', '撤離'] },
      { id: 'cw-慎', char: '慎', img: 'careful-walk.png', charMeaning: '小心。', word: '慎重', meaning: '小心認真，不隨便。', example: '選班長要＿＿考慮。', options: ['慎重', '諸位', '瓜葛', '丞相'] },
      { id: 'cw-丞', char: '丞', img: 'prime-minister.png', charMeaning: '輔佐的官員。', word: '丞相', meaning: '幫皇帝處理國事的最高官員。', example: '皇帝把大事交給＿＿處理。', options: ['丞相', '涼亭', '支持', '縣長'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-亭亭玉立', situationImg: 'id-lotus.png',
        anim: { bg: 'park', a: { pond: ['💧', 50, 76, 16], lotus: ['🪷', 50, 52, 14], sun: ['☀️', 84, 14, 10], kid: ['🧒', 18, 64, 11, 'h'] },
          s: [['夏天的池塘裡，', [['wig', 'pond']]],
            ['一朵荷花從水面伸出來，', [['grow', 'lotus', 1.3]]],
            ['又高又直，好美！', [['in', 'kid'], ['bob', 'lotus']]],
            ['身材修長、站得挺挺的很美，就是亭亭玉立。', [['pop', 'lotus']]]] },
        idiom: '亭亭玉立', char: '亭', meaning: '形容人或花木長得又高又挺，很美麗。', example: '幾年不見，表姐已經長成亭亭玉立的少女。', situation: '池塘裡一朵荷花又高又直的伸出水面，好美。',
        fill: { options: ['湖邊的荷花＿＿＿＿，好美。', '那棵小草被踩得東倒西歪，真是＿＿＿＿。'], clue: '提示：哪一句是又高又挺、很美麗？', explain: '第一句用得對：荷花長得挺拔美麗。東倒西歪，剛好相反。' } },
      { id: 'i-樂不可支', situationImg: 'id-super-happy.png',
        anim: { bg: 'room', a: { kid: ['🧒', 50, 62, 13], gift: ['🎁', 30, 66, 10], ha: ['😆', 50, 38, 10, 'h'], star: ['🎉', 76, 30, 10, 'h'] },
          s: [['生日那天，小明收到一隻小狗。', [['bob', 'gift']]],
            ['他抱著小狗又叫又跳，', [['in', 'ha'], ['jump', 'kid']]],
            ['笑到肚子都痛了！', [['in', 'star'], ['jump', 'kid']]],
            ['快樂到受不了，就是樂不可支。', [['pop', 'star']]]] },
        idiom: '樂不可支', char: '支', meaning: '快樂到了極點，高興得受不了。', example: '聽到要去遊樂園，弟弟樂不可支。', situation: '小明生日收到一隻小狗，高興得又叫又跳，笑到肚子痛。',
        fill: { options: ['考了一百分，她＿＿＿＿。', '他的寵物生病了，他難過得＿＿＿＿。'], clue: '提示：哪一句是快樂到極點？', explain: '第一句用得對：考一百分很開心。難過，剛好相反。' } },
      { id: 'i-旗鼓相當', situationImg: 'id-tug-war.png',
        anim: { bg: 'school', a: { a: ['🧑‍🤝‍🧑', 24, 62, 13], b: ['🧑‍🤝‍🧑', 76, 62, 13], rope: ['🪢', 50, 64, 10], eq: ['⚖️', 50, 34, 10, 'h'] },
          s: [['兩班在比賽拔河。', [['bob', 'rope']]],
            ['這邊拉過來一點，', [['mv', 'rope', [44, 64, 500]]]],
            ['那邊又拉回去一點，誰也拉不動誰。', [['mv', 'rope', [56, 64, 500]], ['mv', 'rope', [50, 64, 500]], ['in', 'eq']]],
            ['兩邊力量差不多，就是旗鼓相當。', [['pop', 'eq']]]] },
        idiom: '旗鼓相當', char: '旗', meaning: '兩邊的力量差不多，不分高下。', example: '這兩隊旗鼓相當，比賽非常精采。', situation: '兩班拔河，你拉過來我拉回去，誰也拉不動誰。',
        fill: { options: ['兩位選手＿＿＿＿，比到最後一秒才分出勝負。', '一隊得了五十分，一隊才兩分，真是＿＿＿＿。'], clue: '提示：哪一句是兩邊力量差不多？', explain: '第一句用得對：比到最後才分勝負。差五十分，相差太多。' } },
      { id: 'i-旗開得勝', situationImg: 'id-first-win.png',
        anim: { bg: 'school', a: { flag: ['🚩', 30, 40, 12], kid: ['🏃', 50, 64, 12], trophy: ['🏆', 76, 40, 11, 'h'] },
          s: [['運動會第一個項目開始了。', [['wig', 'flag']]],
            ['我們班的選手衝了出去，', [['mv', 'kid', [70, 64, 700]]]],
            ['第一場就拿下冠軍！', [['in', 'trophy'], ['jump', 'kid']]],
            ['事情一開始就成功，就是旗開得勝。', [['pop', 'trophy']]]] },
        idiom: '旗開得勝', char: '旗', meaning: '一開始就成功，取得好成績。', example: '球隊第一場比賽就旗開得勝，大家都很開心。', situation: '運動會第一個項目，我們班一出發就拿下冠軍。',
        fill: { options: ['新開的麵包店第一天就大排長龍，真是＿＿＿＿。', '他比賽第一場就輸了，真是＿＿＿＿。'], clue: '提示：哪一句是一開始就成功？', explain: '第一句用得對：第一天就生意很好。第一場就輸，剛好相反。' } },
      { id: 'i-隱姓埋名', situationImg: 'id-hide-name.png',
        anim: { bg: 'park', a: { hero: ['🦸', 30, 60, 13], hat: ['🎩', 30, 40, 9, 'h'], house: ['🏠', 76, 62, 12], q: ['❓', 76, 38, 9, 'h'] },
          s: [['一位大英雄打敗了壞人。', [['bob', 'hero']]],
            ['他不想被大家認出來，', [['in', 'hat']]],
            ['就搬到小村子，換了一個名字生活。', [['mv', 'hero', [64, 62, 800]], ['in', 'q']]],
            ['把名字藏起來，不讓人知道身分，就是隱姓埋名。', [['pop', 'q']]]] },
        idiom: '隱姓埋名', char: '姓', meaning: '把真正的名字藏起來，不讓別人知道自己是誰。', example: '他退休後隱姓埋名，到山上過安靜的日子。', situation: '大英雄不想被認出來，搬到小村子換名字生活。',
        fill: { options: ['那位名人＿＿＿＿，在鄉下開了一家小書店。', '他每天上電視，讓大家都認識他，真是＿＿＿＿。'], clue: '提示：哪一句是把身分藏起來？', explain: '第一句用得對：名人不讓人知道身分。天天上電視，剛好相反。' } },
      { id: 'i-反求諸己', situationImg: 'id-self-check.png',
        anim: { bg: 'school', a: { kid: ['🧒', 40, 62, 12], paper: ['📄', 64, 62, 10], mirror: ['🪞', 76, 40, 11, 'h'], idea: ['💡', 40, 36, 9, 'h'] },
          s: [['小華考試沒考好。', [['shake', 'paper']]],
            ['他沒有怪題目太難，', [['shake', 'kid']]],
            ['而是想想自己哪裡沒讀好。', [['in', 'mirror'], ['in', 'idea']]],
            ['遇到問題先檢討自己，就是反求諸己。', [['jump', 'kid']]]] },
        idiom: '反求諸己', char: '諸', meaning: '遇到問題時，先從自己身上找原因，好好反省。', example: '球隊輸了，隊長反求諸己，檢討自己哪裡要改進。', situation: '小華考不好，沒有怪題目，而是想自己哪裡沒讀好。',
        fill: { options: ['和同學吵架後，我＿＿＿＿，想想自己哪裡做錯。', '他做錯事總是怪別人，從來不懂＿＿＿＿是什麼意思。'], clue: '提示：哪一句是先檢討自己？', explain: '第一句用得對：先想自己哪裡錯。只怪別人，就沒有反求諸己。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-亭', char: '亭', wrong: '停', sentence: '山頂上有一座小涼亭。', options: ['亭', '停', '享'], clue: '這裡說的是讓人休息的小房子，想一想，哪一個字沒有單人旁？', explain: '要改成「亭」。休息的小房子是「涼亭」；「停」是停車的停。' },
      { id: 'fx-支', char: '支', wrong: '枝', sentence: '謝謝大家支持我們的活動。', options: ['支', '枝', '技'], clue: '這裡是說贊成並幫忙，想一想，哪一個字沒有偏旁？', explain: '要改成「支」。贊成幫忙是「支持」；「枝」是樹枝的枝。' },
      { id: 'fx-縣', char: '縣', wrong: '懸', sentence: '他是我們縣裡的模範生。', options: ['縣', '懸', '線'], clue: '這裡說的是一個地方區域，想一想，哪一個字下面沒有「心」？', explain: '要改成「縣」。地方區域是「縣」；「懸」是懸掛的懸。' },
      { id: 'fx-剩', char: '剩', wrong: '乘', sentence: '時間只剩五分鐘了。', options: ['剩', '乘', '勝'], clue: '這裡是說還留下來的，想一想，哪一個字有立刀旁？', explain: '要改成「剩」。留下來是「剩」；「乘」是乘車的乘。' },
      { id: 'fx-旗', char: '旗', wrong: '棋', sentence: '運動場上插滿了彩色的旗子。', options: ['旗', '棋', '期'], clue: '這裡說的是掛在桿子上的布，想一想，哪一個字的左邊是「方」？', explain: '要改成「旗」。掛在桿上的布是「旗」；「棋」是下棋的棋。' },
      { id: 'fx-幟', char: '幟', wrong: '織', sentence: '各隊高舉著自己的旗幟。', options: ['幟', '織', '職'], clue: '這裡說的是做記號的旗子，想一想，哪一個字有巾字旁？', explain: '要改成「幟」。做記號的旗子是「旗幟」；「織」是織毛衣的織。' },
      { id: 'fx-崗', char: '崗', wrong: '鋼', sentence: '警察在路口站崗指揮交通。', options: ['崗', '鋼', '岡'], clue: '這裡是說站在一個地方看守，想一想，哪一個字的上面是「山」？', explain: '要改成「崗」。看守是「站崗」；「鋼」是鋼琴的鋼。' },
      { id: 'fx-姓', char: '姓', wrong: '性', sentence: '老師請每個人說出自己的姓名。', options: ['姓', '性', '星'], clue: '這裡說的是名字的一部分，想一想，哪一個字有女字旁？', explain: '要改成「姓」。名字是「姓名」；「性」是個性的性。' },
      { id: 'fx-倘', char: '倘', wrong: '躺', sentence: '倘若你有空，就來我家玩。', options: ['倘', '躺', '淌'], clue: '這裡是說如果，想一想，哪一個字有單人旁？', explain: '要改成「倘」。如果是「倘若」；「躺」是躺下的躺。' },
      { id: 'fx-薰', char: '薰', wrong: '勳', sentence: '房間裡飄著淡淡的薰香。', options: ['薰', '勳', '熏'], clue: '這裡說的是點燃香料的香味，想一想，哪一個字有草字頭？', explain: '要改成「薰」。香料的味道是「薰香」；「勳」是勳章的勳。' },
      { id: 'fx-撤', char: '撤', wrong: '徹', sentence: '颱風快來了，漁船都撤回港口。', options: ['撤', '徹', '澈'], clue: '這裡是說收回、退回，想一想，哪一個字有提手旁？', explain: '要改成「撤」。退回是「撤」；「徹」是徹底的徹。' },
      { id: 'fx-諸', char: '諸', wrong: '豬', sentence: '諸位朋友，大家好。', options: ['諸', '豬', '煮'], clue: '這裡是說各位，想一想，哪一個字有言字旁？', explain: '要改成「諸」。各位是「諸位」；「豬」是小豬的豬。' },
      { id: 'fx-葛', char: '葛', wrong: '喝', sentence: '他和那群壞人沒有瓜葛。', options: ['葛', '喝', '渴'], clue: '這裡是說互相牽連的關係，想一想，哪一個字有草字頭？', explain: '要改成「葛」。牽連是「瓜葛」；「喝」是喝水的喝。' },
      { id: 'fx-慎', char: '慎', wrong: '鎮', sentence: '下樓梯時要小心謹慎。', options: ['慎', '鎮', '填'], clue: '這裡是說很小心，想一想，哪一個字有豎心旁？', explain: '要改成「慎」。小心是「謹慎」；「鎮」是小鎮的鎮。' },
      { id: 'fx-丞', char: '丞', wrong: '承', sentence: '丞相向皇帝報告國家大事。', options: ['丞', '承', '蒸'], clue: '這裡說的是幫皇帝處理國事的大官，想一想，哪一個字只有六畫？', explain: '要改成「丞」。大官是「丞相」；「承」是承認的承。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿車」是讓車子不再移動。', sentence: '紅燈亮了，司機趕快＿車。', frame: '＿車', options: ['停', '亭'], answer: '停', clue: '提示：和人有關，左邊是單人旁。', explain: '答案是「停」；「亭」是涼亭的亭。' },
      { id: 's2', meaning: '「樹＿」是從樹幹分出來的細長部分。', sentence: '小鳥站在樹＿上唱歌。', frame: '樹＿', options: ['枝', '支'], answer: '枝', clue: '提示：和樹有關，左邊是木字旁。', explain: '答案是「枝」；「支」是支持的支。' },
      { id: 's3', meaning: '「＿掛」是把東西吊在高處。', sentence: '天花板上＿掛著一盞燈。', frame: '＿掛', options: ['懸', '縣'], answer: '懸', clue: '提示：這個字的下面有「心」。', explain: '答案是「懸」；「縣」是縣長的縣。' },
      { id: 's4', meaning: '「勝＿」是贏了比賽。', sentence: '我們終於獲得勝＿。', frame: '勝＿', options: ['利', '剩'], answer: '利', clue: '提示：這個字的左邊是「禾」。', explain: '答案是「利」；「剩」是剩下的剩。' },
      { id: 's5', meaning: '「下＿」是兩個人輪流移動小圓片來比賽。', sentence: '爺爺最喜歡下＿。', frame: '下＿', options: ['棋', '旗'], answer: '棋', clue: '提示：和木頭有關，左邊是木字旁。', explain: '答案是「棋」；「旗」是國旗的旗。' },
      { id: 's6', meaning: '「＿毛衣」是用毛線一針一針做衣服。', sentence: '奶奶正在＿毛衣。', frame: '＿毛', options: ['織', '幟'], answer: '織', clue: '提示：和線有關，左邊是糸字旁。', explain: '答案是「織」；「幟」是旗幟的幟。' },
      { id: 's7', meaning: '「＿琴」是一種有黑白鍵的樂器。', sentence: '妹妹每天練習彈＿琴。', frame: '＿琴', options: ['鋼', '崗'], answer: '鋼', clue: '提示：和金屬有關，左邊是金字旁。', explain: '答案是「鋼」；「崗」是站崗的崗。' },
      { id: 's8', meaning: '「個＿」是一個人的脾氣和特點。', sentence: '他的個＿很溫和。', frame: '個＿', options: ['性', '姓'], answer: '性', clue: '提示：和心有關，左邊是豎心旁。', explain: '答案是「性」；「姓」是姓名的姓。' },
      { id: 's9', meaning: '「＿下」是把身體平放休息。', sentence: '我累了，想＿下來休息。', frame: '＿下', options: ['躺', '倘'], answer: '躺', clue: '提示：和身體有關，左邊是「身」。', explain: '答案是「躺」；「倘」是倘若的倘。' },
      { id: 's10', meaning: '「兒＿」是年紀小的孩子。', sentence: '四月四日是兒＿節。', frame: '兒＿', options: ['童', '僮'], answer: '童', clue: '提示：這個字沒有單人旁。', explain: '答案是「童」；「僮」是書僮的僮。' },
      { id: 's11', meaning: '「清＿」是水很乾淨、看得見底。', sentence: '溪水清＿見底。', frame: '清＿', options: ['澈', '撤'], answer: '澈', clue: '提示：和水有關，左邊是三點水。', explain: '答案是「澈」；「撤」是撤退的撤。' },
      { id: 's12', meaning: '「口＿」是很想喝水。', sentence: '跑完步，我好口＿。', frame: '口＿', options: ['渴', '葛'], answer: '渴', clue: '提示：和水有關，左邊是三點水。', explain: '答案是「渴」；「葛」是瓜葛的葛。' },
      { id: 's13', meaning: '「小＿」是比城市小、人比較少的地方。', sentence: '我們住在海邊的小＿。', frame: '小＿', options: ['鎮', '慎'], answer: '鎮', clue: '提示：這個字的左邊是金字旁。', explain: '答案是「鎮」；「慎」是謹慎的慎。' },
      { id: 's14', meaning: '「＿認」是說出自己做過的事。', sentence: '他勇敢的＿認自己做錯了。', frame: '＿認', options: ['承', '丞'], answer: '承', clue: '提示：這個字的筆畫比較多。', explain: '答案是「承」；「丞」是丞相的丞。' }
    ],
    listen: [
      { id: 'l1', text: '地震來了，大家嚇得手忙腳亂，不知道怎麼辦。', answer: 0, options: [{ text: '驚慌失措', img: 'panic-crowd.png' }, { text: '氣定神閒', img: 'calm-guqin.png' }, { text: '一探究竟', img: 'peek-door.png' }, { text: '迫不得已', img: 'rain-cancel.png' }] },
      { id: 'l2', text: '他坐在那裡，輕鬆安穩，一點也不慌。', answer: 0, options: [{ text: '氣定神閒', img: 'calm-guqin.png' }, { text: '驚慌失措', img: 'panic-crowd.png' }, { text: '不時之需', img: 'umbrella-bag.png' }, { text: '撤退', img: 'retreat.png' }] },
      { id: 'l3', text: '聽到奇怪的聲音，我走過去看個清楚。', answer: 0, options: [{ text: '一探究竟', img: 'peek-door.png' }, { text: '迫不得已', img: 'rain-cancel.png' }, { text: '驚慌失措', img: 'panic-crowd.png' }, { text: '薰香', img: 'incense.png' }] },
      { id: 'l4', text: '下大雨了，我們沒有辦法，只好取消野餐。', answer: 0, options: [{ text: '迫不得已', img: 'rain-cancel.png' }, { text: '一探究竟', img: 'peek-door.png' }, { text: '不時之需', img: 'umbrella-bag.png' }, { text: '支持', img: 'cheer-team.png' }] },
      { id: 'l5', text: '書包裡放一把傘，臨時要用就有了。', answer: 0, options: [{ text: '不時之需', img: 'umbrella-bag.png' }, { text: '氣定神閒', img: 'calm-guqin.png' }, { text: '剩下', img: 'last-cookie.png' }, { text: '倘若', img: 'think-if.png' }] },
      { id: 'l6', text: '敵人太多了，軍隊往後退走。', answer: 0, options: [{ text: '撤退', img: 'retreat.png' }, { text: '支持', img: 'cheer-team.png' }, { text: '薰香', img: 'incense.png' }, { text: '崗位', img: 'guard-post.png' }] },
      { id: 'l7', text: '大家都守在自己負責的地方，不亂跑。', answer: 0, options: [{ text: '崗位', img: 'guard-post.png' }, { text: '旗幟', img: 'banner.png' }, { text: '百姓', img: 'villagers.png' }, { text: '街亭', img: 'ancient-army.png' }] },
      { id: 'l8', text: '過馬路時，他左看右看，非常小心。', answer: 0, options: [{ text: '謹慎', img: 'careful-walk.png' }, { text: '倘若', img: 'think-if.png' }, { text: '剩下', img: 'last-cookie.png' }, { text: '撤退', img: 'retreat.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '聽見', answer: '怎麼樣', noun: '什麼聲音' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看你聽見什麼樣的聲音。',
      /* 短語：聽見＋形容詞＋的＋聲音（句子都是自己寫的） */
      intro: { example: '聽見悠揚的笛聲', img: 'pr-flute.png',
        parts: [{ text: '聽見', role: '聽見' }, { text: '悠揚', role: '怎麼樣' }, { text: '的' }, { text: '笛聲', role: '什麼聲音' }],
        explain: '先說「聽見」，再說出聲音的樣子，加上「的」，最後說是什麼聲音。' },
      pick: [
        { id: 'ph1', img: 'calm-guqin.png', before: '聽見', noun: '琴聲', ask: '聽見什麼樣的琴聲', look: '再看看圖片，彈琴的人表情怎麼樣？', options: ['悠揚', '刺耳', '吵雜', '沙啞'], clue: '提示：聲音輕輕柔柔，飄得好遠。', explain: '答案是「悠揚」，完整的短語是「聽見悠揚的琴聲」。' },
        { id: 'ph2', img: 'pr-drum.png', before: '聽見', noun: '鼓聲', ask: '聽見什麼樣的鼓聲', look: '再看看圖片，打鼓的人用多大力氣？', options: ['響亮', '微弱', '細小', '模糊'], clue: '提示：咚咚咚，整條街都聽得到。', explain: '答案是「響亮」，完整的短語是「聽見響亮的鼓聲」。' },
        { id: 'ph3', img: 'pr-birds.png', before: '聽見', noun: '鳥叫聲', ask: '聽見什麼樣的鳥叫聲', look: '再看看圖片，小鳥在做什麼？', options: ['清脆', '低沉', '沙啞', '難聽'], clue: '提示：像玻璃珠碰在一起，很好聽。', explain: '答案是「清脆」，完整的短語是「聽見清脆的鳥叫聲」。' },
        { id: 'ph4', img: 'pr-thunder.png', before: '聽見', noun: '雷聲', ask: '聽見什麼樣的雷聲', look: '再看看圖片，天空怎麼樣？', options: ['震耳', '微弱', '輕柔', '細小'], clue: '提示：轟隆一聲，窗戶都在搖。', explain: '答案是「震耳」，完整的短語是「聽見震耳的雷聲」。' },
        { id: 'ph5', img: 'pr-stadium.png', before: '聽見', noun: '歡呼聲', ask: '聽見什麼樣的歡呼聲', look: '再看看圖片，觀眾在做什麼？', options: ['熱烈', '冷淡', '安靜', '微弱'], clue: '提示：大家又叫又跳，整個球場都在震動。', explain: '答案是「熱烈」，完整的短語是「聽見熱烈的歡呼聲」。' },
        { id: 'ph6', img: 'pr-rain-roof.png', before: '聽見', noun: '雨聲', ask: '聽見什麼樣的雨聲', look: '再看看圖片，雨下得大不大？', options: ['輕柔', '刺耳', '吵鬧', '尖銳'], clue: '提示：小雨落在屋頂上，聽了想睡覺。', explain: '答案是「輕柔」，完整的短語是「聽見輕柔的雨聲」。' }
      ],
      say: [],
      words: [
        { word: '氣定神閒', meaning: '樣子很安穩、輕鬆，一點也不慌。', img: 'calm-guqin.png' },
        { word: '一探究竟', meaning: '去看清楚、弄明白到底怎麼回事。', img: 'peek-door.png' },
        { word: '驚慌失措', meaning: '嚇得手忙腳亂，不知道怎麼辦。', img: 'panic-crowd.png' },
        { word: '迫不得已', meaning: '沒有辦法，只好這樣做。', img: 'rain-cancel.png' }
      ],
      choose: [
        { id: 'pw1', word: '氣定神閒', options: ['考試前，他氣定神閒的複習筆記。', '他找不到鑰匙，急得氣定神閒。'], clue: '提示：想一想，「氣定神閒」是輕鬆安穩，還是很著急？', explain: '第一句用得對：考前很冷靜。急得團團轉，剛好相反。' },
        { id: 'pw2', word: '一探究竟', options: ['樹叢裡有聲音，我們走過去一探究竟。', '他什麼都不想知道，決定一探究竟。'], clue: '提示：想一想，「一探究竟」是想弄清楚，還是不想知道？', explain: '第一句用得對：想弄清楚是什麼聲音。不想知道，就不會一探究竟。' },
        { id: 'pw3', word: '驚慌失措', options: ['火警鈴響了，有些人驚慌失措。', '他冷靜的帶大家逃生，一副驚慌失措的樣子。'], clue: '提示：想一想，「驚慌失措」是慌張，還是冷靜？', explain: '第一句用得對：有人嚇得慌張。冷靜帶大家逃生，剛好相反。' },
        { id: 'pw4', word: '迫不得已', options: ['車子壞了，他迫不得已走路回家。', '他最喜歡吃蛋糕，迫不得已的吃了三塊。'], clue: '提示：想一想，「迫不得已」是沒辦法只好做，還是很喜歡做？', explain: '第一句用得對：車子壞了只好走路。最喜歡吃蛋糕，不是被逼的。' }
      ],
      make: [
        { id: 'pm1', word: '氣定神閒', clue: '提示：想想看，誰在什麼時候一點也不慌？', model: '上臺表演時，姊姊氣定神閒的彈完一首曲子。' },
        { id: 'pm2', word: '一探究竟', clue: '提示：想想看，什麼事讓你很好奇？', model: '看到天空有亮光，我們跑到陽臺一探究竟。' },
        { id: 'pm3', word: '驚慌失措', clue: '提示：想想看，什麼時候大家會很慌張？', model: '停電的時候，弟弟嚇得驚慌失措。' },
        { id: 'pm4', word: '迫不得已', clue: '提示：想想看，什麼時候你只好做不想做的事？', model: '雨太大了，我們迫不得已取消了比賽。' }
      ]
    },
    pattern: [
      { key: 'youdesan', id: 'yd', title: '有的……有的……有的……', img: 'youdesan.png',
        meaning: '用三個「有的」，說出一群人或東西各自不同的樣子。',
        examples: ['下課時，同學有的跳繩，有的打球，有的看書。'],
        match: [
          { id: 'pt-yd-m1', img: 'pt-park-people.png', front: '公園裡的人有的散步，有的跑步，', options: ['有的打太極拳。', '都在睡覺。', '所以很累。'], clue: '提示：看看圖片，還有人在做什麼？', explain: '答案是「有的打太極拳」：三個「有的」說出三種不同的樣子。' },
          { id: 'pt-yd-m2', img: 'pt-flowers.png', front: '花園裡的花有的紅，有的黃，', options: ['有的白。', '全都枯了。', '所以很香。'], clue: '提示：看看圖片，還有什麼顏色的花？', explain: '答案是「有的白」：三個「有的」說出三種顏色。' },
          { id: 'pt-yd-m3', img: 'pt-class-art.png', front: '同學們有的畫畫，有的唱歌，', options: ['有的跳舞。', '都沒來。', '因為很吵。'], clue: '提示：看看圖片，還有同學在做什麼？', explain: '答案是「有的跳舞」：三個「有的」說出三種活動。' }
        ],
        conj: [
          { id: 'pt-yd-c1', full: '動物們有的吃草，有的喝水，有的睡覺。', img: 'pt-zoo.png', sentence: '動物們＿＿吃草，＿＿喝水，＿＿睡覺。', options: ['有的……有的……有的……', '如果……就……', '是……還是……'], clue: '提示：說出三種不同的樣子。數數看有幾個空格。', explain: '答案是「有的……有的……有的……」：動物們有的吃草，有的喝水，有的睡覺。' },
          { id: 'pt-yd-c2', full: '書架上的書有的很厚，有的很薄，有的很舊。', img: 'pt-bookshelf.png', sentence: '書架上的書＿＿很厚，＿＿很薄，＿＿很舊。', options: ['有的……有的……有的……', '如果……就……', '是……還是……'], clue: '提示：說出三種不同的樣子。數數看有幾個空格。', explain: '答案是「有的……有的……有的……」：書架上的書有的很厚，有的很薄，有的很舊。' }
        ],
        half: [
          { id: 'pt-yd-h1', front: '夜市裡的攤販有的賣小吃，有的賣衣服，', clue: '提示：還有攤販賣什麼？記得要說「有的」。', model: '有的賣玩具。' },
          { id: 'pt-yd-h2', front: '天上的雲有的像棉花，有的像小船，', clue: '提示：雲還像什麼？記得要說「有的」。', model: '有的像奔跑的馬。' }
        ],
        whole: [
          { id: 'pt-yd-w1', clue: '提示：用三個「有的」說出一群人或東西不同的樣子。想想看：下課時同學們在做什麼？', model: '下課時，同學有的盪鞦韆，有的玩沙，有的聊天。' }
        ] },
      { key: 'ruguojiu', id: 'rj', title: '如果……就……', img: 'ruguojiu.png',
        meaning: '用「如果」、「就」，先假設一個情況，再說會有什麼結果。',
        examples: ['如果明天下雨，運動會就延期。'],
        match: [
          { id: 'pt-rj-m1', img: 'pt-picnic.png', front: '如果明天天氣好，', options: ['我們就去野餐。', '我們就去躲雨。', '就會下大雨。'], clue: '提示：看看圖片，天氣好的時候適合做什麼？', explain: '答案是「我們就去野餐」：天氣好就出去玩，前後合理。' },
          { id: 'pt-rj-m2', img: 'pt-hungry.png', front: '如果你肚子餓了，', options: ['就先吃塊麵包。', '就去跑步。', '就不要吃。'], clue: '提示：看看圖片，肚子餓了該怎麼辦？', explain: '答案是「就先吃塊麵包」：餓了就吃東西，前後合理。' },
          { id: 'pt-rj-m3', img: 'pt-practice.png', front: '如果每天練習，', options: ['琴就會越彈越好。', '琴就會越彈越差。', '就會忘光光。'], clue: '提示：看看圖片，每天練習會有什麼結果？', explain: '答案是「琴就會越彈越好」：每天練就會進步。' }
        ],
        conj: [
          { id: 'pt-rj-c1', full: '如果你遲到，就會錯過開場。', img: 'pt-late.png', sentence: '＿＿你遲到，＿會錯過開場。', options: ['如果……就……', '有的……有的……有的……', '是……還是……'], clue: '提示：先假設，再說結果。數數看有幾個空格。', explain: '答案是「如果……就……」：如果你遲到，就會錯過開場。' },
          { id: 'pt-rj-c2', full: '如果大家一起幫忙，工作就能早點完成。', img: 'pt-teamwork.png', sentence: '＿＿大家一起幫忙，工作＿能早點完成。', options: ['如果……就……', '有的……有的……有的……', '是……還是……'], clue: '提示：先假設，再說結果。數數看有幾個空格。', explain: '答案是「如果……就……」：如果大家一起幫忙，工作就能早點完成。' }
        ],
        half: [
          { id: 'pt-rj-h1', front: '如果我是一隻鳥，', clue: '提示：變成鳥以後，你想做什麼？記得要說「就」。', model: '我就要飛到山頂看日出。' },
          { id: 'pt-rj-h2', front: '如果大家都不亂丟垃圾，', clue: '提示：不亂丟垃圾，會有什麼好結果？記得要說「就」。', model: '街道就會很乾淨。' }
        ],
        whole: [
          { id: 'pt-rj-w1', clue: '提示：用「如果」、「就」先假設，再說結果。想想看：如果你有一天假期，想做什麼？', model: '如果我有一天假期，我就要去海邊看夕陽。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'question', name: '設問', meaning: '用問句來說話，引起大家注意。有時自己問、自己回答；有時只問不答，答案就藏在問題裡。', example: '敵將的兒子問父親：城裡會不會根本沒有兵？用問題說出心裡的懷疑，讓故事更緊張。',
          show: { sentence: '城門為什麼大開？難道裡面有埋伏？' },
          yesno: [
            { id: 'rh-qu-y1', sentence: '他為什麼一點都不怕？原來他早就想好辦法了。', answer: true, clue: '提示：這句話是不是先問一個問題，再自己回答？', explain: '是設問：先問一個問題，再自己回答。' },
            { id: 'rh-qu-y2', sentence: '他一點都不怕。', answer: false, clue: '提示：這句話裡有沒有問題？', explain: '不是設問：這句話沒有用問句。' }
          ],
          pick: [
            { id: 'rh-qu-p1', options: ['誰是三國最聰明的軍師？是孔明。', '孔明很聰明。'], clue: '提示：哪一句先問問題，再自己回答？', explain: '先問「誰是三國最聰明的軍師」，再回答，是設問。' },
            { id: 'rh-qu-p2', options: ['誰不想要一個聰明的朋友呢？', '我有一個聰明的朋友。'], clue: '提示：哪一句用問題來說話？', explain: '「誰不想要一個聰明的朋友呢」是設問：答案藏在問題裡。' },
            { id: 'rh-qu-p3', options: ['為什麼要冷靜？因為慌張想不出辦法。', '我們要冷靜。', '他很著急。'], clue: '提示：哪一句先問「為什麼」，再自己回答？', explain: '先問再答，是設問。' },
            { id: 'rh-qu-p4', options: ['你聽過不用打仗就退敵的故事嗎？', '敵人退走了。', '城門打開了。'], clue: '提示：哪一句用問題引起大家注意？', explain: '「你聽過不用打仗就退敵的故事嗎」是設問。' },
            { id: 'rh-qu-p5', options: ['城裡有多少兵？只有一點點。', '城裡有士兵。', '城牆很高。', '他坐在城上。'], clue: '提示：哪一句先問問題，再說出答案？', explain: '先問「城裡有多少兵」，再回答，是設問。' },
            { id: 'rh-qu-p6', options: ['有什麼比冷靜更重要呢？', '他很冷靜。', '大家很緊張。', '敵人來了。'], clue: '提示：哪一句用問題來說話，答案藏在問題裡？', explain: '答案藏在問題裡：冷靜最重要，是設問。' }
          ] },
        { key: 'exclaim', name: '感嘆', meaning: '說話時加上「啊」、「呀」、「唉」這些聲音，或用驚嘆號，把心裡的驚訝、高興、佩服大聲的說出來。', example: '士兵們佩服的大喊軍師真是太厲害了，用驚嘆號把心裡的佩服喊出來。',
          show: { sentence: '哇！這個辦法太聰明了！', mark: ['哇！'] },
          yesno: [
            { id: 'rh-ex-y1', sentence: '天啊！敵人真的退走了！', answer: true, mark: ['天啊！'], clue: '提示：這句話有沒有用「啊」和驚嘆號？', explain: '是感嘆：「天啊」說出了驚訝。' },
            { id: 'rh-ex-y2', sentence: '敵人退走了。', answer: false, clue: '提示：這句話有沒有用嘆詞或驚嘆號，把心情喊出來？', explain: '不是感嘆：這句話只是說出事情。' }
          ],
          pick: [
            { id: 'rh-ex-p1', mark: ['太厲害了！'], options: ['太厲害了！你怎麼想到的？', '你想到了一個辦法。'], clue: '提示：哪一句用驚嘆號把佩服喊出來？', explain: '「太厲害了！」是感嘆。' },
            { id: 'rh-ex-p2', mark: ['唉！'], options: ['唉！我又忘了帶傘。', '我沒有帶傘。'], clue: '提示：哪一句用「唉」說出失望？', explain: '「唉！」是感嘆。' },
            { id: 'rh-ex-p3', mark: ['哇！'], options: ['哇！城門全都打開了！', '城門打開了。', '城外有軍隊。'], clue: '提示：哪一句用「哇」說出驚訝？', explain: '「哇！」是感嘆。' },
            { id: 'rh-ex-p4', mark: ['好險啊！'], options: ['好險啊！差一點就被抓到了！', '他沒有被抓到。', '他跑得很快。'], clue: '提示：哪一句用「啊」和驚嘆號說出鬆一口氣？', explain: '「好險啊！」是感嘆。' },
            { id: 'rh-ex-p5', mark: ['真是聰明呀！'], options: ['軍師真是聰明呀！', '軍師在彈琴。', '士兵在掃地。', '城裡很安靜。'], clue: '提示：哪一句用「呀」說出佩服？', explain: '「真是聰明呀！」是感嘆。' },
            { id: 'rh-ex-p6', mark: ['啊！'], options: ['啊！敵人來了！', '敵人在城外。', '他看到塵土。', '軍隊往前走。'], clue: '提示：哪一句用「啊」說出驚慌？', explain: '「啊！」是感嘆。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '他為什麼要彈琴？因為想讓敵人起疑心。', answer: '設問', clue: '提示：這句話是不是先問問題，再自己回答？', explain: '答案是「設問」：先問再答。' },
        { id: 'rh2', sentence: '你遇過要馬上做決定的時候嗎？', answer: '設問', clue: '提示：這句話是不是用問題引起大家注意？', explain: '答案是「設問」：用問題引起注意。' },
        { id: 'rh3', sentence: '哇！我們贏了！', answer: '感嘆', mark: ['哇！'], clue: '提示：這句話有沒有用「哇」和驚嘆號？', explain: '答案是「感嘆」：「哇」說出開心。' },
        { id: 'rh4', sentence: '唉！真可惜呀！', answer: '感嘆', mark: ['唉！'], clue: '提示：這句話有沒有用「唉」把心情說出來？', explain: '答案是「感嘆」：「唉」說出可惜。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L09 = d; }
})(this);
