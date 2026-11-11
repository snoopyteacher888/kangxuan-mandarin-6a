/* 第 3 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'extract', qe: 'infer', qf: 'infer', qg: 'interpret', qh: 'interpret',
      qi: 'evaluate', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qg: { think: ['小時候很會寫詩的孩子，後來為什麼不再進步？', '他是不夠聰明，還是少了什麼？'], why: '他本來很有天分，可是被要求寫詩賺錢、不再學習，沒有繼續磨練自己。才華如果不努力培養，也會慢慢消失。' },
      qh: { think: ['作者提到哪三個讓自己變更好的方法？', '這三個方法裡，你最想先試哪一個？'], why: '作者建議：先找出自己的長處、設定目標一步步前進；再學「多做多學」，把每次付出當成練習；最後遇到困難也要想辦法解決。三個方法合起來，就能一點一點超越昨天的自己。' },
      qi: { think: ['一個人很樂意接下大家不想做的事，另一個人不再學習，結果各怎麼樣？', '這兩個例子，哪一個讓你想學、哪一個讓你想避免？'], why: '一位把每件小事都當成學習機會，越來越進步；另一位停止學習，才能慢慢消失。比較兩人就能看出：態度會決定一個人能不能變得更好。' },
      qj: { think: ['接下別人不想做的事，可能學到什麼？', '如果每件事都接，會不會太累？'], why: '認同的人覺得多做能多學、多累積經驗；有保留的人覺得也要懂得分配時間，不要累壞自己。兩種想法都可以，重要的是說出理由。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['我的長處是很會畫畫，遇到困難我會多試幾次。', '我很有耐心，遇到難題我會先找方法再慢慢解決。'], bad: ['我什麼都不會，也不想學。', '遇到困難我就叫別人幫我做完。'], why: '題目問的是你的長處和遇到困難的態度。說出自己的優點、願意多試幾次，就是在往更好的自己前進。什麼都不想學、全部丟給別人，就不會進步。' },
      k2: { good: ['我認同，因為多做能學到更多本領。', '我大部分認同，但也要注意不要累壞自己。'], bad: ['多做就是吃虧，什麼都不要做最好。', '別人叫我做事，我都假裝沒聽到。'], why: '題目問的是同不同意「多做多學」。認同或有保留都可以，只要有理由。覺得多做就是吃虧、裝沒聽到，就會錯過學習的機會。' }
    },
    hanzi: [
      { id: 'h-卓', combo: { type: '會意字', pict: '上面像「卜」，下面是「早」。站得高高的、比別人早一步，表示特別突出，就是「卓」。' }, char: '卓', zhuyin: 'ㄓㄨㄛˊ', radical: '十', strokes: 8, words: ['卓越', '卓著'], say: '卓，卓越的卓', cloze: '＿越', img: 'gold-medal.png', options: ['卓', '桌', '草', '早'], clue: '這個字的上面是「卜」，下面是「早」。', explain: '答案是「卓」；「桌」的下面是「木」，「草」的上面是草字頭。', parts: ['卜', '早'], story: '上面像站得高高的，下面是「早」。比別人站得高、做得好，特別突出，就是「卓越」。', sentence: '這位科學家的研究成果非常卓越。' },
      { id: 'h-培', combo: { layout: 'lr', parts: [['土', 'm', '泥土'], ['咅', 's', '']] }, char: '培', zhuyin: 'ㄆㄟˊ', radical: '土', strokes: 11, words: ['培養', '栽培'], say: '培，栽培的培', cloze: '栽＿', img: 'grow-sprout.png', options: ['培', '陪', '倍', '賠'], clue: '這個字的左邊是土字旁。', explain: '答案是「培」，左邊是土字旁；「陪」的左邊是阜字旁，「倍」的左邊是單人旁。', parts: ['土', '咅'], story: '左邊是泥土，右邊念起來像「培」。在植物根部加土、細心照顧，讓它長大，就是「栽培」；慢慢訓練出能力，叫「培養」。', sentence: '爺爺用心栽培院子裡的蘭花。', build: { layout: 'lr', show: ['？', '咅'], answer: '土', options: ['土', '阝', '亻', '貝'], clue: '想一想：替植物的根加的是什麼？' } },
      { id: 'h-裁', combo: { type: '形聲字', pict: '下面是「衣」，上面的「𢦏」像拿著刀。拿刀把布剪開做衣服，就是「裁」。' }, char: '裁', zhuyin: 'ㄘㄞˊ', radical: '衣', strokes: 12, words: ['總裁', '裁縫'], say: '裁，裁縫的裁', cloze: '＿縫', img: 'tailor.png', options: ['裁', '栽', '載', '戴'], clue: '這個字的下面是「衣」。', explain: '答案是「裁」，下面是「衣」；「栽」的下面是「木」，「載」的下面是「車」。', parts: ['𢦏', '衣'], story: '下面是「衣」，上面像拿著刀。把布剪好、縫成衣服，就是「裁縫」。', sentence: '裁縫師傅幫我改短了褲子。' },
      { id: 'h-瑣', combo: { type: '形聲字', pict: '左邊是「王」，像一串玉；右邊念起來像「瑣」。小小的玉片碰來碰去，細細碎碎的，所以「瑣」有細小零碎的意思。' }, char: '瑣', zhuyin: 'ㄙㄨㄛˇ', radical: '玉', strokes: 14, words: ['瑣事', '繁瑣'], say: '瑣，繁瑣的瑣', cloze: '繁＿', img: 'many-chores.png', options: ['瑣', '鎖', '項', '頓'], clue: '這個字的左邊是「王」。', explain: '答案是「瑣」，左邊是「王」；「鎖」的左邊是金字旁，「項」的右邊是「頁」。', parts: ['王', '𧴪'], story: '左邊像一串小玉片，細細碎碎的。又多又小、很麻煩的事，就是「瑣事」；手續很多、很麻煩，叫「繁瑣」。', sentence: '辦這張證件的手續好繁瑣。' },
      { id: 'h-仲', combo: { layout: 'lr', parts: [['亻', 'm', '人'], ['中', 's', '']] }, char: '仲', zhuyin: 'ㄓㄨㄥˋ', radical: '人', strokes: 6, words: ['方仲永', '仲夏'], say: '仲，仲夏的仲', cloze: '＿夏', img: 'summer-sun.png', options: ['仲', '中', '忠', '沖'], clue: '這個字的左邊是單人旁，右邊是「中」。', explain: '答案是「仲」；「中」沒有單人旁，「忠」的下面是心。', parts: ['亻', '中'], story: '左邊是人，右邊是「中」。排在中間的兄弟，叫「仲」；夏天正中間的時候，叫「仲夏」。', sentence: '仲夏的夜晚，螢火蟲在草叢裡飛舞。', build: { layout: 'lr', show: ['？', '中'], answer: '亻', options: ['亻', '心', '氵', '口'], clue: '想一想：排在中間的兄弟是人，左邊放哪一個？' } },
      { id: 'h-耕', combo: { layout: 'lr', parts: [['耒', 'm', '農具'], ['井', 's', '']] }, char: '耕', zhuyin: 'ㄍㄥ', radical: '耒', strokes: 10, words: ['耕田', '耕種'], say: '耕，耕種的耕', cloze: '＿種', img: 'farmer-plow.png', options: ['耕', '井', '耗', '耘'], clue: '這個字的左邊是「耒」。', explain: '答案是「耕」，右邊是「井」；「耗」的右邊是「毛」，「耘」的右邊是「云」。', parts: ['耒', '井'], story: '左邊的「耒」是翻土的農具，右邊的「井」像一格一格的田。拿農具把田翻鬆，就是「耕田」。', sentence: '農夫天一亮就下田耕種。', build: { layout: 'lr', show: ['？', '井'], answer: '耒', options: ['耒', '扌', '木', '禾'], clue: '想一想：翻土用的農具是哪一個？' } },
      { id: 'h-賺', combo: { layout: 'lr', parts: [['貝', 'm', '錢'], ['兼', 's', '']] }, char: '賺', zhuyin: 'ㄓㄨㄢˋ', radical: '貝', strokes: 17, words: ['賺錢', '賺取'], say: '賺，賺取的賺', cloze: '＿取', img: 'coin-jar.png', options: ['賺', '嫌', '謙', '廉'], clue: '這個字的左邊是貝字旁。', explain: '答案是「賺」，左邊是貝字旁；「嫌」的左邊是女字旁，「謙」的左邊是言字旁。', parts: ['貝', '兼'], story: '左邊的「貝」以前是錢，右邊的「兼」念起來有點像「賺」。工作換到錢，就是「賺錢」。', sentence: '哥哥打工賺取零用錢。', build: { layout: 'lr', show: ['？', '兼'], answer: '貝', options: ['貝', '女', '言', '广'], clue: '想一想：以前的錢是用什麼做的？' } },
      { id: 'h-異', combo: { type: '會意字', pict: '「異」像一個人戴著奇怪的面具、舉起雙手，樣子和平常不一樣，所以是「不同」的意思。' }, char: '異', zhuyin: 'ㄧˋ', radical: '田', strokes: 11, words: ['無異', '奇異'], say: '異，奇異的異', cloze: '奇＿', img: 'strange-fish.png', options: ['異', '翼', '冀', '糞'], clue: '這個字的上面是「田」，下面是「共」。', explain: '答案是「異」；「翼」的上面多了「羽」，「冀」的上面是「北」。', parts: ['田', '共'], story: '像一個人戴著面具、舉起雙手，樣子很特別。和平常不一樣，就是「異」；很奇特，叫「奇異」。', sentence: '海底有很多奇異的生物。' },
      { id: 'h-惋', combo: { layout: 'lr', parts: [['忄', 'm', '心'], ['宛', 's', '']] }, char: '惋', zhuyin: 'ㄨㄢˇ', radical: '心', strokes: 11, words: ['惋惜', '令人惋惜'], say: '惋，惋惜的惋', cloze: '＿惜', img: 'sad-sigh.png', options: ['惋', '婉', '碗', '腕'], clue: '這個字的左邊是豎心旁。', explain: '答案是「惋」，左邊是豎心旁；「婉」的左邊是女字旁，「碗」的左邊是石字旁。', parts: ['忄', '宛'], story: '左邊是心，右邊的「宛」念起來像「惋」。心裡覺得可惜、輕輕嘆氣，就是「惋惜」。', sentence: '比賽只差一分就贏了，大家都很惋惜。', build: { layout: 'lr', show: ['？', '宛'], answer: '忄', options: ['忄', '女', '石', '月'], clue: '想一想：覺得可惜是一種心情，左邊放哪一個？' } },
      { id: 'h-欠', combo: { type: '象形字', pict: '「欠」像一個人張大嘴巴打哈欠，嘴裡的氣跑出來。' }, char: '欠', zhuyin: 'ㄑㄧㄢˋ', radical: '欠', strokes: 4, words: ['欠缺', '哈欠'], say: '欠，哈欠的欠', cloze: '哈＿', img: 'yawn.png', options: ['欠', '次', '吹', '歌'], clue: '這個字像一個張大嘴巴的人，沒有偏旁。', explain: '答案是「欠」；「次」的左邊多兩點，「吹」的左邊是口字旁。', parts: ['欠'], story: '「欠」像人張大嘴巴打哈欠。不夠、少了一些，也叫「欠」，例如「欠缺」。', sentence: '昨晚太晚睡，今天上課一直打哈欠。' },
      { id: 'h-砥', combo: { layout: 'lr', parts: [['石', 'm', '石頭'], ['氐', 's', '']] }, char: '砥', zhuyin: 'ㄉㄧˇ', radical: '石', strokes: 10, words: ['砥礪', '中流砥柱'], say: '砥，中流砥柱的砥', cloze: '＿礪', img: 'whetstone.png', options: ['砥', '低', '底', '抵'], clue: '這個字的左邊是石字旁。', explain: '答案是「砥」，左邊是石字旁；「低」的左邊是單人旁，「抵」的左邊是提手旁。', parts: ['石', '氐'], story: '左邊是石頭，右邊的「氐」念起來像「砥」。用來磨刀的石頭叫「砥」；像磨刀一樣不斷磨練自己，叫「砥礪」。', sentence: '同學們互相砥礪，一起進步。', build: { layout: 'lr', show: ['？', '氐'], answer: '石', options: ['石', '亻', '广', '扌'], clue: '想一想：磨刀用的是什麼？' } },
      { id: 'h-礪', combo: { layout: 'lr', parts: [['石', 'm', '石頭'], ['厲', 's', '']] }, char: '礪', zhuyin: 'ㄌㄧˋ', radical: '石', strokes: 20, words: ['砥礪', '磨礪'], say: '礪，磨礪的礪', cloze: '磨＿', img: 'whetstone.png', options: ['礪', '勵', '厲', '蠣'], clue: '這個字的左邊是石字旁。', explain: '答案是「礪」，左邊是石字旁；「勵」的右邊是「力」，「蠣」的左邊是虫字旁。', parts: ['石', '厲'], story: '左邊是石頭，右邊的「厲」念起來像「礪」。粗粗的磨刀石叫「礪」；在困難中把自己磨得更好，叫「磨礪」。', sentence: '經過許多困難的磨礪，他變得更堅強。', build: { layout: 'lr', show: ['？', '厲'], answer: '石', options: ['石', '力', '厂', '虫'], clue: '想一想：用來磨刀的粗糙硬塊，左邊放哪一個？' } },
      { id: 'h-驕', combo: { layout: 'lr', parts: [['馬', 'm', '馬'], ['喬', 's', '']] }, char: '驕', zhuyin: 'ㄐㄧㄠ', radical: '馬', strokes: 22, words: ['驕傲', '驕傲自滿'], say: '驕，驕傲的驕', cloze: '＿傲', img: 'proud-kid.png', options: ['驕', '嬌', '橋', '僑'], clue: '這個字的左邊是「馬」。', explain: '答案是「驕」，左邊是「馬」；「嬌」的左邊是女字旁，「橋」的左邊是木字旁。', parts: ['馬', '喬'], story: '左邊是馬，右邊的「喬」是高高的。馬抬著頭、很神氣的樣子，就是「驕」；覺得自己很了不起，叫「驕傲」。', sentence: '考了第一名也不要驕傲。', build: { layout: 'lr', show: ['？', '喬'], answer: '馬', options: ['馬', '女', '木', '亻'], clue: '想一想：抬著頭很神氣的動物，左邊放哪一個？' } },
      { id: 'h-傲', combo: { layout: 'lr', parts: [['亻', 'm', '人'], ['敖', 's', '']] }, char: '傲', zhuyin: 'ㄠˋ', radical: '人', strokes: 13, words: ['驕傲', '傲慢'], say: '傲，傲慢的傲', cloze: '＿慢', img: 'arrogant.png', options: ['傲', '熬', '敖', '遨'], clue: '這個字的左邊是單人旁。', explain: '答案是「傲」，左邊是單人旁；「熬」的下面是四點火，「遨」有辵字旁。', parts: ['亻', '敖'], story: '左邊是人，右邊的「敖」念起來像「傲」。人抬高下巴、看不起別人，就是「傲慢」。', sentence: '他的態度很傲慢，大家都不想理他。', build: { layout: 'lr', show: ['？', '敖'], answer: '亻', options: ['亻', '灬', '辶', '扌'], clue: '想一想：看不起別人的是誰？' } },
      { id: 'h-耘', combo: { layout: 'lr', parts: [['耒', 'm', '農具'], ['云', 's', '']] }, char: '耘', zhuyin: 'ㄩㄣˊ', radical: '耒', strokes: 10, words: ['耕耘', '耕耘機'], say: '耘，耕耘的耘', cloze: '耕＿', img: 'weeding.png', options: ['耘', '雲', '芸', '云'], clue: '這個字的左邊是「耒」。', explain: '答案是「耘」，左邊是「耒」；「雲」的上面是雨字頭，「芸」的上面是草字頭。', parts: ['耒', '云'], story: '左邊的「耒」是農具，右邊的「云」念起來像「耘」。在田裡除草、照顧作物，就是「耘」；辛苦付出，叫「耕耘」。', sentence: '一分耕耘，一分收穫。', build: { layout: 'lr', show: ['？', '云'], answer: '耒', options: ['耒', '雨', '艹', '禾'], clue: '想一想：在田裡除草用的農具是哪一個？' } },
      { id: 'h-隔', combo: { layout: 'lr', parts: [['阝', 'm', '土牆'], ['鬲', 's', '']] }, char: '隔', zhuyin: 'ㄍㄜˊ', radical: '阜', strokes: 13, words: ['間隔', '隔壁'], say: '隔，隔壁的隔', cloze: '＿壁', img: 'neighbor-wall.png', options: ['隔', '融', '膈', '鬲'], clue: '這個字的左邊是阜字旁。', explain: '答案是「隔」，左邊是阜字旁；「融」的右邊是「虫」，「膈」的左邊是肉字旁。', parts: ['阝', '鬲'], story: '左邊的阜字旁像土牆，右邊念起來像「隔」。中間有一道牆分開，就是「隔」；牆的另一邊，叫「隔壁」。', sentence: '隔壁的阿姨送來一盤水果。', build: { layout: 'lr', show: ['？', '鬲'], answer: '阝', options: ['阝', '虫', '月', '扌'], clue: '想一想：中間的牆像土坡，左邊放哪一個？' } },
      { id: 'h-茁', combo: { layout: 'tb', parts: [['艹', 'm', '草'], ['出', 's', '']] }, char: '茁', zhuyin: 'ㄓㄨㄛˊ', radical: '艸', strokes: 9, words: ['茁壯', '茁長'], say: '茁，茁壯的茁', cloze: '＿長', img: 'sprout-grow.png', options: ['茁', '出', '拙', '屈'], clue: '這個字的上面是草字頭，下面是「出」。', explain: '答案是「茁」；「出」沒有草字頭，「拙」的左邊是提手旁。', parts: ['艹', '出'], story: '上面是草，下面是「出」。小草從土裡冒出來，越長越好，就是「茁長」；長得又健康又結實，叫「茁壯」。', sentence: '小樹苗在陽光下茁壯成長。', build: { layout: 'tb', show: ['？', '出'], answer: '艹', options: ['艹', '扌', '尸', '竹'], clue: '想一想：從土裡冒出來的嫩芽，上面放哪一個？' } }
    ],
    vocab: [
      { id: 'v-卓越', cloze: true, clozeOptions: ['卓越', '普通', '糟糕', '平凡'], word: '卓越', meaning: '非常優秀，比一般人好很多。', example: '這位醫生的醫術＿＿，救了很多人。', img: 'gold-medal.png', options: ['卓越', '茁壯', '無異', '欠缺'] },
      { id: 'v-培養', cloze: true, clozeOptions: ['培養', '丟掉', '忘記', '破壞'], word: '培養', meaning: '長時間慢慢訓練、照顧，讓它長成。', example: '每天閱讀可以＿＿好習慣。', img: 'grow-sprout.png', options: ['培養', '耕耘', '砥礪', '賺錢'] },
      { id: 'v-總裁', cloze: true, clozeOptions: ['總裁', '學生', '小孩', '路人'], word: '總裁', meaning: '大公司或大機構裡最高的負責人。', example: '這家公司的＿＿每天最早到辦公室。', img: 'boss-office.png', options: ['總裁', '方仲永', '瑣事', '間隔'] },
      { id: 'v-瑣事', cloze: true, clozeOptions: ['瑣事', '大事', '要事', '喜事'], word: '瑣事', meaning: '細小、零碎的雜務。', example: '媽媽每天忙著處理家裡的＿＿。', img: 'many-chores.png', options: ['瑣事', '總裁', '間隔', '耕耘'] },
      { id: 'v-方仲永', cloze: true, clozeOptions: ['方仲永', '孫悟空', '白雪公主', '小紅帽'], word: '方仲永', meaning: '宋朝一個從小很會寫詩、後來沒有繼續學習的孩子。', example: '大家都為＿＿＿的才能被浪費感到可惜。', img: 'old-poet-kid.png', options: ['方仲永', '總裁', '瑣事', '耕田'] },
      { id: 'v-耕田', cloze: true, clozeOptions: ['耕田', '游泳', '跳舞', '唱歌'], word: '耕田', meaning: '把土地翻鬆，準備種稻種菜。', example: '春天到了，農夫忙著＿＿。', img: 'farmer-plow.png', options: ['耕田', '賺錢', '耕耘', '培養'] },
      { id: 'v-賺錢', cloze: true, clozeOptions: ['賺錢', '花錢', '丟錢', '借錢'], word: '賺錢', meaning: '工作得到收入。', example: '爸爸每天辛苦工作＿＿養家。', img: 'coin-jar.png', options: ['賺錢', '耕田', '惋惜', '欠缺'] },
      { id: 'v-無異', cloze: true, clozeOptions: ['無異', '不同', '相反', '特別'], word: '無異', meaning: '一模一樣，沒有差別。', example: '這個蠟像做得和真人＿＿。', img: 'wax-figure.png', options: ['無異', '卓越', '茁壯', '惋惜'] },
      { id: 'v-惋惜', cloze: true, clozeOptions: ['惋惜', '高興', '得意', '慶幸'], word: '惋惜', meaning: '覺得好遺憾。', example: '他差一點就破紀錄，大家都為他感到＿＿。', img: 'sad-sigh.png', options: ['惋惜', '無異', '欠缺', '卓越'] },
      { id: 'v-欠缺', cloze: true, clozeOptions: ['欠缺', '充滿', '足夠', '豐富'], word: '欠缺', meaning: '不夠、少了。', example: '這支球隊＿＿一位好的守門員。', img: 'missing-piece.png', options: ['欠缺', '惋惜', '無異', '培養'] },
      { id: 'v-砥礪', cloze: true, clozeOptions: ['砥礪', '偷懶', '放棄', '逃避'], word: '砥礪', meaning: '像磨刀一樣，不斷磨練自己。', example: '我們互相＿＿，一起準備比賽。', img: 'whetstone.png', options: ['砥礪', '培養', '耕耘', '賺錢'] },
      { id: 'v-驕傲自滿', cloze: true, clozeOptions: ['驕傲自滿', '虛心學習', '謙虛有禮', '努力不懈'], word: '驕傲自滿', meaning: '覺得已經很了不起，不想再學。', example: '得了冠軍也不能＿＿＿＿，要繼續練習。', img: 'proud-kid.png', options: ['驕傲自滿', '日積月累', '持之以恆', '更上層樓'] },
      { id: 'v-耕耘', cloze: true, clozeOptions: ['耕耘', '偷懶', '睡覺', '玩耍'], word: '耕耘', meaning: '辛苦的付出努力。', example: '他在音樂上默默＿＿了好多年。', img: 'weeding.png', options: ['耕耘', '砥礪', '耕田', '培養'] },
      { id: 'v-間隔', cloze: true, clozeOptions: ['間隔', '顏色', '味道', '聲音'], word: '間隔', meaning: '兩樣東西當中空出來的距離或時候。', example: '公車每十分鐘的＿＿就來一班。', img: 'bus-stop.png', options: ['間隔', '瑣事', '總裁', '方仲永'] },
      { id: 'v-茁壯', cloze: true, clozeOptions: ['茁壯', '枯萎', '虛弱', '瘦小'], word: '茁壯', meaning: '長得又健康又結實。', example: '在大家的照顧下，小樹苗＿＿成長。', img: 'sprout-grow.png', options: ['茁壯', '卓越', '無異', '惋惜'] },
      { id: 'v-日積月累', cloze: true, clozeOptions: ['日積月累', '一步登天', '一蹴可幾', '半途而廢'], word: '日積月累', meaning: '時間久了，一點一點慢慢加起來。', example: '每天背五個單字，＿＿＿＿就會很厲害。', img: 'piggy-bank.png', options: ['日積月累', '持之以恆', '更上層樓', '驕傲自滿'] },
      { id: 'v-持之以恆', cloze: true, clozeOptions: ['持之以恆', '三心二意', '虎頭蛇尾', '半途而廢'], word: '持之以恆', meaning: '一直做下去，不放棄。', example: '學琴要＿＿＿＿，才會越彈越好。', img: 'practice-daily.png', options: ['持之以恆', '日積月累', '驕傲自滿', '更上層樓'] },
      { id: 'v-更上層樓', cloze: true, clozeOptions: ['更上層樓', '一落千丈', '停滯不前', '每況愈下'], word: '更上層樓', meaning: '再往前進步，到達比現在高的境界。', example: '他想讓自己的球技＿＿＿＿，每天都加練一小時。', img: 'climb-stairs.png', options: ['更上層樓', '日積月累', '持之以恆', '驕傲自滿'] }
    ],
    charwords: [
      { id: 'cw-卓', char: '卓', img: 'gold-medal.png', charMeaning: '特別突出。', word: '卓著', meaning: '成績特別好，大家都看得到。', example: '這位老師教學成效＿＿。', options: ['卓著', '栽培', '裁縫', '繁瑣'] },
      { id: 'cw-培', char: '培', img: 'grow-sprout.png', charMeaning: '照顧植物長大；訓練。', word: '栽培', meaning: '種植並細心照顧；也指培養人才。', example: '老師用心＿＿每一位學生。', options: ['栽培', '仲夏', '耕種', '賺取'] },
      { id: 'cw-裁', char: '裁', img: 'tailor.png', charMeaning: '用刀或剪刀剪開。', word: '裁縫', meaning: '把布剪好、縫成衣服。', example: '奶奶年輕時是一位＿＿師傅。', options: ['裁縫', '奇異', '哈欠', '磨礪'] },
      { id: 'cw-瑣', char: '瑣', img: 'many-chores.png', charMeaning: '細小零碎。', word: '繁瑣', meaning: '又多又細、很麻煩。', example: '整理舊照片是一件＿＿的工作。', options: ['繁瑣', '驕傲', '傲慢', '耕耘機'] },
      { id: 'cw-仲', char: '仲', img: 'summer-sun.png', charMeaning: '排在中間。', word: '仲夏', meaning: '夏天正中間、最熱的時候。', example: '＿＿的午後，蟬叫個不停。', options: ['仲夏', '隔壁', '茁長', '卓著'] },
      { id: 'cw-耕', char: '耕', img: 'farmer-plow.png', charMeaning: '翻土種田。', word: '耕種', meaning: '翻土、播種、照顧作物。', example: '爺爺在山上＿＿了一大片菜園。', options: ['耕種', '栽培', '裁縫', '繁瑣'] },
      { id: 'cw-賺', char: '賺', img: 'coin-jar.png', charMeaning: '得到錢。', word: '賺取', meaning: '工作得到收入。', example: '他利用假日打工，＿＿學費。', options: ['賺取', '仲夏', '耕種', '奇異'] },
      { id: 'cw-異', char: '異', img: 'strange-fish.png', charMeaning: '不一樣。', word: '奇異', meaning: '很奇特、不常見。', example: '森林裡傳來＿＿的聲音。', options: ['奇異', '哈欠', '磨礪', '驕傲'] },
      { id: 'cw-惋', char: '惋', img: 'sad-sigh.png', charMeaning: '可惜。', word: '令人惋惜', meaning: '讓人覺得很可惜。', example: '這麼好的機會錯過了，真是＿＿＿＿。', options: ['令人惋惜', '傲慢', '耕耘機', '隔壁'] },
      { id: 'cw-欠', char: '欠', img: 'yawn.png', charMeaning: '張口打哈欠；不夠。', word: '哈欠', meaning: '睏的時候張大嘴巴吸氣。', example: '熬夜以後，他一直打＿＿。', options: ['哈欠', '茁長', '卓著', '栽培'] },
      { id: 'cw-砥', char: '砥', img: 'whetstone.png', charMeaning: '磨刀石；磨練。', word: '中流砥柱', meaning: '像河中間的大石柱；比喻能撐起大局的人。', example: '隊長是球隊的＿＿＿＿。', options: ['中流砥柱', '裁縫', '繁瑣', '仲夏'] },
      { id: 'cw-礪', char: '礪', img: 'whetstone.png', charMeaning: '粗的磨刀石；磨練。', word: '磨礪', meaning: '在困難中把自己磨練得更好。', example: '經過多年的＿＿，他成了一位好廚師。', options: ['磨礪', '耕種', '賺取', '奇異'] },
      { id: 'cw-驕', char: '驕', img: 'proud-kid.png', charMeaning: '自以為了不起。', word: '驕傲', meaning: '覺得自己很了不起。', example: '他雖然很聰明，卻一點也不＿＿。', options: ['驕傲', '令人惋惜', '哈欠', '中流砥柱'] },
      { id: 'cw-傲', char: '傲', img: 'arrogant.png', charMeaning: '看不起別人。', word: '傲慢', meaning: '態度很高傲，看不起別人。', example: '他對店員的態度很＿＿，大家都看不下去。', options: ['傲慢', '磨礪', '驕傲', '耕耘機'] },
      { id: 'cw-耘', char: '耘', img: 'weeding.png', charMeaning: '除草；努力付出。', word: '耕耘機', meaning: '用來翻土的機器。', example: '農夫開著＿＿＿在田裡翻土。', options: ['耕耘機', '隔壁', '茁長', '卓著'] },
      { id: 'cw-隔', char: '隔', img: 'neighbor-wall.png', charMeaning: '中間分開。', word: '隔壁', meaning: '牆的另一邊，旁邊的房子或房間。', example: '我和＿＿的小明是好朋友。', options: ['隔壁', '栽培', '裁縫', '繁瑣'] },
      { id: 'cw-茁', char: '茁', img: 'sprout-grow.png', charMeaning: '植物長得好。', word: '茁長', meaning: '植物一天一天長大。', example: '春雨過後，秧苗＿＿得很快。', options: ['茁長', '仲夏', '耕種', '賺取'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-別出心裁', situationImg: 'id-unique-card.png',
        anim: { bg: 'school', a: { c1: ['💌', 20, 60, 10], c2: ['💌', 36, 60, 10], c3: ['💌', 52, 60, 10], pop: ['🎁', 78, 58, 13, 'h'], star: ['🌟', 78, 34, 9, 'h'] },
          s: [['大家做的卡片都長得差不多。', [['bob', 'c1'], ['bob', 'c2'], ['bob', 'c3']]],
            ['小美想了一個新點子，', [['in', 'star']]],
            ['做出一打開就會跳出小房子的立體卡片！', [['in', 'pop'], ['pop', 'pop']]],
            ['想出和別人不一樣的巧思，就是別出心裁。', [['jump', 'pop']]]] },
        idiom: '別出心裁', char: '裁', meaning: '想出和別人不一樣、很有創意的點子。', example: '他的科展作品別出心裁，得到評審的稱讚。', situation: '大家的卡片都一樣，小美做了一張會跳出小房子的立體卡片。',
        fill: { options: ['她用寶特瓶做成燈籠，真是＿＿＿＿。', '他照著課本一模一樣的做，一點也不＿＿＿＿。'], clue: '提示：哪一句是很有創意、和別人不一樣？', explain: '兩句意思相反。第一句用得對：用寶特瓶做燈籠很有創意。照著課本一模一樣，就不是別出心裁。' } },
      { id: 'i-伯仲之間', situationImg: 'id-two-runners.png',
        anim: { bg: 'park', a: { a: ['🏃', 14, 60, 12], b: ['🏃‍♀️', 14, 72, 12], flag: ['🏁', 88, 64, 12], eq: ['⚖️', 50, 26, 11, 'h'] },
          s: [['兩位選手一起起跑。', [['bob', 'a'], ['bob', 'b']]],
            ['一下你在前面，一下她在前面，', [['mv', 'a', [44, 60, 700]], ['mv', 'b', [50, 72, 700]], ['mv', 'a', [62, 60, 600]]]],
            ['兩個人幾乎同時衝過終點！', [['mv', 'a', [84, 60, 600]], ['mv', 'b', [84, 72, 600]]]],
            ['兩個人差不多厲害，就是伯仲之間。', [['in', 'eq']]]] },
        idiom: '伯仲之間', char: '仲', meaning: '兩個人或兩樣東西程度差不多，分不出高低。', example: '這兩位畫家的功力在伯仲之間。', situation: '兩位選手一下你前、一下她前，幾乎同時衝過終點。',
        fill: { options: ['兩位同學的成績在＿＿＿＿，很難說誰比較好。', '冠軍比第二名多了一百分，兩人在＿＿＿＿。'], clue: '提示：哪一句是兩人程度差不多？', explain: '第一句用得對：成績差不多。相差一百分，不是伯仲之間。' } },
      { id: 'i-異口同聲', situationImg: 'id-same-answer.png',
        anim: { bg: 'school', a: { t: ['🧑‍🏫', 16, 58, 13], q: ['❓', 16, 36, 9], a: ['🧒', 50, 64, 10], b: ['👧', 66, 64, 10], c: ['👦', 82, 64, 10], ans: ['💬', 66, 40, 14, 'h'] },
          s: [['老師問：「明天想去哪裡校外教學？」', [['wig', 'q']]],
            ['全班同學一起張開嘴巴，', [['bob', 'a'], ['bob', 'b'], ['bob', 'c']]],
            ['大聲說：「動物園！」', [['in', 'ans'], ['pop', 'ans']]],
            ['大家說出一樣的話，就是異口同聲。', [['jump', 'b']]]] },
        idiom: '異口同聲', char: '異', meaning: '很多人一起說出同樣的話。', example: '問大家要不要吃冰，全班異口同聲說要。', situation: '老師問校外教學想去哪裡，全班同學一起大喊「動物園」。',
        fill: { options: ['大家＿＿＿＿的說：「生日快樂！」', '每個人的答案都不一樣，大家＿＿＿＿。'], clue: '提示：哪一句是大家說出一樣的話？', explain: '第一句用得對：大家一起說生日快樂。答案都不一樣，就不是異口同聲。' } },
      { id: 'i-中流砥柱', situationImg: 'id-rock-river.png',
        anim: { bg: 'sea', a: { rock: ['🪨', 50, 56, 18], w1: ['🌊', 14, 50, 12], w2: ['🌊', 14, 66, 12], star: ['🌟', 50, 26, 9, 'h'] },
          s: [['河水嘩啦嘩啦的沖過來。', [['mv', 'w1', [36, 50, 800]], ['mv', 'w2', [36, 66, 800]]]],
            ['河中間有一根大石柱，', [['bob', 'rock']]],
            ['不管水多急，它都站得穩穩的。', [['mv', 'w1', [86, 40, 700]], ['mv', 'w2', [86, 74, 700]], ['shake', 'rock']]],
            ['能撐起大局、靠得住的人，就是中流砥柱。', [['in', 'star']]]] },
        idiom: '中流砥柱', char: '砥', meaning: '像急流中的大石柱；比喻在困難時能撐起大局、讓人依靠的人。', example: '在比賽最緊張的時候，隊長就是大家的中流砥柱。', situation: '河水很急，河中間的大石柱卻站得穩穩的。',
        fill: { options: ['她做事可靠，是班上的＿＿＿＿。', '他遇到事情就先逃走，是班上的＿＿＿＿。'], clue: '提示：哪一句說的是靠得住、能撐起大局的人？', explain: '第一句用得對：做事可靠的人。遇事就逃走，剛好相反。' } },
      { id: 'i-恃才傲物', situationImg: 'id-proud-genius.png',
        anim: { bg: 'school', a: { kid: ['🧒', 30, 62, 12], cup: ['🏆', 30, 40, 10], nose: ['😤', 30, 62, 12, 'h', 'as:kid'], f1: ['👦', 70, 64, 10], f2: ['👧', 84, 64, 10], sad: ['😞', 77, 40, 9, 'h'] },
          s: [['小強很聰明，每次都考第一名。', [['pop', 'cup']]],
            ['他抬高下巴，覺得自己最厲害，', [['out', 'kid'], ['in', 'nose']]],
            ['還看不起別的同學。', [['in', 'sad'], ['shake', 'f1']]],
            ['仗著有才能就很驕傲，就是恃才傲物。', [['shake', 'nose']]]] },
        idiom: '恃才傲物', char: '傲', meaning: '仗著自己有才能，就很驕傲、看不起別人。', example: '他很有才華，卻恃才傲物，大家都不喜歡和他合作。', situation: '小強每次考第一名，就抬高下巴，看不起別的同學。',
        fill: { options: ['他畫畫得了大獎就＿＿＿＿，說別人畫得很爛。', '她很有才能，卻很謙虛，從不＿＿＿＿。'], clue: '提示：哪一句是仗著才能而驕傲？', explain: '兩句意思相反。第一句用得對：得獎就看不起別人。謙虛的人，就不是恃才傲物。' } },
      { id: 'i-隔靴搔癢', situationImg: 'id-itchy-boot.png',
        anim: { bg: 'room', a: { boot: ['🥾', 50, 62, 16], hand: ['🖐️', 64, 50, 9], itch: ['〰️', 50, 46, 8], q: ['😣', 30, 36, 9, 'h'] },
          s: [['小明的腳好癢。', [['wig', 'itch']]],
            ['他隔著靴子用力抓，', [['mv', 'hand', [54, 56, 500]], ['shake', 'hand']]],
            ['抓了半天，還是好癢！', [['in', 'q'], ['wig', 'itch']]],
            ['沒抓到重點，問題沒解決，就是隔靴搔癢。', [['shake', 'q']]]] },
        idiom: '隔靴搔癢', char: '隔', meaning: '隔著靴子抓癢；比喻做事、說話沒抓到重點。', example: '他的建議太空泛，就像隔靴搔癢，幫不上忙。', situation: '小明的腳好癢，隔著靴子抓了半天還是很癢。',
        fill: { options: ['他說了一大堆，卻沒說到重點，真是＿＿＿＿。', '她一下子就找出問題，馬上解決，一點也不＿＿＿＿。'], clue: '提示：哪一句是沒抓到重點？', explain: '兩句意思相反。第一句用得對：說了一堆沒到重點。馬上解決問題，就不是隔靴搔癢。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-卓', char: '卓', wrong: '桌', sentence: '這位運動員的表現非常卓越。', options: ['卓', '桌', '草'], clue: '這裡是說非常優秀，想一想，哪一個字的下面是「早」？', explain: '要改成「卓」。非常優秀是「卓越」；「桌」是桌子的桌。' },
      { id: 'fx-培', char: '培', wrong: '陪', sentence: '我們要培養早睡早起的習慣。', options: ['培', '陪', '倍'], clue: '這裡是說慢慢訓練出來，想一想，哪一個字有土字旁？', explain: '要改成「培」。慢慢訓練是「培養」；「陪」是陪伴的陪。' },
      { id: 'fx-裁', char: '裁', wrong: '栽', sentence: '比賽時要聽裁判的哨音。', options: ['裁', '栽', '載'], clue: '這裡說的是判斷輸贏的人，想一想，哪一個字的下面是「衣」？', explain: '要改成「裁」。判斷輸贏的人是「裁判」；「栽」是栽種的栽。' },
      { id: 'fx-瑣', char: '瑣', wrong: '鎖', sentence: '他不喜歡處理瑣碎的小事。', options: ['瑣', '鎖', '項'], clue: '這裡是說細小零碎，想一想，哪一個字的左邊是「王」？', explain: '要改成「瑣」。細小零碎是「瑣碎」；「鎖」是門鎖的鎖。' },
      { id: 'fx-耕', char: '耕', wrong: '井', sentence: '農夫牽著牛去耕田。', options: ['耕', '井', '耘'], clue: '這裡是說翻土種田，想一想，哪一個字的左邊是「耒」？', explain: '要改成「耕」。翻土種田是「耕田」；「井」是水井的井。' },
      { id: 'fx-賺', char: '賺', wrong: '謙', sentence: '他開了一家小店賺錢養家。', options: ['賺', '謙', '嫌'], clue: '這裡是說工作得到收入，想一想，哪一個字有貝字旁？', explain: '要改成「賺」。得到收入是「賺錢」；「謙」是謙虛的謙。' },
      { id: 'fx-異', char: '異', wrong: '翼', sentence: '這兩張照片看起來幾乎無異。', options: ['異', '翼', '冀'], clue: '這裡是說沒有差別，想一想，哪一個字的上面沒有「羽」？', explain: '要改成「異」。沒有差別是「無異」；「翼」是翅膀的意思。' },
      { id: 'fx-惋', char: '惋', wrong: '婉', sentence: '大家都為他的失誤感到惋惜。', options: ['惋', '婉', '碗'], clue: '這裡是說覺得可惜，想一想，哪一個字有豎心旁？', explain: '要改成「惋」。覺得可惜是「惋惜」；「婉」是委婉的婉。' },
      { id: 'fx-欠', char: '欠', wrong: '次', sentence: '這篇作文還欠缺一個好結尾。', options: ['欠', '次', '吹'], clue: '這裡是說不夠、少了，想一想，哪一個字的左邊沒有兩點？', explain: '要改成「欠」。不夠是「欠缺」；「次」是第一次的次。' },
      { id: 'fx-砥', char: '砥', wrong: '抵', sentence: '同學們互相砥礪，一起進步。', options: ['砥', '抵', '低'], clue: '這裡是說像磨刀一樣磨練，想一想，哪一個字有石字旁？', explain: '要改成「砥」。磨練是「砥礪」；「抵」是抵抗的抵。' },
      { id: 'fx-礪', char: '礪', wrong: '勵', sentence: '困難的磨礪讓他變得更堅強。', options: ['礪', '勵', '厲'], clue: '這裡是說在困難中磨練，想一想，哪一個字有石字旁？', explain: '要改成「礪」。在困難中磨練是「磨礪」；「勵」是鼓勵的勵。' },
      { id: 'fx-驕', char: '驕', wrong: '嬌', sentence: '得了獎也不能驕傲。', options: ['驕', '嬌', '橋'], clue: '這裡是說覺得自己很了不起，想一想，哪一個字的左邊是「馬」？', explain: '要改成「驕」。覺得自己了不起是「驕傲」；「嬌」是撒嬌的嬌。' },
      { id: 'fx-傲', char: '傲', wrong: '熬', sentence: '他說話的樣子很傲慢。', options: ['傲', '熬', '遨'], clue: '這裡是說看不起別人，想一想，哪一個字有單人旁？', explain: '要改成「傲」。看不起別人是「傲慢」；「熬」是熬湯的熬。' },
      { id: 'fx-耘', char: '耘', wrong: '芸', sentence: '一分耕耘，一分收穫。', options: ['耘', '芸', '雲'], clue: '這裡是說辛苦付出，想一想，哪一個字的左邊是「耒」？', explain: '要改成「耘」。辛苦付出是「耕耘」；「芸」的上面是草字頭。' },
      { id: 'fx-隔', char: '隔', wrong: '融', sentence: '我家隔壁開了一家麵包店。', options: ['隔', '融', '膈'], clue: '這裡說的是牆的另一邊，想一想，哪一個字有阜字旁？', explain: '要改成「隔」。牆的另一邊是「隔壁」；「融」是融化的融。' },
      { id: 'fx-茁', char: '茁', wrong: '拙', sentence: '小樹苗一天天茁壯起來。', options: ['茁', '拙', '出'], clue: '這裡是說長得健康結實，想一想，哪一個字有草字頭？', explain: '要改成「茁」。長得健康結實是「茁壯」；「拙」是笨拙的拙。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿子」是吃飯、寫字時放東西的家具。', sentence: '請把書放在＿子上。', frame: '＿子', options: ['桌', '卓'], answer: '桌', clue: '提示：這個字的下面是「木」。', explain: '答案是「桌」；「卓」是卓越的卓，下面是「早」。' },
      { id: 's2', meaning: '「＿伴」是待在旁邊，一起度過。', sentence: '週末我＿伴奶奶去公園散步。', frame: '＿伴', options: ['陪', '培'], answer: '陪', clue: '提示：這個字的左邊是阜字旁。', explain: '答案是「陪」；「培」是培養的培，有土字旁。' },
      { id: 's3', meaning: '「＿種」是把植物種下去。', sentence: '我們在校園＿種了一排小樹。', frame: '＿種', options: ['栽', '裁'], answer: '栽', clue: '提示：和植物有關，下面是「木」。', explain: '答案是「栽」；「裁」是裁縫的裁，下面是「衣」。' },
      { id: 's4', meaning: '「門＿」是讓門打不開的金屬小東西。', sentence: '出門前記得把門＿好。', frame: '門＿', options: ['鎖', '瑣'], answer: '鎖', clue: '提示：用金屬做的，左邊是金字旁。', explain: '答案是「鎖」；「瑣」是瑣事的瑣。' },
      { id: 's5', meaning: '「水＿」是往地下挖、可以取水的深洞。', sentence: '村子裡有一口古老的水＿。', frame: '水＿', options: ['井', '耕'], answer: '井', clue: '提示：這個字沒有偏旁。', explain: '答案是「井」；「耕」是耕田的耕。' },
      { id: 's6', meaning: '「＿虛」是不驕傲、願意聽別人的意見。', sentence: '他得了獎還是很＿虛。', frame: '＿虛', options: ['謙', '賺'], answer: '謙', clue: '提示：和說話有關，左邊是言字旁。', explain: '答案是「謙」；「賺」是賺錢的賺。' },
      { id: 's7', meaning: '「飯＿」是裝飯的器具。', sentence: '弟弟把飯＿裡的飯吃光了。', frame: '飯＿', options: ['碗', '惋'], answer: '碗', clue: '提示：這個字的左邊是石字旁。', explain: '答案是「碗」；「惋」是惋惜的惋。' },
      { id: 's8', meaning: '「＿風」是用嘴巴把氣送出去。', sentence: '他對著蠟燭用力一＿，蠟燭就熄了。', frame: '一＿', options: ['吹', '欠'], answer: '吹', clue: '提示：要用嘴巴，左邊是口字旁。', explain: '答案是「吹」；「欠」是哈欠的欠。' },
      { id: 's9', meaning: '「高＿」是高的和矮的。', sentence: '大家按照高＿排好隊。', frame: '高＿', options: ['低', '砥'], answer: '低', clue: '提示：這個字的左邊是單人旁。', explain: '答案是「低」；「砥」是砥礪的砥。' },
      { id: 's10', meaning: '「鼓＿」是給別人打氣、加油。', sentence: '老師的鼓＿讓我更有信心。', frame: '鼓＿', options: ['勵', '礪'], answer: '勵', clue: '提示：這個字的右邊是「力」。', explain: '答案是「勵」；「礪」是磨礪的礪。' },
      { id: 's11', meaning: '「＿梁」是架在河上讓人通過的建築。', sentence: '這座＿梁連接了兩個村子。', frame: '＿梁', options: ['橋', '驕'], answer: '橋', clue: '提示：以前常用木頭做，左邊是木字旁。', explain: '答案是「橋」；「驕」是驕傲的驕。' },
      { id: 's12', meaning: '「白＿」是天上白白的、一朵一朵的東西。', sentence: '藍天上飄著幾朵白＿。', frame: '白＿', options: ['雲', '耘'], answer: '雲', clue: '提示：和天氣有關，上面是雨字頭。', explain: '答案是「雲」；「耘」是耕耘的耘。' }
    ],
    listen: [
      { id: 'l1', text: '這位醫生的醫術非常好，比一般人厲害很多。', answer: 0, options: [{ text: '卓越', img: 'gold-medal.png' }, { text: '茁壯', img: 'sprout-grow.png' }, { text: '無異', img: 'wax-figure.png' }, { text: '惋惜', img: 'sad-sigh.png' }] },
      { id: 'l2', text: '蠟像做得和真人一模一樣。', answer: 0, options: [{ text: '無異', img: 'wax-figure.png' }, { text: '卓越', img: 'gold-medal.png' }, { text: '欠缺', img: 'missing-piece.png' }, { text: '培養', img: 'grow-sprout.png' }] },
      { id: 'l3', text: '差一點就破紀錄，大家都覺得好可惜。', answer: 0, options: [{ text: '惋惜', img: 'sad-sigh.png' }, { text: '欠缺', img: 'missing-piece.png' }, { text: '驕傲自滿', img: 'proud-kid.png' }, { text: '砥礪', img: 'whetstone.png' }] },
      { id: 'l4', text: '每天存一點錢，時間久了就存了一大筆。', answer: 0, options: [{ text: '日積月累', img: 'piggy-bank.png' }, { text: '持之以恆', img: 'practice-daily.png' }, { text: '更上層樓', img: 'climb-stairs.png' }, { text: '驕傲自滿', img: 'proud-kid.png' }] },
      { id: 'l5', text: '拿到冠軍就覺得自己最厲害，不想再練習。', answer: 0, options: [{ text: '驕傲自滿', img: 'proud-kid.png' }, { text: '持之以恆', img: 'practice-daily.png' }, { text: '日積月累', img: 'piggy-bank.png' }, { text: '砥礪', img: 'whetstone.png' }] },
      { id: 'l6', text: '媽媽每天忙著處理家裡細細碎碎的事。', answer: 0, options: [{ text: '瑣事', img: 'many-chores.png' }, { text: '總裁', img: 'boss-office.png' }, { text: '間隔', img: 'bus-stop.png' }, { text: '耕田', img: 'farmer-plow.png' }] },
      { id: 'l7', text: '小樹苗長得又健康又結實。', answer: 0, options: [{ text: '茁壯', img: 'sprout-grow.png' }, { text: '卓越', img: 'gold-medal.png' }, { text: '惋惜', img: 'sad-sigh.png' }, { text: '無異', img: 'wax-figure.png' }] },
      { id: 'l8', text: '學琴每天都練，一直不放棄。', answer: 0, options: [{ text: '持之以恆', img: 'practice-daily.png' }, { text: '驕傲自滿', img: 'proud-kid.png' }, { text: '更上層樓', img: 'climb-stairs.png' }, { text: '日積月累', img: 'piggy-bank.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '追求更', answer: '怎麼樣', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看想追求更怎麼樣的東西。',
      /* 短語：（動詞）更＋形容詞＋的＋名詞（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '畫出更漂亮的作品', img: 'pr-better-art.png',
        parts: [{ text: '畫出更', role: '追求更' }, { text: '漂亮', role: '怎麼樣' }, { text: '的' }, { text: '作品', role: '什麼東西' }],
        explain: '先說要做什麼，加上「更」，再說想變成的樣子，加上「的」，最後說是什麼東西。' },
      pick: [
        { id: 'ph1', img: 'pr-fast-swim.png', before: '游出更', noun: '成績', ask: '游出更什麼樣的成績', look: '再看看圖片，他這次游得比上次快嗎？', options: ['優秀', '糟糕', '緩慢', '普通'], clue: '提示：比上次少了好幾秒，拿到第一名。', explain: '答案是「優秀」，完整的短語是「游出更優秀的成績」。' },
        { id: 'ph2', img: 'pr-tidy-desk.png', before: '整理出更', noun: '書桌', ask: '整理出更什麼樣的書桌', look: '再看看圖片，書桌上的東西排得怎麼樣？', options: ['整齊', '凌亂', '骯髒', '破舊'], clue: '提示：每樣東西都放回原位，排得好好的。', explain: '答案是「整齊」，完整的短語是「整理出更整齊的書桌」。' },
        { id: 'ph3', img: 'pr-tasty-cake.png', before: '烤出更', noun: '蛋糕', ask: '烤出更什麼樣的蛋糕', look: '再看看圖片，大家吃了表情怎麼樣？', options: ['美味', '難吃', '焦黑', '乾硬'], clue: '提示：每個人吃一口都豎起大拇指。', explain: '答案是「美味」，完整的短語是「烤出更美味的蛋糕」。' },
        { id: 'ph4', img: 'pr-strong-body.png', before: '練出更', noun: '身體', ask: '練出更什麼樣的身體', look: '再看看圖片，他的手臂怎麼樣？', options: ['強壯', '虛弱', '瘦小', '疲倦'], clue: '提示：每天運動，現在可以輕鬆搬起重物。', explain: '答案是「強壯」，完整的短語是「練出更強壯的身體」。' },
        { id: 'ph5', img: 'pr-clear-voice.png', before: '唱出更', noun: '歌聲', ask: '唱出更什麼樣的歌聲', look: '再看看圖片，大家聽了怎麼樣？', options: ['動聽', '刺耳', '沙啞', '微弱'], clue: '提示：大家閉上眼睛，好陶醉。', explain: '答案是「動聽」，完整的短語是「唱出更動聽的歌聲」。' },
        { id: 'ph6', img: 'pr-bright-room.png', before: '布置出更', noun: '教室', ask: '布置出更什麼樣的教室', look: '再看看圖片，教室看起來怎麼樣？', options: ['溫馨', '冷清', '凌亂', '陰暗'], clue: '提示：牆上貼滿大家的作品，讓人好想待在裡面。', explain: '答案是「溫馨」，完整的短語是「布置出更溫馨的教室」。' },
        { id: 'ph7', img: 'pr-good-story.png', before: '寫出更', noun: '故事', ask: '寫出更什麼樣的故事', look: '再看看圖片，讀故事的人有沒有笑？', options: ['精采', '無聊', '短小', '模糊'], clue: '提示：大家讀得捨不得放下，一直想知道後面發生什麼事。', explain: '答案是「精采」，完整的短語是「寫出更精采的故事」。' },
        { id: 'ph8', img: 'pr-big-tree3.png', before: '種出更', noun: '大樹', ask: '種出更什麼樣的大樹', look: '再看看圖片，這棵樹長得怎麼樣？', options: ['茂盛', '枯黃', '矮小', '光禿'], clue: '提示：枝葉又多又密，像一把大傘。', explain: '答案是「茂盛」，完整的短語是「種出更茂盛的大樹」。' }
      ],
      say: [],
      words: [
        { word: '日積月累', meaning: '時間久了，一點一點慢慢加起來。', img: 'piggy-bank.png' },
        { word: '持之以恆', meaning: '一直做下去，不放棄。', img: 'practice-daily.png' },
        { word: '更上層樓', meaning: '再往前進步，到達比現在高的境界。', img: 'climb-stairs.png' },
        { word: '驕傲自滿', meaning: '覺得已經很了不起，不想再學。', img: 'proud-kid.png' }
      ],
      choose: [
        { id: 'pw1', word: '日積月累', options: ['每天讀一頁書，日積月累也能讀完一大本。', '他第一天就讀完一百本書，真是日積月累。'], clue: '提示：想一想，「日積月累」是慢慢累積，還是一下子完成？', explain: '第一句用得對：每天一點點慢慢累積。一天讀完一百本，不是日積月累。' },
        { id: 'pw2', word: '持之以恆', options: ['他持之以恆的練跑，終於跑完全程馬拉松。', '他跑了一天就放棄，真是持之以恆。'], clue: '提示：想一想，「持之以恆」是一直做，還是很快放棄？', explain: '第一句用得對：一直練跑不放棄。跑一天就放棄，剛好相反。' },
        { id: 'pw3', word: '更上層樓', options: ['她希望明年的成績能更上層樓。', '他的成績越來越差，真是更上層樓。'], clue: '提示：想一想，「更上層樓」是進步，還是退步？', explain: '第一句用得對：希望更進步。越來越差，剛好相反。' },
        { id: 'pw4', word: '驕傲自滿', options: ['考了滿分就驕傲自滿，下次可能會失敗。', '她很謙虛，總是驕傲自滿的向別人請教。'], clue: '提示：想一想，「驕傲自滿」是謙虛，還是自以為了不起？', explain: '第一句用得對：考滿分就自以為了不起。謙虛請教，剛好相反。' }
      ],
      make: [
        { id: 'pm1', word: '日積月累', clue: '提示：想想看，什麼事是每天做一點，慢慢變厲害？', model: '每天練習寫字，日積月累，我的字越寫越漂亮。' },
        { id: 'pm2', word: '持之以恆', clue: '提示：想想看，你有沒有一直堅持做的事？', model: '我持之以恆的每天跳繩，現在可以連跳兩百下。' },
        { id: 'pm3', word: '更上層樓', clue: '提示：想想看，你希望自己哪方面再進步？', model: '我要多練習，讓自己的鋼琴更上層樓。' },
        { id: 'pm4', word: '驕傲自滿', clue: '提示：想想看，驕傲自滿會帶來什麼結果？', model: '贏了一次就驕傲自滿，很容易被別人追上。' }
      ]
    },
    pattern: [
      { key: 'bushiershi', id: 'be', title: '不是……而是……', img: 'bushiershi.png',
        meaning: '先用「不是」說出大家以為的答案，再用「而是」說出真正的答案。',
        examples: ['他缺少的不是才華，而是努力。'],
        match: [
          { id: 'pt-be-m1', img: 'pt-tired-kid.png', front: '他上課打瞌睡，不是因為懶惰，', options: ['而是昨晚照顧妹妹。', '而是因為很懶惰。', '而是上課很好玩。'], clue: '提示：看看圖片，他昨晚在做什麼？', explain: '答案是「而是昨晚照顧妹妹」：真正的原因和大家以為的不同。' },
          { id: 'pt-be-m2', img: 'pt-win-team.png', front: '球隊能贏，不是靠一個人，', options: ['而是大家合作。', '而是一個人。', '而是運氣很差。'], clue: '提示：看看圖片，贏球的是幾個人？', explain: '答案是「而是大家合作」：真正贏的原因是合作。' },
          { id: 'pt-be-m3', img: 'pt-gift-card.png', front: '最珍貴的禮物不是昂貴的東西，', options: ['而是真心的祝福。', '而是很貴的東西。', '而是一個盒子。'], clue: '提示：看看圖片，收到卡片的人為什麼這麼開心？', explain: '答案是「而是真心的祝福」：真正珍貴的是心意。' }
        ],
        conj: [
          { id: 'pt-be-c1', full: '我遲到不是故意的，而是公車誤點了。', img: 'pt-late-bus.png', sentence: '我遲到＿＿故意的，＿＿公車誤點了。', options: ['不是……而是……', '不僅……而且……', '只要……一定……'], clue: '提示：先說不是什麼，再說真正的原因。數數看有幾個空格。', explain: '答案是「不是……而是……」：我遲到不是故意的，而是公車誤點了。' },
          { id: 'pt-be-c2', full: '成功不是靠運氣，而是靠努力。', img: 'pt-hard-work.png', sentence: '成功＿＿靠運氣，＿＿靠努力。', options: ['不是……而是……', '不僅……而且……', '只要……一定……'], clue: '提示：成功真正靠的是什麼？數數看有幾個空格。', explain: '答案是「不是……而是……」：成功不是靠運氣，而是靠努力。' }
        ],
        half: [
          { id: 'pt-be-h1', front: '她哭不是因為難過，', clue: '提示：她為什麼哭？說出真正的原因。記得要說「而是」。', model: '而是太感動了。' },
          { id: 'pt-be-h2', front: '小狗一直叫不是想吵人，', clue: '提示：小狗真正想做什麼？記得要說「而是」。', model: '而是想提醒我們有人來了。' }
        ],
        whole: [
          { id: 'pt-be-w1', clue: '提示：先用「不是」說大家以為的，再用「而是」說真正的答案。想想看：有什麼事常被別人誤會？', model: '我喜歡畫畫不是因為想得獎，而是畫畫讓我很快樂。' }
        ] },
      { key: 'bujinerqie', id: 'bq', title: '不僅……而且……', img: 'bujinerqie.png',
        meaning: '先用「不僅」說一件事，再用「而且」說出更進一步的事，表示不只一樣。',
        examples: ['他不僅會寫詩，而且寫得又快又好。'],
        match: [
          { id: 'pt-bq-m1', img: 'pt-kind-leader.png', front: '班長不僅功課好，', options: ['而且很樂於助人。', '而且功課很好。', '而且常常遲到。'], clue: '提示：看看圖片，班長還在做什麼？', explain: '答案是「而且很樂於助人」：功課好，又樂於助人。' },
          { id: 'pt-bq-m2', img: 'pt-big-park.png', front: '這座公園不僅很大，', options: ['而且有很多設施。', '而且真的非常大。', '而且都沒有人去。'], clue: '提示：看看圖片，公園裡還有什麼？', explain: '答案是「而且有很多設施」：又大又好玩。' },
          { id: 'pt-bq-m3', img: 'pt-fast-cook.png', front: '媽媽煮菜不僅快，', options: ['而且非常好吃。', '而且很快。', '而且很難吃。'], clue: '提示：看看圖片，家人吃得開不開心？', explain: '答案是「而且非常好吃」：又快又好吃。' }
        ],
        conj: [
          { id: 'pt-bq-c1', full: '這本書不僅有趣，而且讓我學到很多。', img: 'pt-fun-book.png', sentence: '這本書＿＿有趣，＿＿讓我學到很多。', options: ['不僅……而且……', '不是……而是……', '只要……一定……'], clue: '提示：兩個優點，一個比一個更進一步。數數看有幾個空格。', explain: '答案是「不僅……而且……」：這本書不僅有趣，而且讓我學到很多。' },
          { id: 'pt-bq-c2', full: '運動不僅讓身體健康，而且讓心情變好。', img: 'pt-run-happy.png', sentence: '運動＿＿讓身體健康，＿＿讓心情變好。', options: ['不僅……而且……', '不是……而是……', '只要……一定……'], clue: '提示：運動有兩個好處。數數看有幾個空格。', explain: '答案是「不僅……而且……」：運動不僅讓身體健康，而且讓心情變好。' }
        ],
        half: [
          { id: 'pt-bq-h1', front: '我的好朋友不僅很聰明，', clue: '提示：好朋友還有什麼優點？記得要說「而且」。', model: '而且很會說笑話。' },
          { id: 'pt-bq-h2', front: '這次的旅行不僅好玩，', clue: '提示：旅行還帶給你什麼？記得要說「而且」。', model: '而且讓我認識了新朋友。' }
        ],
        whole: [
          { id: 'pt-bq-w1', clue: '提示：先用「不僅」說一件事，再用「而且」說更進一步的事。想想看：有什麼人或東西有兩個優點？', model: '我的老師不僅很有耐心，而且很會說故事。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'parallel', name: '排比', meaning: '把三句或三句以上樣子差不多的話，一句接一句排在一起說，讀起來很有節奏，也很有氣勢。', example: '課文說運動員追求更好的表現、音樂家追求更好的演奏、科學家追求更好的研究，三句排在一起，很有力量。',
          show: { sentence: '我要更努力，更勇敢，更有耐心。', mark: ['更努力', '更勇敢', '更有耐心'] },
          yesno: [
            { id: 'rh-pa-y1', sentence: '畫家追求更美的畫，歌手追求更好的歌，廚師追求更香的菜。', answer: true, mark: ['畫家追求更美的畫', '歌手追求更好的歌', '廚師追求更香的菜'], clue: '提示：有沒有三句樣子差不多的話排在一起？', explain: '是排比：三句「……追求更……」排在一起。' },
            { id: 'rh-pa-y2', sentence: '畫家在畫畫。', answer: false, clue: '提示：有沒有三句樣子差不多的話排在一起？', explain: '不是排比：只有一句話。' }
          ],
          pick: [
            { id: 'rh-pa-p1', mark: ['多讀書', '多運動', '多思考'], options: ['我們要多讀書，多運動，多思考。', '我們要努力。'], clue: '提示：哪一句一口氣說了三個「多……」？', explain: '三個「多……」排在一起，是排比。' },
            { id: 'rh-pa-p2', mark: ['昨天的我', '今天的我', '明天的我'], options: ['昨天的我很努力，今天的我更努力，明天的我會最努力。', '我每天都很努力。'], clue: '提示：哪一句有三句樣子差不多的話？', explain: '三句「……的我……」排在一起，是排比。' },
            { id: 'rh-pa-p3', mark: ['不怕難', '不怕累', '不怕輸'], options: ['他不怕難，不怕累，不怕輸。', '他很勇敢。', '他在比賽。'], clue: '提示：哪一句一口氣說了三個「不怕……」？', explain: '三個「不怕……」排在一起，是排比。' },
            { id: 'rh-pa-p4', mark: ['用眼睛觀察', '用耳朵傾聽', '用心思考'], options: ['用眼睛觀察，用耳朵傾聽，用心思考。', '上課要專心。', '老師在說話。'], clue: '提示：哪一句有三個「用……」？', explain: '三個「用……」排在一起，是排比。' },
            { id: 'rh-pa-p5', mark: ['有的會畫畫', '有的會唱歌', '有的會跑步'], options: ['同學們有的會畫畫，有的會唱歌，有的會跑步。', '同學們都很棒。', '班上有三十人。', '大家像一家人。'], clue: '提示：哪一句有三個「有的……」？', explain: '三個「有的……」排在一起，是排比。' },
            { id: 'rh-pa-p6', mark: ['更快', '更高', '更強'], options: ['跑得更快，跳得更高，變得更強。', '他在練習。', '他是選手。', '他很努力。'], clue: '提示：哪一句有三句樣子差不多的話？', explain: '三句「……得更……」排在一起，是排比。' }
          ] },
        { key: 'exclaim', name: '感嘆', meaning: '說話時加上「啊」、「哇」、「唉」這些聲音，或用驚嘆號，把心裡的驚訝、高興、難過大聲的說出來。', example: '課文最後用驚嘆號說一定可以成為更好的自己，把信心大聲的喊出來。',
          show: { sentence: '加油！你一定做得到！', mark: ['加油！'] },
          yesno: [
            { id: 'rh-ex-y1', sentence: '哇！我終於學會游泳了！', answer: true, mark: ['哇！'], clue: '提示：這句話有沒有用「哇」和驚嘆號？', explain: '是感嘆：「哇」說出了驚喜。' },
            { id: 'rh-ex-y2', sentence: '我學會游泳了。', answer: false, clue: '提示：這句話有沒有用嘆詞或驚嘆號，把心情喊出來？', explain: '不是感嘆：這句話只是說出事情。' }
          ],
          pick: [
            { id: 'rh-ex-p1', mark: ['太棒了！'], options: ['太棒了！我進步了！', '我的成績進步了。'], clue: '提示：哪一句用驚嘆號把高興喊出來？', explain: '「太棒了！」是感嘆。' },
            { id: 'rh-ex-p2', mark: ['唉！'], options: ['唉！又錯了一題。', '我錯了一題。'], clue: '提示：哪一句用「唉」說出失望？', explain: '「唉！」是感嘆。' },
            { id: 'rh-ex-p3', mark: ['哇！'], options: ['哇！這座山好高！', '這座山很高。', '我們在爬山。'], clue: '提示：哪一句用「哇」說出驚訝？', explain: '「哇！」是感嘆。' },
            { id: 'rh-ex-p4', mark: ['加油！'], options: ['加油！再試一次！', '他再試了一次。', '他失敗了。'], clue: '提示：哪一句用驚嘆號大聲打氣？', explain: '「加油！」是感嘆。' },
            { id: 'rh-ex-p5', mark: ['真不敢相信！'], options: ['真不敢相信！我拿到第一名！', '我拿到第一名。', '比賽結束了。', '大家回家了。'], clue: '提示：哪一句用驚嘆號說出驚喜？', explain: '「真不敢相信！」是感嘆。' },
            { id: 'rh-ex-p6', mark: ['啊！'], options: ['啊！我忘了帶作業！', '我沒帶作業。', '作業在桌上。', '老師在收作業。'], clue: '提示：哪一句用「啊」說出驚慌？', explain: '「啊！」是感嘆。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '我們要更專心，更認真，更有恆心。', answer: '排比', mark: ['更專心', '更認真', '更有恆心'], clue: '提示：有沒有三句樣子差不多的話？', explain: '答案是「排比」：三個「更……」排在一起。' },
        { id: 'rh2', sentence: '春天播種，夏天除草，秋天收成。', answer: '排比', mark: ['春天播種', '夏天除草', '秋天收成'], clue: '提示：有沒有三句樣子差不多的話？', explain: '答案是「排比」：三句「……天……」排在一起。' },
        { id: 'rh3', sentence: '哇！你進步好多！', answer: '感嘆', mark: ['哇！'], clue: '提示：這句話有沒有用「哇」和驚嘆號？', explain: '答案是「感嘆」：用「哇」說出驚喜。' },
        { id: 'rh4', sentence: '唉！我又睡過頭了。', answer: '感嘆', mark: ['唉！'], clue: '提示：這句話有沒有用「唉」說出心情？', explain: '答案是「感嘆」：用「唉」說出懊惱。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L03 = d; }
})(this);
