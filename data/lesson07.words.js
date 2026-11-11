/* 第 7 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'infer', qe: 'infer', qf: 'infer', qg: 'interpret', qh: 'interpret',
      qi: 'evaluate', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qg: { think: ['作者一開始怎麼看當地人穿比腳小的拖鞋？', '聽了朋友的解釋以後，他的想法變成怎樣？'], why: '作者原本覺得當地人不懂穿鞋，後來才知道雨季很長，鞋子小一點才不會把衣服弄髒。他從看不起變成尊重，學會放下自己的舊想法。' },
      qh: { think: ['作者聽到有人說「這是常識」時，為什麼替對方擔心？', '每個地方的「常識」都一樣嗎？'], why: '每個地方的天氣、生活不同，常識也不同。一個人如果用自己的常識去笑別人，反而顯出自己懂得不夠多。' },
      qi: { think: ['作者舉了哪兩個地方的例子？', '這兩個例子有什麼相同的地方？'], why: '一個是穿小拖鞋，一個是搶坐別人坐過的位子。兩個例子都說明：別人奇怪的做法，背後常有和天氣、環境有關的道理。' },
      qj: { think: ['你有沒有覺得別人的習慣很奇怪的經驗？', '後來你知道背後的原因了嗎？'], why: '先說出你原本覺得奇怪的地方，再說你後來知道的原因，以及你的想法有沒有改變，就是很好的回答。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['我以前覺得吃飯用手很奇怪，後來知道那是一些地方的傳統。', '我以前覺得外婆省水很奇怪，後來知道她小時候缺水。'], bad: ['別人跟我不一樣，就是他們錯。', '我從來不想知道別人為什麼這樣做。'], why: '題目問的是你有沒有「原本覺得奇怪，後來懂了」的經驗。說出原本的想法和後來知道的原因，就是好回答。認為不一樣就是錯、不想了解，都不是尊重的態度。' },
      k2: { good: ['我會先問他為什麼這樣做，再決定怎麼想。', '我會想一想，他的環境可能和我不一樣。'], bad: ['我會直接笑他沒常識。', '我會叫大家一起不要理他。'], why: '題目問的是遇到和你習慣不同的人，你會怎麼做。先了解原因、想想對方的環境，就是尊重。笑別人、排擠別人，都不是好做法。' }
    },
    hanzi: [
      { id: 'h-仰', combo: { layout: 'lr', parts: [['亻', 'm', '人'], ['卬', 's', '']] }, char: '仰', zhuyin: 'ㄧㄤˇ', radical: '人', strokes: 6, words: ['仰光', '仰望'], say: '仰，仰望的仰', cloze: '＿望', img: 'look-up-stars.png', options: ['仰', '抑', '迎', '昂'], clue: '這個字的左邊是單人旁。', explain: '答案是「仰」，左邊是單人旁；「抑」的左邊是提手旁，「迎」有辵字旁。', parts: ['亻', '卬'], story: '左邊是人，右邊的「卬」像一個人抬頭往上看。人把頭抬起來往上看，就是「仰」。', sentence: '我們躺在草地上仰望星空。', build: { layout: 'lr', show: ['？', '卬'], answer: '亻', options: ['亻', '扌', '辶', '日'], clue: '想一想：抬頭往上看的是誰？' } },
      { id: 'h-緬', combo: { layout: 'lr', parts: [['糸', 'm', '絲線'], ['面', 's', '']] }, char: '緬', zhuyin: 'ㄇㄧㄢˇ', radical: '糸', strokes: 15, words: ['緬甸', '緬懷'], say: '緬，緬懷的緬', cloze: '＿懷', img: 'myanmar-map.png', options: ['緬', '麵', '湎', '靦'], clue: '這個字的左邊是糸字旁。', explain: '答案是「緬」，左邊是糸字旁；「麵」的左邊是「麥」，「湎」的左邊是三點水。', parts: ['糸', '面'], story: '左邊是絲線，右邊的「面」念起來像「緬」。絲線長長的，像想念一直牽著；懷念過去的人，叫「緬懷」。', sentence: '大家在紀念日緬懷這位老校長。', build: { layout: 'lr', show: ['？', '面'], answer: '糸', options: ['糸', '麥', '月', '氵'], clue: '想一想：長長牽著的是什麼？' } },
      { id: 'h-甸', combo: { type: '形聲字', pict: '外面的「勹」像包起來，裡面是「田」。古時候把城外的田地圍起來，就是「甸」。' }, char: '甸', zhuyin: 'ㄉㄧㄢˋ', radical: '田', strokes: 7, words: ['緬甸', '沉甸甸'], say: '甸，緬甸的甸', cloze: '緬＿', img: 'heavy-bag.png', options: ['甸', '句', '旬', '匍'], clue: '這個字的外面是「勹」，裡面是「田」。', explain: '答案是「甸」；「句」的裡面是「口」，「旬」的裡面是「日」。', parts: ['勹', '田'], story: '外面包起來，裡面是田。東西很重、往下墜，叫「沉甸甸」；東南亞有個國家叫「緬甸」。', sentence: '收成好，稻穗沉甸甸的垂下來。' },
      { id: 'h-踝', combo: { layout: 'lr', parts: [['足', 'm', '腳'], ['果', 's', '']] }, char: '踝', zhuyin: 'ㄏㄨㄞˊ', radical: '足', strokes: 15, words: ['腳踝', '踝骨'], say: '踝，腳踝的踝', cloze: '＿骨', img: 'ankle.png', options: ['踝', '裸', '課', '棵'], clue: '這個字的左邊是足字旁。', explain: '答案是「踝」，左邊是足字旁；「課」的左邊是言字旁，「棵」的左邊是木字旁。', parts: ['足', '果'], story: '左邊是腳，右邊的「果」像一顆圓圓的果子。腳上兩邊凸起來、圓圓的骨頭，就是「踝」。', sentence: '他打球時扭傷了腳踝。', build: { layout: 'lr', show: ['？', '果'], answer: '足', options: ['足', '衤', '言', '木'], clue: '想一想：凸起來的骨頭在身體哪裡？' } },
      { id: 'h-絨', combo: { layout: 'lr', parts: [['糸', 'm', '絲線'], ['戎', 's', '']] }, char: '絨', zhuyin: 'ㄖㄨㄥˊ', radical: '糸', strokes: 12, words: ['呢絨', '絨毛'], say: '絨，絨毛的絨', cloze: '＿毛', img: 'soft-teddy.png', options: ['絨', '戎', '賊', '械'], clue: '這個字的左邊是糸字旁。', explain: '答案是「絨」，左邊是糸字旁；「賊」的左邊是「貝」，「械」的左邊是木字旁。', parts: ['糸', '戎'], story: '左邊是絲線，右邊的「戎」念起來像「絨」。又細又軟的毛，摸起來好舒服，就是「絨毛」。', sentence: '小鴨身上長滿黃色的絨毛。', build: { layout: 'lr', show: ['？', '戎'], answer: '糸', options: ['糸', '貝', '木', '氵'], clue: '想一想：又細又軟的布料和什麼有關？' } },
      { id: 'h-濺', combo: { layout: 'lr', parts: [['氵', 'm', '水'], ['賤', 's', '']] }, char: '濺', zhuyin: 'ㄐㄧㄢˋ', radical: '水', strokes: 18, words: ['濺起', '噴濺'], say: '濺，濺起的濺', cloze: '噴＿', img: 'puddle-splash.png', options: ['濺', '賤', '錢', '踐'], clue: '這個字的左邊是三點水。', explain: '答案是「濺」，左邊是三點水；「錢」的左邊是金字旁，「踐」的左邊是足字旁。', parts: ['氵', '賤'], story: '左邊是水，右邊的「賤」念起來像「濺」。水被打到，向四周噴出去，就是「濺」。', sentence: '車子開過水坑，濺起好大的水花。', build: { layout: 'lr', show: ['？', '賤'], answer: '氵', options: ['氵', '金', '足', '貝'], clue: '想一想：向四周噴出去的是什麼？' } },
      { id: 'h-襬', combo: { layout: 'lr', parts: [['衤', 'm', '衣服'], ['罷', 's', '']] }, char: '襬', zhuyin: 'ㄅㄞˇ', radical: '衣', strokes: 20, words: ['下襬', '裙襬'], say: '襬，裙襬的襬', cloze: '裙＿', img: 'skirt-hem.png', options: ['襬', '擺', '罷', '羆'], clue: '這個字的左邊是衣字旁。', explain: '答案是「襬」，左邊是衣字旁；「擺」的左邊是提手旁，「罷」沒有偏旁。', parts: ['衤', '罷'], story: '左邊是衣服，右邊的「罷」念起來像「襬」。衣服或裙子最下面那一圈，就是「下襬」。', sentence: '她一轉圈，裙襬就飛了起來。', build: { layout: 'lr', show: ['？', '罷'], answer: '衤', options: ['衤', '扌', '罒', '木'], clue: '想一想：裙子最下面那一圈，是什麼東西的一部分？' } },
      { id: 'h-弄', combo: { type: '會意字', pict: '上面是「王」，像一塊玉；下面的「廾」像兩隻手。兩隻手捧著玉在把玩，就是「弄」。' }, char: '弄', zhuyin: 'ㄋㄨㄥˋ', radical: '廾', strokes: 7, words: ['弄溼', '捉弄'], say: '弄，捉弄的弄', cloze: '捉＿', img: 'muddy-shoes.png', options: ['弄', '弁', '玩', '卉'], clue: '這個字的上面是「王」，下面是「廾」。', explain: '答案是「弄」；「玩」的左邊是「王」，「卉」的上面是「十」。', parts: ['王', '廾'], story: '上面像一塊玉，下面像兩隻手。用手拿著東西玩，就是「弄」；開玩笑整人，叫「捉弄」。', sentence: '哥哥喜歡捉弄弟弟。' },
      { id: 'h-恣', combo: { layout: 'tb', parts: [['次', 's', ''], ['心', 'm', '心']] }, char: '恣', zhuyin: 'ㄗˋ', radical: '心', strokes: 10, words: ['恣意', '恣情'], say: '恣，恣意的恣', cloze: '＿意', img: 'kid-messy.png', options: ['恣', '姿', '資', '咨'], clue: '這個字的下面是「心」。', explain: '答案是「恣」，下面是「心」；「姿」的下面是「女」，「資」的下面是「貝」。', parts: ['次', '心'], story: '上面的「次」念起來像「恣」，下面是心。隨著自己的心想做什麼就做什麼，就是「恣意」。', sentence: '他恣意在牆上亂畫，被老師罵了。', build: { layout: 'tb', show: ['次', '？'], answer: '心', options: ['心', '女', '貝', '口'], clue: '想一想：想做什麼就做什麼，跟著什麼走？' } },
      { id: 'h-批', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['比', 's', '']] }, char: '批', zhuyin: 'ㄆㄧ', radical: '手', strokes: 7, words: ['批判', '批評'], say: '批，批評的批', cloze: '＿評', img: 'teacher-comment.png', options: ['批', '比', '庇', '屁'], clue: '這個字的左邊是提手旁。', explain: '答案是「批」，左邊是提手旁；「比」沒有提手旁，「庇」的外面是「广」。', parts: ['扌', '比'], story: '左邊是手，右邊是「比」。用手寫下比較的結果，說出好壞，就是「批評」。', sentence: '他接受大家的批評，努力改進。', build: { layout: 'lr', show: ['？', '比'], answer: '扌', options: ['扌', '毛', '口', '木'], clue: '想一想：寫下評語要用身體的哪個部分？' } },
      { id: 'h-徑', combo: { layout: 'lr', parts: [['彳', 'm', '走路'], ['巠', 's', '']] }, char: '徑', zhuyin: 'ㄐㄧㄥˋ', radical: '彳', strokes: 10, words: ['行徑', '路徑'], say: '徑，路徑的徑', cloze: '路＿', img: 'forest-trail.png', options: ['徑', '經', '莖', '頸'], clue: '這個字的左邊是雙人旁。', explain: '答案是「徑」，左邊是雙人旁；「經」的左邊是糸字旁，「莖」的上面是草字頭。', parts: ['彳', '巠'], story: '左邊的「彳」和走路有關，右邊的「巠」念起來像「徑」。可以走的小路，就是「徑」；人的行為，叫「行徑」。', sentence: '這條路徑可以通到山頂。', build: { layout: 'lr', show: ['？', '巠'], answer: '彳', options: ['彳', '糸', '艹', '頁'], clue: '想一想：小路和什麼動作有關？' } },
      { id: 'h-謹', combo: { layout: 'lr', parts: [['言', 'm', '說話'], ['堇', 's', '']] }, char: '謹', zhuyin: 'ㄐㄧㄣˇ', radical: '言', strokes: 18, words: ['謹記', '謹慎'], say: '謹，謹慎的謹', cloze: '＿慎', img: 'careful-walk.png', options: ['謹', '僅', '勤', '瑾'], clue: '這個字的左邊是言字旁。', explain: '答案是「謹」，左邊是言字旁；「僅」的左邊是單人旁，「勤」的右邊是「力」。', parts: ['言', '堇'], story: '左邊是說話，右邊的「堇」念起來像「謹」。說話做事都很小心，就是「謹慎」。', sentence: '過馬路要謹慎，左右都要看。', build: { layout: 'lr', show: ['？', '堇'], answer: '言', options: ['言', '亻', '力', '王'], clue: '想一想：小心說話，左邊放哪一個？' } },
      { id: 'h-恰', combo: { layout: 'lr', parts: [['忄', 'm', '心'], ['合', 's', '']] }, char: '恰', zhuyin: 'ㄑㄧㄚˋ', radical: '心', strokes: 9, words: ['恰恰', '恰好'], say: '恰，恰好的恰', cloze: '＿好', img: 'puzzle-fit.png', options: ['恰', '洽', '拾', '給'], clue: '這個字的左邊是豎心旁。', explain: '答案是「恰」，左邊是豎心旁；「洽」的左邊是三點水，「拾」的左邊是提手旁。', parts: ['忄', '合'], story: '左邊是心，右邊是「合」。心裡想的和事情剛好合在一起，就是「恰好」。', sentence: '我到車站時，公車恰好來了。', build: { layout: 'lr', show: ['？', '合'], answer: '忄', options: ['忄', '氵', '扌', '糸'], clue: '想一想：剛好合在一起，是哪裡的感覺？' } },
      { id: 'h-乏', combo: { type: '指事字', pict: '「乏」是把「正」字反過來寫，表示不夠、缺少，和「正」相反。' }, char: '乏', zhuyin: 'ㄈㄚˊ', radical: '丿', strokes: 5, words: ['乏人問津', '缺乏'], say: '乏，缺乏的乏', cloze: '缺＿', img: 'empty-shop.png', options: ['乏', '之', '芝', '泛'], clue: '這個字只有五畫，上面是一撇。', explain: '答案是「乏」；「之」只有三畫，「泛」的左邊是三點水。', parts: ['丿', '之'], story: '「乏」像把「正」反過來寫，表示不夠。東西不夠、沒有了，就是「缺乏」。', sentence: '沙漠裡缺乏水。' },
      { id: 'h-皆', combo: { layout: 'tb', parts: [['比', 's', ''], ['白', 'm', '說話']] }, char: '皆', zhuyin: 'ㄐㄧㄝ', radical: '白', strokes: 9, words: ['皆是', '皆大歡喜'], say: '皆，皆大歡喜的皆', cloze: '＿大歡喜', img: 'happy-crowd.png', options: ['皆', '階', '楷', '偕'], clue: '這個字的上面是「比」，下面是「白」。', explain: '答案是「皆」；「階」的左邊是阜字旁，「楷」的左邊是木字旁。', parts: ['比', '白'], story: '上面的「比」像好幾個人並排，下面的「白」是說話。大家一起說同樣的話，表示「全部、都」，就是「皆」。', sentence: '比賽結果皆大歡喜，大家都很開心。', build: { layout: 'tb', show: ['比', '？'], answer: '白', options: ['白', '日', '目', '口'], clue: '想一想：上面是「比」，下面放哪一個？' } },
      { id: 'h-嗤', combo: { layout: 'lr', parts: [['口', 'm', '嘴巴'], ['蚩', 's', '']] }, char: '嗤', zhuyin: 'ㄔ', radical: '口', strokes: 13, words: ['嗤之以鼻', '嗤笑'], say: '嗤，嗤笑的嗤', cloze: '＿笑', img: 'sneer.png', options: ['嗤', '蚩', '媸', '痴'], clue: '這個字的左邊是口字旁。', explain: '答案是「嗤」，左邊是口字旁；「媸」的左邊是女字旁，「痴」的外面是病字旁。', parts: ['口', '蚩'], story: '左邊是口，右邊的「蚩」念起來像「嗤」。從嘴巴、鼻子發出看不起人的冷笑聲，就是「嗤」。', sentence: '他嗤笑別人，卻沒發現自己也做錯了。', build: { layout: 'lr', show: ['？', '蚩'], answer: '口', options: ['口', '女', '疒', '虫'], clue: '想一想：冷笑聲是從哪裡發出來的？' } },
      { id: 'h-嗯', combo: { layout: 'lr', parts: [['口', 'm', '嘴巴'], ['恩', 's', '']] }, char: '嗯', zhuyin: 'ㄣ', radical: '口', strokes: 13, words: ['嗯', '嗯，好'], say: '嗯，嗯好的嗯', cloze: '＿，好', img: 'nod-ok.png', options: ['嗯', '恩', '思', '摁'], clue: '這個字的左邊是口字旁。', explain: '答案是「嗯」，左邊是口字旁；「恩」沒有口字旁，「摁」的左邊是提手旁。', parts: ['口', '恩'], story: '左邊是口，右邊的「恩」念起來有點像「嗯」。嘴巴發出答應、同意的聲音，就是「嗯」。', sentence: '媽媽問我吃飽沒，我說：「嗯，吃飽了。」', build: { layout: 'lr', show: ['？', '恩'], answer: '口', options: ['口', '扌', '心', '田'], clue: '想一想：答應的聲音從哪裡發出來？' } }
    ],
    vocab: [
      { id: 'v-仰光', cloze: true, clozeOptions: ['仰光', '月球', '火星', '海底'], word: '仰光', meaning: '東南亞一個國家裡最大的城市。', example: '＿＿到了雨季，天天都在下雨。', img: 'rainy-city.png', options: ['仰光', '緬甸', '腳踝', '呢絨'] },
      { id: 'v-緬甸', cloze: true, clozeOptions: ['緬甸', '南極', '月亮', '沙漠'], word: '緬甸', meaning: '在亞洲東南部、和泰國相鄰的國家。', example: '＿＿的雨季很長，大約有半年。', img: 'myanmar-map.png', options: ['緬甸', '仰光', '呢絨', '下襬'] },
      { id: 'v-腳踝', cloze: true, clozeOptions: ['腳踝', '頭頂', '耳朵', '手指'], word: '腳踝', meaning: '小腿下方、兩邊凸起的圓圓骨頭。', example: '他跳下來時扭到了＿＿。', img: 'ankle.png', options: ['腳踝', '下襬', '呢絨', '行徑'] },
      { id: 'v-呢絨', cloze: true, clozeOptions: ['呢絨', '鐵板', '玻璃', '石頭'], word: '呢絨', meaning: '用動物的毛織成、摸起來軟軟的布料。', example: '這頂帽子是用＿＿做的，很保暖。', img: 'soft-teddy.png', options: ['呢絨', '腳踝', '下襬', '緬甸'] },
      { id: 'v-濺起', cloze: true, clozeOptions: ['濺起', '收起', '關起', '藏起'], word: '濺起', meaning: '液體被打到，向四周噴出來。', example: '小石頭丟進池塘，＿＿一圈水花。', img: 'puddle-splash.png', options: ['濺起', '弄溼', '批判', '謹記'] },
      { id: 'v-下襬', cloze: true, clozeOptions: ['下襬', '帽子', '鞋帶', '領口'], word: '下襬', meaning: '衣服或裙子最底部的那一圈。', example: '騎車時，裙子的＿＿要收好。', img: 'skirt-hem.png', options: ['下襬', '腳踝', '呢絨', '仰光'] },
      { id: 'v-弄溼', cloze: true, clozeOptions: ['弄溼', '晒乾', '吹乾', '烘乾'], word: '弄溼', meaning: '讓東西沾到水，變得不乾。', example: '下雨天，我的鞋子都被＿＿了。', img: 'muddy-shoes.png', options: ['弄溼', '濺起', '謹記', '恣意'] },
      { id: 'v-恣意', cloze: true, clozeOptions: ['恣意', '小心', '謹慎', '乖巧'], word: '恣意', meaning: '想做什麼就做什麼，不管規矩。', example: '他＿＿亂丟垃圾，大家都很生氣。', img: 'kid-messy.png', options: ['恣意', '批判', '謹記', '恰恰'] },
      { id: 'v-批判', cloze: true, clozeOptions: ['批判', '稱讚', '鼓勵', '誇獎'], word: '批判', meaning: '評論、說出別人哪裡不對。', example: '不了解原因，就不要隨便＿＿別人。', img: 'teacher-comment.png', options: ['批判', '恣意', '謹記', '弄溼'] },
      { id: 'v-行徑', cloze: true, clozeOptions: ['行徑', '天氣', '風景', '食物'], word: '行徑', meaning: '一個人的動作和所做的事。', example: '他偷偷摸摸的＿＿，讓人起疑心。', img: 'sneaky-kid.png', options: ['行徑', '下襬', '腳踝', '呢絨'] },
      { id: 'v-謹記', cloze: true, clozeOptions: ['謹記', '忘記', '丟掉', '不管'], word: '謹記', meaning: '小心的牢牢放在心上。', example: '我會＿＿老師的叮嚀。', img: 'careful-walk.png', options: ['謹記', '批判', '恣意', '濺起'] },
      { id: 'v-恰恰', cloze: true, clozeOptions: ['恰恰', '一點也不', '完全沒有', '從來不'], word: '恰恰', meaning: '剛好、正好。', example: '他以為我生氣，事實＿＿相反。', img: 'puzzle-fit.png', options: ['恰恰', '恣意', '謹記', '嗯'] },
      { id: 'v-乏人問津', cloze: true, clozeOptions: ['乏人問津', '大排長龍', '人山人海', '門庭若市'], word: '乏人問津', meaning: '沒有誰來詢價或注意。', example: '這家店的東西太貴，＿＿＿＿。', img: 'empty-shop.png', options: ['乏人問津', '嗤之以鼻', '理所當然', '受用不盡'] },
      { id: 'v-放之四海而皆準', cloze: true, clozeOptions: ['放之四海而皆準', '只能在家裡用', '只在一地有用', '到哪裡都不對'], word: '放之四海而皆準', meaning: '拿到任何地方，都是對的、都能用。', example: '守信用是＿＿＿＿＿＿＿的道理。', img: 'world-globe.png', options: ['放之四海而皆準', '乏人問津', '嗤之以鼻', '捏一把冷汗'] },
      { id: 'v-嗤之以鼻', cloze: true, clozeOptions: ['嗤之以鼻', '拍手叫好', '點頭稱讚', '豎起拇指'], word: '嗤之以鼻', meaning: '冷笑一聲，表示看不起。', example: '別人說出新點子，他卻＿＿＿＿。', img: 'sneer.png', options: ['嗤之以鼻', '乏人問津', '理所當然', '恰恰'] },
      { id: 'v-嗯', cloze: true, clozeOptions: ['嗯', '哼', '喂', '咦'], word: '嗯', meaning: '表示答應、同意的聲音。', example: '「明天一起去嗎？」「＿，好啊！」', img: 'nod-ok.png', options: ['嗯', '恰恰', '恣意', '批判'] },
      { id: 'v-理所當然', cloze: true, clozeOptions: ['理所當然', '莫名其妙', '不可思議', '出乎意料'], word: '理所當然', meaning: '照規矩、照情況就應該是這樣。', example: '幫忙做家事是＿＿＿＿的事。', img: 'nod-ok.png', options: ['理所當然', '受用不盡', '乏人問津', '嗤之以鼻'] },
      { id: 'v-受用不盡', cloze: true, clozeOptions: ['受用不盡', '毫無幫助', '一點沒用', '白費力氣'], word: '受用不盡', meaning: '得到的好處多得一輩子也享之無窮。', example: '奶奶教我的道理，讓我＿＿＿＿。', img: 'treasure-box.png', options: ['受用不盡', '理所當然', '捏一把冷汗', '乏人問津'] },
      { id: 'v-捏一把冷汗', cloze: true, clozeOptions: ['捏一把冷汗', '笑得合不攏嘴', '輕鬆自在', '開心大笑'], word: '捏一把冷汗', meaning: '非常擔心、緊張的樣子。', example: '看他走鋼索，大家都替他＿＿＿＿＿。', img: 'worried-crowd.png', options: ['捏一把冷汗', '受用不盡', '理所當然', '嗤之以鼻'] }
    ],
    charwords: [
      { id: 'cw-仰', char: '仰', img: 'look-up-stars.png', charMeaning: '抬頭往上看。', word: '仰望', meaning: '抬起頭往上看。', example: '我們一起＿＿天上的月亮。', options: ['仰望', '緬懷', '沉甸甸', '踝骨'] },
      { id: 'cw-緬', char: '緬', img: 'myanmar-map.png', charMeaning: '遙遠；想念。', word: '緬懷', meaning: '想念過去的人或事。', example: '大家來到紀念館＿＿英雄。', options: ['緬懷', '絨毛', '噴濺', '裙襬'] },
      { id: 'cw-甸', char: '甸', img: 'heavy-bag.png', charMeaning: '用在國名；很重的樣子。', word: '沉甸甸', meaning: '很重、往下墜的樣子。', example: '書包裝滿了書，＿＿＿的。', options: ['沉甸甸', '捉弄', '恣情', '批評'] },
      { id: 'cw-踝', char: '踝', img: 'ankle.png', charMeaning: '腳兩邊凸起的骨頭。', word: '踝骨', meaning: '腳兩邊凸起的骨頭。', example: '他跌倒時撞到了＿＿。', options: ['踝骨', '路徑', '謹慎', '恰好'] },
      { id: 'cw-絨', char: '絨', img: 'soft-teddy.png', charMeaning: '細軟的毛。', word: '絨毛', meaning: '又細又軟的毛。', example: '小兔子身上的＿＿摸起來好舒服。', options: ['絨毛', '缺乏', '皆是', '嗤笑'] },
      { id: 'cw-濺', char: '濺', img: 'puddle-splash.png', charMeaning: '液體向四周噴出。', word: '噴濺', meaning: '液體被打到，向四處噴出來。', example: '油鍋＿＿出熱油，要小心。', options: ['噴濺', '仰望', '緬懷', '沉甸甸'] },
      { id: 'cw-襬', char: '襬', img: 'skirt-hem.png', charMeaning: '衣服最下面的部分。', word: '裙襬', meaning: '裙子最下面的那一圈。', example: '她跳舞時，＿＿像花一樣張開。', options: ['裙襬', '踝骨', '絨毛', '噴濺'] },
      { id: 'cw-弄', char: '弄', img: 'muddy-shoes.png', charMeaning: '用手玩；做、使變成。', word: '捉弄', meaning: '開玩笑整別人。', example: '不要＿＿同學，他會難過。', options: ['捉弄', '裙襬', '路徑', '謹慎'] },
      { id: 'cw-恣', char: '恣', img: 'kid-messy.png', charMeaning: '隨心所欲，不受約束。', word: '恣情', meaning: '照著自己的心情，盡情去做。', example: '放暑假了，孩子們在海邊＿＿玩耍。', options: ['恣情', '恰好', '缺乏', '皆是'] },
      { id: 'cw-批', char: '批', img: 'teacher-comment.png', charMeaning: '評論好壞。', word: '批評', meaning: '說出別人的缺點或錯誤。', example: '他虛心接受大家的＿＿。', options: ['批評', '嗤笑', '仰望', '緬懷'] },
      { id: 'cw-徑', char: '徑', img: 'forest-trail.png', charMeaning: '小路；行為。', word: '路徑', meaning: '走過去的路線。', example: '螞蟻排隊沿著同一條＿＿走。', options: ['路徑', '沉甸甸', '踝骨', '絨毛'] },
      { id: 'cw-謹', char: '謹', img: 'careful-walk.png', charMeaning: '小心。', word: '謹慎', meaning: '做事說話都很小心。', example: '做實驗要＿＿，不能亂來。', options: ['謹慎', '噴濺', '裙襬', '捉弄'] },
      { id: 'cw-恰', char: '恰', img: 'puzzle-fit.png', charMeaning: '剛好。', word: '恰好', meaning: '剛好、正好。', example: '這雙鞋＿＿合我的腳。', options: ['恰好', '恣情', '批評', '路徑'] },
      { id: 'cw-乏', char: '乏', img: 'empty-shop.png', charMeaning: '缺少、不夠。', word: '缺乏', meaning: '不夠，少了什麼。', example: '植物＿＿陽光就長不好。', options: ['缺乏', '謹慎', '恰好', '仰望'] },
      { id: 'cw-皆', char: '皆', img: 'happy-crowd.png', charMeaning: '全部、都。', word: '皆是', meaning: '全部都是。', example: '海灘上貝殼比比＿＿。', options: ['皆是', '缺乏', '緬懷', '沉甸甸'] },
      { id: 'cw-嗤', char: '嗤', img: 'sneer.png', charMeaning: '冷笑聲。', word: '嗤笑', meaning: '冷冷的笑，看不起別人。', example: '他被別人＿＿，卻沒有放棄。', options: ['嗤笑', '踝骨', '絨毛', '噴濺'] },
      { id: 'cw-嗯', char: '嗯', img: 'nod-ok.png', charMeaning: '答應的聲音。', word: '嗯了一聲', meaning: '發出表示答應的聲音。', example: '他＿＿＿＿，表示知道了。', options: ['嗯了一聲', '嗤笑', '恰好', '缺乏'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-仰人鼻息', situationImg: 'id-follow-boss.png',
        anim: { bg: 'room', a: { boss: ['🤴', 30, 58, 13], kid: ['🧒', 66, 64, 11], face: ['😠', 30, 36, 9, 'h'], sweat: ['😰', 66, 42, 9, 'h'] },
          s: [['小王做什麼事都要先看大哥的臉色。', [['bob', 'kid']]],
            ['大哥皺眉頭，他就不敢動；', [['in', 'face'], ['in', 'sweat']]],
            ['大哥笑了，他才敢說話。', [['out', 'face'], ['out', 'sweat']]],
            ['依靠別人、看別人臉色做事，就是仰人鼻息。', [['shake', 'kid']]]] },
        idiom: '仰人鼻息', char: '仰', meaning: '依靠別人過日子，凡事都要看別人的臉色，不能自己作主。', example: '他想自己賺錢，不想再仰人鼻息。', situation: '小王做什麼都要先看大哥臉色，大哥皺眉他就不敢動。',
        fill: { options: ['他希望早點獨立，不再＿＿＿＿。', '他自己作主、自己決定，總是＿＿＿＿。'], clue: '提示：哪一句是說不想看別人臉色過日子？', explain: '第一句用得對：想獨立，不再看別人臉色。自己作主，剛好相反。' } },
      { id: 'i-弄巧成拙', situationImg: 'id-backfire.png',
        anim: { bg: 'room', a: { kid: ['🧒', 30, 62, 12], cake: ['🎂', 60, 62, 12], fire: ['🔥', 60, 46, 9, 'h'], oops: ['😱', 30, 38, 9, 'h'] },
          s: [['小美想讓媽媽的蛋糕更漂亮。', [['bob', 'cake']]],
            ['她偷偷插了好多根蠟燭，', [['wig', 'cake']]],
            ['結果奶油融化，蛋糕塌下去了！', [['in', 'fire'], ['shake', 'cake'], ['in', 'oops']]],
            ['想要表現聰明，反而把事情弄糟，就是弄巧成拙。', [['shake', 'kid']]]] },
        idiom: '弄巧成拙', char: '弄', meaning: '本來想表現聰明，結果反而把事情弄糟了。', example: '他想幫忙修玩具，卻弄巧成拙，把玩具弄壞了。', situation: '小美想讓蛋糕更漂亮，插了太多蠟燭，結果蛋糕塌了。',
        fill: { options: ['他想把圖畫得更好，多塗了幾筆，結果＿＿＿＿。', '他照著步驟慢慢做，作品很成功，真是＿＿＿＿。'], clue: '提示：哪一句是想做得更好卻弄糟了？', explain: '第一句用得對：多塗幾筆反而變糟。作品成功，不是弄巧成拙。' } },
      { id: 'i-恣心所欲', situationImg: 'id-do-as-like.png',
        anim: { bg: 'park', a: { kid: ['🧒', 40, 64, 12], ball: ['⚽', 60, 70, 8], kite: ['🪁', 70, 24, 10], sun: ['☀️', 86, 14, 10] },
          s: [['放暑假了，沒有作業，也沒有考試。', [['wig', 'sun']]],
            ['小明想踢球就踢球，', [['jump', 'ball']]],
            ['想放風箏就放風箏。', [['wig', 'kite'], ['jump', 'kid']]],
            ['完全照著自己的心意去做，就是恣心所欲。', [['bob', 'kid']]]] },
        idiom: '恣心所欲', char: '恣', meaning: '完全照著自己的心意去做事。', example: '放假時可以放鬆，但也不能恣心所欲，什麼規矩都不管。', situation: '暑假沒有作業，小明想踢球就踢球，想放風箏就放風箏。',
        fill: { options: ['在家裡也不能＿＿＿＿，要遵守家裡的規矩。', '他做事很守規矩，總是＿＿＿＿。'], clue: '提示：想一想，這個成語是守規矩，還是照自己的心意亂來？', explain: '第一句用得對：提醒不能想做什麼就做什麼。守規矩剛好相反。' } },
      { id: 'i-分身乏術', situationImg: 'id-too-busy.png',
        anim: { bg: 'room', a: { mom: ['👩', 50, 60, 13], baby: ['👶', 22, 64, 10], pot: ['🍲', 78, 62, 10], phone: ['📱', 50, 36, 8, 'h'], sweat: ['💦', 62, 40, 8, 'h'] },
          s: [['媽媽在煮飯，', [['wig', 'pot']]],
            ['寶寶哭了，電話也響了，', [['shake', 'baby'], ['in', 'phone'], ['wig', 'phone']]],
            ['媽媽急得團團轉，', [['in', 'sweat'], ['mv', 'mom', [36, 60, 400]], ['mv', 'mom', [64, 60, 400]]]],
            ['忙得沒辦法同時照顧那麼多事，就是分身乏術。', [['shake', 'mom']]]] },
        idiom: '分身乏術', char: '乏', meaning: '非常忙碌，沒辦法再同時做別的事。', example: '爸爸這週要加班又要照顧阿公，真是分身乏術。', situation: '媽媽在煮飯，寶寶哭了，電話也響了，忙得團團轉。',
        fill: { options: ['期末考又要準備比賽，我＿＿＿＿。', '他整天沒事做，在家躺著，真是＿＿＿＿。'], clue: '提示：哪一句是忙得沒辦法同時做好多事？', explain: '第一句用得對：考試和比賽一起來，太忙了。整天沒事做，剛好相反。' } },
      { id: 'i-比比皆是', situationImg: 'id-everywhere.png',
        anim: { bg: 'park', a: { s1: ['🐚', 20, 72, 8], s2: ['🐚', 40, 66, 8, 'h'], s3: ['🐚', 60, 74, 8, 'h'], s4: ['🐚', 80, 68, 8, 'h'], kid: ['🧒', 50, 50, 11] },
          s: [['我們到海邊散步。', [['bob', 'kid']]],
            ['沙灘上有一個貝殼，', [['pop', 's1']]],
            ['兩個、三個、四個……到處都是！', [['in', 's2'], ['in', 's3'], ['in', 's4']]],
            ['到處都有、多得很，就是比比皆是。', [['jump', 'kid']]]] },
        idiom: '比比皆是', char: '皆', meaning: '到處都是，非常多。', example: '這條街上，賣飲料的店比比皆是。', situation: '沙灘上的貝殼一個、兩個、三個……到處都是。',
        fill: { options: ['春天的公園裡，盛開的花朵＿＿＿＿。', '這種稀有的鳥很難看到，在山上＿＿＿＿。'], clue: '提示：哪一句是到處都有？', explain: '第一句用得對：花到處都開了。很難看到的稀有鳥，剛好相反。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-仰', char: '仰', wrong: '抑', sentence: '他抬頭仰望高高的大樓。', options: ['仰', '抑', '迎'], clue: '這裡是說抬頭往上看，想一想，哪一個字有單人旁？', explain: '要改成「仰」。抬頭看是「仰望」；「抑」是壓抑的抑。' },
      { id: 'fx-緬', char: '緬', wrong: '麵', sentence: '我們在緬甸看到很多佛塔。', options: ['緬', '麵', '湎'], clue: '這裡說的是一個國家，想一想，哪一個字有糸字旁？', explain: '要改成「緬」。國名是「緬甸」；「麵」是吃的麵。' },
      { id: 'fx-踝', char: '踝', wrong: '課', sentence: '跑步前先轉一轉腳踝。', options: ['踝', '課', '裸'], clue: '這裡說的是腳兩邊凸起的骨頭，想一想，哪一個字有足字旁？', explain: '要改成「踝」。腳上的骨頭是「腳踝」；「課」是上課的課。' },
      { id: 'fx-絨', char: '絨', wrong: '賊', sentence: '這隻小熊玩偶的絨毛好軟。', options: ['絨', '賊', '戎'], clue: '這裡說的是細細軟軟的毛，想一想，哪一個字有糸字旁？', explain: '要改成「絨」。細軟的毛是「絨毛」；「賊」是小偷。' },
      { id: 'fx-濺', char: '濺', wrong: '踐', sentence: '雨水濺到我的褲子上。', options: ['濺', '踐', '錢'], clue: '這裡是說水向四周噴出，想一想，哪一個字有三點水？', explain: '要改成「濺」。水噴出來是「濺」；「踐」是實踐的踐。' },
      { id: 'fx-襬', char: '襬', wrong: '擺', sentence: '他的襯衫下襬沒有紮好。', options: ['襬', '擺', '罷'], clue: '這裡說的是衣服最下面那一圈，想一想，哪一個字有衣字旁？', explain: '要改成「襬」。衣服下緣是「下襬」；「擺」是擺放的擺。' },
      { id: 'fx-恣', char: '恣', wrong: '姿', sentence: '不能恣意破壞公物。', options: ['恣', '姿', '資'], clue: '這裡是說想怎樣就怎樣，想一想，哪一個字的下面是「心」？', explain: '要改成「恣」。任性亂來是「恣意」；「姿」是姿勢的姿。' },
      { id: 'fx-批', char: '批', wrong: '比', sentence: '老師批改我們的作文。', options: ['批', '比', '庇'], clue: '這裡是說寫下評語、改正錯誤，想一想，哪一個字有提手旁？', explain: '要改成「批」。改作業是「批改」；「比」是比賽的比。' },
      { id: 'fx-徑', char: '徑', wrong: '經', sentence: '公園裡有一條花草小徑。', options: ['徑', '經', '莖'], clue: '這裡說的是小路，想一想，哪一個字有雙人旁？', explain: '要改成「徑」。小路是「小徑」；「經」是經過的經。' },
      { id: 'fx-謹', char: '謹', wrong: '僅', sentence: '開車要謹慎小心。', options: ['謹', '僅', '勤'], clue: '這裡是說非常小心，想一想，哪一個字有言字旁？', explain: '要改成「謹」。小心是「謹慎」；「僅」是僅僅的僅。' },
      { id: 'fx-恰', char: '恰', wrong: '洽', sentence: '這件衣服的大小恰好合身。', options: ['恰', '洽', '拾'], clue: '這裡是說剛好，想一想，哪一個字有豎心旁？', explain: '要改成「恰」。剛好是「恰好」；「洽」是融洽的洽。' },
      { id: 'fx-乏', char: '乏', wrong: '泛', sentence: '他跑完步，覺得很疲乏。', options: ['乏', '泛', '之'], clue: '這裡是說累、沒力氣，想一想，哪一個字沒有三點水？', explain: '要改成「乏」。很累是「疲乏」；「泛」是泛舟的泛。' },
      { id: 'fx-皆', char: '皆', wrong: '階', sentence: '這次比賽，參加的人皆有獎品。', options: ['皆', '階', '偕'], clue: '這裡是說全部都，想一想，哪一個字的上面是「比」、下面是「白」？', explain: '要改成「皆」。全部都是「皆」；「階」是臺階的階。' },
      { id: 'fx-嗤', char: '嗤', wrong: '痴', sentence: '他對別人的建議嗤之以鼻。', options: ['嗤', '痴', '蚩'], clue: '這裡是說冷笑看不起，想一想，哪一個字有口字旁？', explain: '要改成「嗤」。冷笑是「嗤」；「痴」是痴心的痴。' }
    ],
    similar: [
      { id: 's1', meaning: '「歡＿」是高興的接待到來的人。', sentence: '我們熱烈歡＿新同學。', frame: '歡＿', options: ['迎', '仰'], answer: '迎', clue: '提示：和走路有關，有辵字旁。', explain: '答案是「迎」；「仰」是仰望的仰。' },
      { id: 's2', meaning: '「＿包」是用小麥磨的粉做、烤出來的點心。', sentence: '早餐我吃了一個＿包。', frame: '＿包', options: ['麵', '緬'], answer: '麵', clue: '提示：和麥子有關，左邊是「麥」。', explain: '答案是「麵」；「緬」是緬甸的緬。' },
      { id: 's3', meaning: '「上＿」是在教室裡學習。', sentence: '鐘響了，大家準備上＿。', frame: '上＿', options: ['課', '踝'], answer: '課', clue: '提示：和說話、學習有關，左邊是言字旁。', explain: '答案是「課」；「踝」是腳踝的踝。' },
      { id: 's4', meaning: '「金＿」是用來買東西的。', sentence: '我把金＿存進撲滿。', frame: '金＿', options: ['錢', '濺'], answer: '錢', clue: '提示：和金屬有關，左邊是金字旁。', explain: '答案是「錢」；「濺」是濺起的濺。' },
      { id: 's5', meaning: '「＿放」是把東西放好。', sentence: '請把椅子＿放整齊。', frame: '＿放', options: ['擺', '襬'], answer: '擺', clue: '提示：要用手，左邊是提手旁。', explain: '答案是「擺」；「襬」是裙襬的襬。' },
      { id: 's6', meaning: '「＿勢」是身體擺出來的樣子。', sentence: '照相時，他擺了一個帥氣的＿勢。', frame: '＿勢', options: ['姿', '恣'], answer: '姿', clue: '提示：這個字的下面是「女」。', explain: '答案是「姿」；「恣」是恣意的恣。' },
      { id: 's7', meaning: '「＿賽」是大家一起競爭，看誰最厲害。', sentence: '我們來＿賽誰跑得快。', frame: '＿賽', options: ['比', '批'], answer: '比', clue: '提示：這個字沒有提手旁。', explain: '答案是「比」；「批」是批評的批。' },
      { id: 's8', meaning: '「＿過」是從旁邊走過去。', sentence: '我每天上學都會＿過公園。', frame: '＿過', options: ['經', '徑'], answer: '經', clue: '提示：這個字的左邊是糸字旁。', explain: '答案是「經」；「徑」是小徑的徑。' },
      { id: 's9', meaning: '「＿勞」是很努力、不偷懶。', sentence: '螞蟻是＿勞的昆蟲。', frame: '＿勞', options: ['勤', '謹'], answer: '勤', clue: '提示：要出力，右邊是「力」。', explain: '答案是「勤」；「謹」是謹慎的謹。' },
      { id: 's10', meaning: '「＿起」是從地上撿起來。', sentence: '他把垃圾＿起來丟掉。', frame: '＿起', options: ['拾', '恰'], answer: '拾', clue: '提示：要用手，左邊是提手旁。', explain: '答案是「拾」；「恰」是恰好的恰。' },
      { id: 's11', meaning: '「＿梯」是一層一層往上走的地方。', sentence: '小心走下＿梯。', frame: '＿梯', options: ['階', '皆'], answer: '階', clue: '提示：這個字的左邊是阜字旁。', explain: '答案是「階」；「皆」是皆大歡喜的皆。' },
      { id: 's12', meaning: '「＿舟」是坐著船在河裡順流而下。', sentence: '暑假我們去花蓮＿舟。', frame: '＿舟', options: ['泛', '乏'], answer: '泛', clue: '提示：和水有關，左邊是三點水。', explain: '答案是「泛」；「乏」是缺乏的乏。' },
      { id: 's13', meaning: '「＿人」是對我們很好、幫過我們的人。', sentence: '他是我們家的大＿人。', frame: '＿人', options: ['恩', '嗯'], answer: '恩', clue: '提示：這個字沒有口字旁。', explain: '答案是「恩」；「嗯」是答應的聲音。' }
    ],
    listen: [
      { id: 'l1', text: '車子開過水坑，水向四周噴出來。', answer: 0, options: [{ text: '濺起', img: 'puddle-splash.png' }, { text: '弄溼', img: 'muddy-shoes.png' }, { text: '謹記', img: 'careful-walk.png' }, { text: '批判', img: 'teacher-comment.png' }] },
      { id: 'l2', text: '這家店的東西太貴，都沒有人來問。', answer: 0, options: [{ text: '乏人問津', img: 'empty-shop.png' }, { text: '嗤之以鼻', img: 'sneer.png' }, { text: '理所當然', img: 'nod-ok.png' }, { text: '受用不盡', img: 'treasure-box.png' }] },
      { id: 'l3', text: '他冷笑一聲，表示看不起別人的想法。', answer: 0, options: [{ text: '嗤之以鼻', img: 'sneer.png' }, { text: '乏人問津', img: 'empty-shop.png' }, { text: '捏一把冷汗', img: 'worried-crowd.png' }, { text: '恰恰', img: 'puzzle-fit.png' }] },
      { id: 'l4', text: '看他在高空走鋼索，大家都好緊張。', answer: 0, options: [{ text: '捏一把冷汗', img: 'worried-crowd.png' }, { text: '受用不盡', img: 'treasure-box.png' }, { text: '理所當然', img: 'nod-ok.png' }, { text: '嗤之以鼻', img: 'sneer.png' }] },
      { id: 'l5', text: '小腿下方、兩邊凸起的圓圓骨頭。', answer: 0, options: [{ text: '腳踝', img: 'ankle.png' }, { text: '下襬', img: 'skirt-hem.png' }, { text: '呢絨', img: 'soft-teddy.png' }, { text: '行徑', img: 'sneaky-kid.png' }] },
      { id: 'l6', text: '他想做什麼就做什麼，一點都不管規矩。', answer: 0, options: [{ text: '恣意', img: 'kid-messy.png' }, { text: '謹記', img: 'careful-walk.png' }, { text: '恰恰', img: 'puzzle-fit.png' }, { text: '批判', img: 'teacher-comment.png' }] },
      { id: 'l7', text: '我會把老師的話小心的牢牢記住。', answer: 0, options: [{ text: '謹記', img: 'careful-walk.png' }, { text: '恣意', img: 'kid-messy.png' }, { text: '濺起', img: 'puddle-splash.png' }, { text: '弄溼', img: 'muddy-shoes.png' }] },
      { id: 'l8', text: '奶奶教我的道理，讓我一輩子都用不完。', answer: 0, options: [{ text: '受用不盡', img: 'treasure-box.png' }, { text: '理所當然', img: 'nod-ok.png' }, { text: '乏人問津', img: 'empty-shop.png' }, { text: '捏一把冷汗', img: 'worried-crowd.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '做什麼', answer: '怎麼樣', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的疊字詞，說說看是什麼樣的東西。',
      /* 短語：動詞＋疊字形容詞＋的＋名詞（句子都是自己寫的） */
      intro: { example: '摸摸毛茸茸的小熊', img: 'soft-teddy.png',
        parts: [{ text: '摸摸', role: '做什麼' }, { text: '毛茸茸', role: '怎麼樣' }, { text: '的' }, { text: '小熊', role: '什麼東西' }],
        explain: '先說做什麼，再用一個疊字的詞說出東西的樣子，加上「的」，最後說是什麼東西。' },
      pick: [
        { id: 'ph1', img: 'muddy-shoes.png', before: '穿著', noun: '鞋子', ask: '穿著什麼樣的鞋子', look: '再看看圖片，鞋子上有什麼？', options: ['髒兮兮', '亮晶晶', '香噴噴', '白淨淨'], clue: '提示：踩過泥巴，到處都是土。', explain: '答案是「髒兮兮」，完整的短語是「穿著髒兮兮的鞋子」。' },
        { id: 'ph2', img: 'pr-wet-kid.png', before: '換下', noun: '衣服', ask: '換下什麼樣的衣服', look: '再看看圖片，衣服有沒有被雨淋到？', options: ['溼答答', '乾爽爽', '暖烘烘', '硬梆梆'], clue: '提示：淋了一場大雨，還在滴水。', explain: '答案是「溼答答」，完整的短語是「換下溼答答的衣服」。' },
        { id: 'ph3', img: 'pr-clean-room.png', before: '走進', noun: '房間', ask: '走進什麼樣的房間', look: '再看看圖片，房間整不整齊？', options: ['乾乾淨淨', '亂七八糟', '髒兮兮', '黑漆漆'], clue: '提示：地板發亮，書本都排好了。', explain: '答案是「乾乾淨淨」，完整的短語是「走進乾乾淨淨的房間」。' },
        { id: 'ph4', img: 'pr-warm-bed.png', before: '蓋著', noun: '被子', ask: '蓋著什麼樣的被子', look: '再看看圖片，被子晒過太陽了嗎？', options: ['暖烘烘', '冷冰冰', '溼答答', '髒兮兮'], clue: '提示：晒了一整天太陽，蓋起來好舒服。', explain: '答案是「暖烘烘」，完整的短語是「蓋著暖烘烘的被子」。' },
        { id: 'ph5', img: 'pr-shiny-car.png', before: '開著', noun: '車子', ask: '開著什麼樣的車子', look: '再看看圖片，車子洗過了嗎？', options: ['亮晶晶', '灰濛濛', '髒兮兮', '黑漆漆'], clue: '提示：洗完擦完，可以照出人影。', explain: '答案是「亮晶晶」，完整的短語是「開著亮晶晶的車子」。' },
        { id: 'ph6', img: 'pr-sticky-hands.png', before: '伸出', noun: '手', ask: '伸出什麼樣的手', look: '再看看圖片，手上沾了什麼？', options: ['黏答答', '乾爽爽', '冷冰冰', '香噴噴'], clue: '提示：沾滿糖漿，碰什麼都會牽絲。', explain: '答案是「黏答答」，完整的短語是「伸出黏答答的手」。' }
      ],
      say: [],
      words: [
        { word: '理所當然', meaning: '照規矩、照情況就應該是這樣。', img: 'nod-ok.png' },
        { word: '受用不盡', meaning: '得到的好處多得一輩子也享之無窮。', img: 'treasure-box.png' },
        { word: '乏人問津', meaning: '沒有誰來詢價或注意。', img: 'empty-shop.png' },
        { word: '捏一把冷汗', meaning: '非常擔心、緊張的樣子。', img: 'worried-crowd.png' }
      ],
      choose: [
        { id: 'pw1', word: '理所當然', options: ['照顧自己的寵物，是理所當然的事。', '他不排隊就插隊，真是理所當然。'], clue: '提示：想一想，「理所當然」是照道理應該，還是不合理？', explain: '第一句用得對：照顧寵物本來就應該。插隊不合理，不是理所當然。' },
        { id: 'pw2', word: '受用不盡', options: ['外公教我的做人道理，讓我受用不盡。', '這支筆寫兩天就壞了，讓我受用不盡。'], clue: '提示：想一想，「受用不盡」是好處很多，還是一下就沒了？', explain: '第一句用得對：道理一輩子都有用。筆兩天就壞，剛好相反。' },
        { id: 'pw3', word: '乏人問津', options: ['這部電影太無聊，上映後乏人問津。', '這家店大排長龍，乏人問津。'], clue: '提示：想一想，「乏人問津」是沒人理，還是很多人？', explain: '第一句用得對：沒人想看。大排長龍是很多人，剛好相反。' },
        { id: 'pw4', word: '捏一把冷汗', options: ['看他差點跌下舞臺，我替他捏一把冷汗。', '他輕鬆的躺在沙發上，捏一把冷汗。'], clue: '提示：想一想，「捏一把冷汗」是很緊張，還是很輕鬆？', explain: '第一句用得對：差點跌倒，讓人緊張。輕鬆躺著，剛好相反。' }
      ],
      make: [
        { id: 'pm1', word: '理所當然', clue: '提示：想想看，有什麼事本來就應該做？', model: '自己的房間自己整理，是理所當然的事。' },
        { id: 'pm2', word: '受用不盡', clue: '提示：想想看，誰教過你很有用的道理？', model: '老師教我們的讀書方法，讓我受用不盡。' },
        { id: 'pm3', word: '乏人問津', clue: '提示：想想看，什麼東西沒有人想要？', model: '颱風天，市場裡的攤位乏人問津。' },
        { id: 'pm4', word: '捏一把冷汗', clue: '提示：想想看，什麼時候你會替別人緊張？', model: '看到弟弟爬上高高的樹，我替他捏一把冷汗。' }
      ]
    },
    pattern: [
      { key: 'wulundou', id: 'wd', title: '無論……都……', img: 'wulundou.png',
        meaning: '用「無論」、「都」，說出不管情況怎麼不一樣，結果都不會改變。',
        examples: ['無論颳風下雨，郵差都會把信送到。'],
        match: [
          { id: 'pt-wd-m1', img: 'pt-all-ages.png', front: '無論大人或小孩，', options: ['都喜歡這部卡通。', '只有小孩喜歡。', '可是大人不喜歡。'], clue: '提示：看看圖片，大人小孩的表情一樣嗎？', explain: '答案是「都喜歡這部卡通」：不管是誰，結果都一樣。' },
          { id: 'pt-wd-m2', img: 'pt-jog-weather.png', front: '無論天氣冷或熱，', options: ['爺爺都去晨跑。', '爺爺只在夏天跑。', '所以不跑步。'], clue: '提示：看看圖片，爺爺是不是每天都在跑？', explain: '答案是「爺爺都去晨跑」：不管冷熱，結果都一樣。' },
          { id: 'pt-wd-m3', img: 'pt-smile-kid.png', front: '無論遇到什麼困難，', options: ['她都面帶微笑。', '她就馬上放棄。', '她只會哭。'], clue: '提示：看看圖片，她的表情怎麼樣？', explain: '答案是「她都面帶微笑」：不管什麼困難，態度都不變。' }
        ],
        conj: [
          { id: 'pt-wd-c1', full: '無論走到哪裡，小狗都跟著我。', img: 'pt-dog-follow.png', sentence: '＿＿走到哪裡，小狗＿跟著我。', options: ['無論……都……', '即使……也……', '不僅……更……'], clue: '提示：不管去哪裡，結果都一樣。數數看有幾個空格。', explain: '答案是「無論……都……」：無論走到哪裡，小狗都跟著我。' },
          { id: 'pt-wd-c2', full: '無論功課多忙，他都會練琴。', img: 'pt-piano.png', sentence: '＿＿功課多忙，他＿會練琴。', options: ['無論……都……', '即使……也……', '不僅……更……'], clue: '提示：不管多忙，結果都一樣。數數看有幾個空格。', explain: '答案是「無論……都……」：無論功課多忙，他都會練琴。' }
        ],
        half: [
          { id: 'pt-wd-h1', front: '無論晴天或雨天，', clue: '提示：不管天氣怎樣，有什麼事一直不變？記得要說「都」。', model: '媽媽都會準時送我上學。' },
          { id: 'pt-wd-h2', front: '無論考試考得好不好，', clue: '提示：不管成績如何，有什麼事不會改變？記得要說「都」。', model: '爸媽都一樣愛我。' }
        ],
        whole: [
          { id: 'pt-wd-w1', clue: '提示：用「無論」、「都」說出不管怎樣都不變的事。想想看：你每天一定會做什麼？', model: '無論多累，我都會在睡前刷牙。' }
        ] },
      { key: 'jishiye', id: 'js', title: '即使……也……', img: 'jishiye.png',
        meaning: '用「即使」、「也」，先退一步假設一個情況，再說結果還是不會改變。',
        examples: ['即使下大雨，比賽也會照常舉行。'],
        match: [
          { id: 'pt-js-m1', img: 'pt-tired-run.png', front: '即使跑得很累，', options: ['他也不肯停下來。', '他就躺下睡覺。', '所以放棄了。'], clue: '提示：看看圖片，他累了還在跑嗎？', explain: '答案是「他也不肯停下來」：就算很累，結果還是不變。' },
          { id: 'pt-js-m2', img: 'pt-empty-seat.png', front: '即使旁邊還有空位，', options: ['大家也搶著坐這裡。', '大家就坐空位。', '所以沒人坐。'], clue: '提示：看看圖片，大家都擠在哪裡？', explain: '答案是「大家也搶著坐這裡」：就算有空位，結果還是不變。' },
          { id: 'pt-js-m3', img: 'pt-lose-game.png', front: '即使比賽輸了，', options: ['大家也很開心。', '我們就吵架。', '所以很生氣。'], clue: '提示：看看圖片，大家的表情怎麼樣？', explain: '答案是「大家也很開心」：就算輸了，結果還是開心。' }
        ],
        conj: [
          { id: 'pt-js-c1', full: '即使只有一個人，他也要完成任務。', img: 'pt-alone-task.png', sentence: '＿＿只有一個人，他＿要完成任務。', options: ['即使……也……', '無論……都……', '不僅……更……'], clue: '提示：先退一步假設，結果還是不變。數數看有幾個空格。', explain: '答案是「即使……也……」：即使只有一個人，他也要完成任務。' },
          { id: 'pt-js-c2', full: '即使天氣很冷，她也穿短袖。', img: 'pt-cold-shortsleeve.png', sentence: '＿＿天氣很冷，她＿穿短袖。', options: ['即使……也……', '無論……都……', '不僅……更……'], clue: '提示：先退一步假設，結果還是不變。數數看有幾個空格。', explain: '答案是「即使……也……」：即使天氣很冷，她也穿短袖。' }
        ],
        half: [
          { id: 'pt-js-h1', front: '即使題目很難，', clue: '提示：題目再難，你會怎麼做？記得要說「也」。', model: '我也要試著把它解出來。' },
          { id: 'pt-js-h2', front: '即使大家都笑我，', clue: '提示：被笑了，你還是會做什麼？記得要說「也」。', model: '我也要堅持自己的夢想。' }
        ],
        whole: [
          { id: 'pt-js-w1', clue: '提示：用「即使」、「也」，先假設一個困難，再說你還是會怎麼做。', model: '即使下雪，我也要去看日出。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'question', name: '設問', meaning: '用問句來說話，引起大家注意。有時自己問、自己回答；有時只問不答，答案就藏在問題裡。', example: '課文寫作者當時心裡冒出一個疑問，用問句說出他覺得奇怪的地方，讓讀者也跟著好奇。',
          show: { sentence: '為什麼他要穿小一號的鞋？原來是怕弄髒衣服。' },
          yesno: [
            { id: 'rh-qu-y1', sentence: '你知道沙漠裡的人為什麼穿長袍嗎？因為可以擋住大太陽。', answer: true, clue: '提示：這句話是不是先問一個問題，再自己回答？', explain: '是設問：先問一個問題，再自己回答。' },
            { id: 'rh-qu-y2', sentence: '沙漠裡的人穿長袍。', answer: false, clue: '提示：這句話裡有沒有問題？', explain: '不是設問：這句話沒有用問句。' }
          ],
          pick: [
            { id: 'rh-qu-p1', options: ['什麼東西可以擋雨？是雨傘。', '雨傘可以擋雨。'], clue: '提示：哪一句先問問題，再自己回答？', explain: '先問「什麼東西可以擋雨」，再回答，是設問。' },
            { id: 'rh-qu-p2', options: ['誰不想要一雙舒服的鞋子呢？', '這雙鞋子很舒服。'], clue: '提示：哪一句用問題來說話？', explain: '「誰不想要一雙舒服的鞋子呢」是設問：答案藏在問題裡。' },
            { id: 'rh-qu-p3', options: ['為什麼要尊重別人？因為每個人都不一樣。', '我們要尊重別人。', '他很有禮貌。'], clue: '提示：哪一句先問「為什麼」，再自己回答？', explain: '先問再答，是設問。' },
            { id: 'rh-qu-p4', options: ['你去過下雨下半年的國家嗎？', '那裡下了很久的雨。', '雨傘放在門口。'], clue: '提示：哪一句用問題引起大家注意？', explain: '「你去過下雨下半年的國家嗎」是設問。' },
            { id: 'rh-qu-p5', options: ['哪裡的位子最涼快？是別人剛坐過的。', '我坐在公車上。', '天氣很熱。', '公車開走了。'], clue: '提示：哪一句先問問題，再說出答案？', explain: '先問「哪裡的位子最涼快」，再回答，是設問。' },
            { id: 'rh-qu-p6', options: ['有什麼比多認識世界更有趣呢？', '我去了外國。', '飛機飛得高。', '行李很重。'], clue: '提示：哪一句用問題來說話，答案藏在問題裡？', explain: '答案藏在問題裡：多認識世界最有趣，是設問。' }
          ] },
        { key: 'repeat', name: '類疊', meaning: '同一個字或詞連著重複，或隔開來重複說好幾次，讀起來有節奏，也讓人印象更深。', example: '課文用「溼答答」寫被雨水弄溼的衣服，重複的字讓人好像摸到那種溼溼的感覺。',
          show: { sentence: '雨下個不停，鞋子溼答答的。', mark: ['溼答答'] },
          yesno: [
            { id: 'rh-rp-y1', sentence: '剛晒好的被子暖烘烘的。', answer: true, mark: ['暖烘烘'], clue: '提示：找找看，有沒有連著重複的字？', explain: '是類疊：「烘烘」連著重複。' },
            { id: 'rh-rp-y2', sentence: '剛晒好的被子很溫暖。', answer: false, clue: '提示：找找看，有沒有同一個字或詞重複出現？', explain: '不是類疊：這句話沒有重複的字或詞。' }
          ],
          pick: [
            { id: 'rh-rp-p1', mark: ['亮晶晶'], options: ['地板擦得亮晶晶。', '地板擦乾淨了。'], clue: '提示：哪一句有連著重複的字？', explain: '「亮晶晶」重複了「晶」，是類疊。' },
            { id: 'rh-rp-p2', mark: ['一步一步'], options: ['他一步一步爬上山頂。', '他爬上了山頂。'], clue: '提示：哪一句把同一個詞說了兩次？', explain: '「一步一步」重複了「一步」，是類疊。' },
            { id: 'rh-rp-p3', mark: ['髒兮兮'], options: ['小狗玩得全身髒兮兮。', '小狗在玩泥巴。', '小狗要洗澡了。'], clue: '提示：哪一句有連著重複的字？', explain: '「髒兮兮」重複了「兮」，是類疊。' },
            { id: 'rh-rp-p4', mark: ['一針一線'], options: ['這件毛衣一針一線都是外婆織的。', '外婆織了毛衣。', '毛衣是紅色的。'], clue: '提示：哪一句有同一個字隔開來重複？', explain: '「一針一線」重複了「一」，是類疊。' },
            { id: 'rh-rp-p5', mark: ['靜悄悄'], options: ['深夜的街道靜悄悄。', '街上沒有人。', '路燈還亮著。', '我走回家。'], clue: '提示：哪一句有連著重複的字？', explain: '「靜悄悄」重複了「悄」，是類疊。' },
            { id: 'rh-rp-p6', mark: ['走著走著'], options: ['我們走著走著，就到了海邊。', '我們到了海邊。', '海水是藍色的。', '風吹過來。'], clue: '提示：哪一句把同一個詞說了兩次？', explain: '「走著走著」重複了「走著」，是類疊。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '什麼是常識？就是大家都知道的事。', answer: '設問', clue: '提示：這句話是不是先問問題，再自己回答？', explain: '答案是「設問」：先問再答。' },
        { id: 'rh2', sentence: '你想過別人為什麼和你不一樣嗎？', answer: '設問', clue: '提示：這句話是不是用問題引起大家注意？', explain: '答案是「設問」：用問題引起注意。' },
        { id: 'rh3', sentence: '剛出爐的麵包香噴噴。', answer: '類疊', mark: ['香噴噴'], clue: '提示：這句話有沒有連著重複的字？', explain: '答案是「類疊」：「噴噴」連著重複。' },
        { id: 'rh4', sentence: '一點一滴的努力，終於有了收穫。', answer: '類疊', mark: ['一點一滴'], clue: '提示：這句話有沒有同一個字隔開來重複？', explain: '答案是「類疊」：「一」隔開來重複。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L07 = d; }
})(this);
