/* 第 11 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'infer', qe: 'infer', qf: 'infer', qg: 'interpret', qh: 'interpret',
      qi: 'evaluate', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qg: { think: ['好朋友喝了飲料後為什麼頭暈？', '這是誰的錯？是故意的嗎？'], why: '架子上那瓶其實是大人釀的酒，大人說錯了位置。女孩不是故意的，這是一場誤會。' },
      qh: { think: ['女孩的心情從開始到最後有哪些變化？', '哪件事讓她又變得開心？'], why: '一開始她開心的招待朋友，後來被誤會、不能見面而傷心；最後她救了朋友的妹妹，誤會解開，兩人和好，她又快樂得唱起歌。' },
      qi: { think: ['被誤會時，女孩做了哪些努力？', '如果是你，你會怎麼做？'], why: '她先請大人幫忙解釋，又自己鼓起勇氣去道歉。遇到誤會時，誠實說明、勇敢道歉都是好方法。' },
      qj: { think: ['朋友的媽媽為什麼最後願意原諒她？', '你覺得一個人的行動和道歉，哪一個比較能讓人相信？'], why: '她在危急時冷靜救了朋友的妹妹，用行動證明自己是好孩子，誤會也一起解開了。可以說行動比言語更有說服力，也可以說兩者都重要。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['我會先冷靜下來，把事情的經過說清楚。', '我會請大人幫忙，一起去說明和道歉。'], bad: ['我會生氣的不理他。', '我會說都是別人的錯。'], why: '題目問的是被誤會時，你會怎麼做。冷靜說明、找大人幫忙、真心道歉，都是好方法。生氣不理人、推給別人，只會讓誤會更大。' },
      k2: { good: ['我會珍惜這個朋友，常常關心他。', '我會寫一張卡片謝謝他一直陪著我。'], bad: ['朋友不重要，隨便就好。', '吵架了就再也不要理他。'], why: '題目問的是你會怎麼對待好朋友。關心、感謝都是珍惜友誼的表現。覺得朋友不重要、吵架就絕交，都不是好做法。' }
    },
    hanzi: [
      { id: 'h-楓', combo: { layout: 'lr', parts: [['木', 'm', '樹'], ['風', 's', '']] }, char: '楓', zhuyin: 'ㄈㄥ', radical: '木', strokes: 13, words: ['楓紅', '楓葉'], say: '楓，楓葉的楓', cloze: '＿葉', img: 'maple-leaves.png', options: ['楓', '諷', '瘋', '颯'], clue: '這個字的左邊是木字旁。', explain: '答案是「楓」，左邊是木字旁；「諷」的左邊是言字旁，「瘋」的外面是病字旁。', parts: ['木', '風'], story: '左邊是樹，右邊的「風」念起來像「楓」。秋風一吹，葉子就變紅的樹，就是「楓樹」。', sentence: '秋天的楓葉紅得像火。', build: { layout: 'lr', show: ['？', '風'], answer: '木', options: ['木', '言', '疒', '立'], clue: '想一想：秋天會變紅的是什麼植物？' } },
      { id: 'h-恢', combo: { layout: 'lr', parts: [['忄', 'm', '心'], ['灰', 's', '']] }, char: '恢', zhuyin: 'ㄏㄨㄟ', radical: '心', strokes: 9, words: ['恢復', '恢宏'], say: '恢，恢復的恢', cloze: '＿宏', img: 'recover.png', options: ['恢', '灰', '詼', '盔'], clue: '這個字的左邊是豎心旁。', explain: '答案是「恢」，左邊是豎心旁；「灰」沒有偏旁，「詼」的左邊是言字旁。', parts: ['忄', '灰'], story: '左邊是心，右邊的「灰」念起來像「恢」。心裡寬寬大大的，也有回到原來的意思，像「恢復」。', sentence: '休息一晚，他的體力恢復了。', build: { layout: 'lr', show: ['？', '灰'], answer: '忄', options: ['忄', '言', '氵', '火'], clue: '想一想：心情回到原來的樣子，左邊放哪一個？' } },
      { id: 'h-潑', combo: { layout: 'lr', parts: [['氵', 'm', '水'], ['發', 's', '']] }, char: '潑', zhuyin: 'ㄆㄛ', radical: '水', strokes: 15, words: ['活潑', '潑水'], say: '潑，潑水的潑', cloze: '＿水', img: 'splash-water.png', options: ['潑', '發', '撥', '廢'], clue: '這個字的左邊是三點水。', explain: '答案是「潑」，左邊是三點水；「撥」的左邊是提手旁，「廢」的外面是「广」。', parts: ['氵', '發'], story: '左邊是水，右邊的「發」念起來有點像「潑」。把水用力灑出去，就是「潑水」；像水花一樣很有活力，叫「活潑」。', sentence: '潑水節時，大家互相潑水祝福。', build: { layout: 'lr', show: ['？', '發'], answer: '氵', options: ['氵', '扌', '广', '弓'], clue: '想一想：用力灑出去的是什麼？' } },
      { id: 'h-莓', combo: { layout: 'tb', parts: [['艹', 'm', '植物'], ['每', 's', '']] }, char: '莓', zhuyin: 'ㄇㄟˊ', radical: '艸', strokes: 11, words: ['草莓', '藍莓'], say: '莓，藍莓的莓', cloze: '藍＿', img: 'strawberry.png', options: ['莓', '梅', '霉', '每'], clue: '這個字的上面是草字頭。', explain: '答案是「莓」，上面是草字頭；「梅」的左邊是木字旁，「霉」的上面是雨字頭。', parts: ['艹', '每'], story: '上面是草，下面的「每」念起來像「莓」。長在草叢裡、紅紅小小的果實，就是「草莓」。', sentence: '藍莓小小的，酸酸甜甜。', build: { layout: 'tb', show: ['？', '每'], answer: '艹', options: ['艹', '木', '雨', '竹'], clue: '想一想：長在草叢裡的小果實，上面放哪一個？' } },
      { id: 'h-廳', combo: { type: '形聲字', pict: '外面的「广」像一間大屋子，裡面的「聽」念起來像「廳」。大家聚在一起聽、說話的大房間，就是「廳」。' }, char: '廳', zhuyin: 'ㄊㄧㄥ', radical: '广', strokes: 25, words: ['客廳', '餐廳'], say: '廳，餐廳的廳', cloze: '餐＿', img: 'living-room.png', options: ['廳', '聽', '庭', '亭'], clue: '這個字的外面是「广」，裡面是「聽」。', explain: '答案是「廳」；「聽」沒有「广」，「庭」的裡面是「廷」。', parts: ['广', '聽'], story: '外面是大屋子，裡面念起來像「廳」。招待客人的大房間叫「客廳」；吃飯的地方叫「餐廳」。', sentence: '我們全家去餐廳吃晚餐。' },
      { id: 'h-額', combo: { layout: 'lr', parts: [['客', 's', ''], ['頁', 'm', '頭']] }, char: '額', zhuyin: 'ㄜˊ', radical: '頁', strokes: 18, words: ['前額', '額頭'], say: '額，額頭的額', cloze: '＿頭', img: 'forehead.png', options: ['額', '客', '頻', '顏'], clue: '這個字的右邊是「頁」，左邊是「客」。', explain: '答案是「額」；「客」沒有「頁」，「顏」的左邊是「彥」。', parts: ['客', '頁'], story: '左邊的「客」念起來有點像「額」，右邊的「頁」和頭有關。眉毛上面、頭的前面，就是「額頭」。', sentence: '他跑得滿頭大汗，額頭都溼了。', build: { layout: 'lr', show: ['客', '？'], answer: '頁', options: ['頁', '攵', '欠', '力'], clue: '想一想：和頭有關的部首放在右邊，是哪一個？' } },
      { id: 'h-灌', combo: { layout: 'lr', parts: [['氵', 'm', '水'], ['雚', 's', '']] }, char: '灌', zhuyin: 'ㄍㄨㄢˋ', radical: '水', strokes: 21, words: ['灌醉', '灌溉'], say: '灌，灌溉的灌', cloze: '＿溉', img: 'water-field.png', options: ['灌', '罐', '觀', '歡'], clue: '這個字的左邊是三點水。', explain: '答案是「灌」，左邊是三點水；「罐」的左邊是「缶」，「觀」的右邊是「見」。', parts: ['氵', '雚'], story: '左邊是水，右邊的「雚」念起來像「灌」。把水大量的倒進去，就是「灌」；把水引到田裡，叫「灌溉」。', sentence: '農夫引河水灌溉稻田。', build: { layout: 'lr', show: ['？', '雚'], answer: '氵', options: ['氵', '缶', '見', '欠'], clue: '想一想：大量倒進田裡的是什麼？' } },
      { id: 'h-醉', combo: { layout: 'lr', parts: [['酉', 'm', '酒罈'], ['卒', 's', '']] }, char: '醉', zhuyin: 'ㄗㄨㄟˋ', radical: '酉', strokes: 15, words: ['灌醉', '陶醉'], say: '醉，陶醉的醉', cloze: '陶＿', img: 'enjoy-music.png', options: ['醉', '碎', '翠', '卒'], clue: '這個字的左邊是「酉」。', explain: '答案是「醉」，左邊是「酉」；「碎」的左邊是石字旁，「翠」的上面是「羽」。', parts: ['酉', '卒'], story: '左邊的「酉」是裝酒的罈子，右邊的「卒」念起來有點像「醉」。酒喝太多，頭昏昏的，就是「醉」；沉迷在美好的事物裡，叫「陶醉」。', sentence: '她陶醉在美妙的音樂裡。', build: { layout: 'lr', show: ['？', '卒'], answer: '酉', options: ['酉', '石', '羽', '口'], clue: '想一想：和酒有關的部首是哪一個？' } },
      { id: 'h-釀', combo: { layout: 'lr', parts: [['酉', 'm', '酒罈'], ['襄', 's', '']] }, char: '釀', zhuyin: 'ㄋㄧㄤˋ', radical: '酉', strokes: 24, words: ['釀酒', '醞釀'], say: '釀，醞釀的釀', cloze: '醞＿', img: 'wine-barrel.png', options: ['釀', '讓', '嚷', '壤'], clue: '這個字的左邊是「酉」。', explain: '答案是「釀」，左邊是「酉」；「讓」的左邊是言字旁，「壤」的左邊是土字旁。', parts: ['酉', '襄'], story: '左邊是酒罈子，右邊的「襄」念起來像「釀」。把水果、穀物放進罈子裡慢慢變成酒，就是「釀」。', sentence: '這個計畫已經醞釀很久了。', build: { layout: 'lr', show: ['？', '襄'], answer: '酉', options: ['酉', '言', '口', '土'], clue: '想一想：放在罈子裡慢慢變成酒，左邊放哪一個？' } },
      { id: 'h-替', combo: { type: '會意字', pict: '上面是兩個「夫」，下面是「曰」。兩個人輪流說話、一個換一個，就是「替」。' }, char: '替', zhuyin: 'ㄊㄧˋ', radical: '曰', strokes: 12, words: ['替', '代替'], say: '替，代替的替', cloze: '代＿', img: 'take-turns.png', options: ['替', '潛', '贊', '普'], clue: '這個字的上面是兩個「夫」。', explain: '答案是「替」；「潛」的左邊是三點水，「贊」的下面是「貝」。', parts: ['夫', '夫', '曰'], story: '上面是兩個人，下面是說話。一個人換另一個人來做，就是「代替」。', sentence: '老師請假，由校長代替上課。' },
      { id: 'h-諒', combo: { layout: 'lr', parts: [['言', 'm', '說話'], ['京', 's', '']] }, char: '諒', zhuyin: 'ㄌㄧㄤˋ', radical: '言', strokes: 15, words: ['原諒', '諒解'], say: '諒，諒解的諒', cloze: '＿解', img: 'hug-friends.png', options: ['諒', '涼', '晾', '掠'], clue: '這個字的左邊是言字旁。', explain: '答案是「諒」，左邊是言字旁；「涼」的左邊是三點水，「晾」的左邊是日字旁。', parts: ['言', '京'], story: '左邊是說話，右邊的「京」念起來像「諒」。聽了別人的話，明白了他的難處，不再生氣，就是「原諒」。', sentence: '我向妹妹道歉，她原諒了我。', build: { layout: 'lr', show: ['？', '京'], answer: '言', options: ['言', '氵', '日', '扌'], clue: '想一想：聽了說明才明白，左邊放哪一個？' } },
      { id: 'h-脣', combo: { layout: 'tb', parts: [['辰', 's', ''], ['月', 'm', '身體']] }, char: '脣', zhuyin: 'ㄔㄨㄣˊ', radical: '肉', strokes: 11, words: ['雙脣', '嘴脣'], say: '脣，嘴脣的脣', cloze: '嘴＿', img: 'lips.png', options: ['脣', '辱', '晨', '震'], clue: '這個字的上面是「辰」，下面是「月」。', explain: '答案是「脣」；「辱」的下面是「寸」，「晨」的上面是「日」。', parts: ['辰', '月'], story: '上面的「辰」念起來有點像「脣」，下面的「月」和身體有關。嘴巴外面那兩片肉，就是「嘴脣」。', sentence: '天氣太冷，嘴脣都乾裂了。', build: { layout: 'tb', show: ['辰', '？'], answer: '月', options: ['月', '寸', '日', '雨'], clue: '想一想：和身體有關的部首放在下面，是哪一個？' } },
      { id: 'h-奔', combo: { type: '會意字', pict: '上面是「大」，像一個張開手腳的人；下面像三隻腳，表示跑得很快。人飛快的跑，就是「奔」。' }, char: '奔', zhuyin: 'ㄅㄣ', radical: '大', strokes: 8, words: ['奔往', '奔跑'], say: '奔，奔跑的奔', cloze: '＿跑', img: 'run-field.png', options: ['奔', '奮', '卉', '弄'], clue: '這個字的上面是「大」，下面是「卉」。', explain: '答案是「奔」；「奮」的下面是「田」，「卉」沒有「大」。', parts: ['大', '卉'], story: '上面像張開手的人，下面像好多隻腳。人用很快的速度跑，就是「奔跑」。', sentence: '小狗在草地上快樂的奔跑。' },
      { id: 'h-乞', combo: { type: '象形字', pict: '「乞」像雲氣往上飄，表示向上請求。' }, char: '乞', zhuyin: 'ㄑㄧˇ', radical: '乙', strokes: 3, words: ['乞求', '乞丐'], say: '乞，乞丐的乞', cloze: '＿丐', img: 'beg-sorry.png', options: ['乞', '吃', '乙', '气'], clue: '這個字只有三畫。', explain: '答案是「乞」；「吃」的左邊多了口字旁，「乙」只有一畫。', parts: ['乞'], story: '像雲氣往上飄，表示低頭向人請求。拜託別人給予，就是「乞求」。', sentence: '他乞求媽媽再給他一次機會。' },
      { id: 'h-某', combo: { layout: 'tb', parts: [['甘', 's', ''], ['木', 'm', '樹']] }, char: '某', zhuyin: 'ㄇㄡˇ', radical: '木', strokes: 9, words: ['某天', '某人'], say: '某，某人的某', cloze: '＿人', img: 'mystery-person.png', options: ['某', '謀', '媒', '煤'], clue: '這個字的上面是「甘」，下面是「木」。', explain: '答案是「某」；「謀」的左邊多了言字旁，「煤」的左邊是火字旁。', parts: ['甘', '木'], story: '上面是「甘」，下面是「木」。不說清楚是誰、是哪一個的時候，就用「某」，像「某人」、「某一天」。', sentence: '某天早上，門口出現一隻小貓。', build: { layout: 'tb', show: ['甘', '？'], answer: '木', options: ['木', '火', '女', '言'], clue: '想一想：「甘」的下面放哪一個？' } },
      { id: 'h-煥', combo: { layout: 'lr', parts: [['火', 'm', '火'], ['奐', 's', '']] }, char: '煥', zhuyin: 'ㄏㄨㄢˋ', radical: '火', strokes: 13, words: ['神采煥發', '煥然一新'], say: '煥，煥然一新的煥', cloze: '＿然一新', img: 'shiny-room.png', options: ['煥', '換', '喚', '渙'], clue: '這個字的左邊是火字旁。', explain: '答案是「煥」，左邊是火字旁；「換」的左邊是提手旁，「喚」的左邊是口字旁。', parts: ['火', '奐'], story: '左邊是火，右邊的「奐」念起來像「煥」。像火光一樣亮亮的，就是「煥」；變得又新又亮，叫「煥然一新」。', sentence: '教室重新粉刷後煥然一新。', build: { layout: 'lr', show: ['？', '奐'], answer: '火', options: ['火', '扌', '口', '氵'], clue: '想一想：亮亮的光來自什麼？' } },
      { id: 'h-橇', combo: { layout: 'lr', parts: [['木', 'm', '木頭'], ['毳', 's', '']] }, char: '橇', zhuyin: 'ㄑㄧㄠ', radical: '木', strokes: 16, words: ['雪橇', '雪橇犬'], say: '橇，雪橇的橇', cloze: '雪＿', img: 'sled.png', options: ['橇', '撬', '毳', '翹'], clue: '這個字的左邊是木字旁。', explain: '答案是「橇」，左邊是木字旁；「撬」的左邊是提手旁，「翹」的右邊是「羽」。', parts: ['木', '毳'], story: '左邊是木頭，右邊念起來像「橇」。用木板做成、在雪地上滑行的車，就是「雪橇」。', sentence: '小狗拉著雪橇在雪地上跑。', build: { layout: 'lr', show: ['？', '毳'], answer: '木', options: ['木', '扌', '羽', '金'], clue: '想一想：在雪上滑的板子是用什麼做的？' } },
      { id: 'h-鈴', combo: { layout: 'lr', parts: [['金', 'm', '金屬'], ['令', 's', '']] }, char: '鈴', zhuyin: 'ㄌㄧㄥˊ', radical: '金', strokes: 13, words: ['鈴音', '鈴鐺'], say: '鈴，鈴鐺的鈴', cloze: '＿鐺', img: 'bells.png', options: ['鈴', '零', '玲', '齡'], clue: '這個字的左邊是金字旁。', explain: '答案是「鈴」，左邊是金字旁；「零」的上面是雨字頭，「玲」的左邊是「王」。', parts: ['金', '令'], story: '左邊是金屬，右邊的「令」念起來像「鈴」。用金屬做、一搖就叮叮響的東西，就是「鈴鐺」。', sentence: '小貓脖子上的鈴鐺叮噹響。', build: { layout: 'lr', show: ['？', '令'], answer: '金', options: ['金', '雨', '王', '齒'], clue: '想一想：會叮叮響的東西是什麼做的？' } },
      { id: 'h-迴', combo: { type: '形聲字', pict: '外面的「辶」和走路有關，裡面的「回」念起來像「迴」。走一圈又回來，就是「迴」。' }, char: '迴', zhuyin: 'ㄏㄨㄟˊ', radical: '辵', strokes: 10, words: ['迴盪', '迴轉'], say: '迴，迴轉的迴', cloze: '＿轉', img: 'echo-valley.png', options: ['迴', '回', '徊', '洄'], clue: '這個字有辵字旁，裡面是「回」。', explain: '答案是「迴」；「回」沒有辵字旁，「徊」的左邊是雙人旁。', parts: ['辶', '回'], story: '外面是走路，裡面是「回」。繞一圈再回來，就是「迴轉」；聲音在山谷裡傳來傳去，叫「迴盪」。', sentence: '車子在路口迴轉。' }
    ],
    vocab: [
      { id: 'v-楓葉', cloze: true, clozeOptions: ['楓葉', '石頭', '貝殼', '鐵釘'], word: '楓葉', meaning: '秋天會變紅、形狀像小手掌，長在樹上的東西。', example: '秋天的山上滿是紅色的＿＿。', img: 'maple-leaves.png', options: ['楓葉', '草莓', '雪橇', '客廳'] },
      { id: 'v-恢復', cloze: true, clozeOptions: ['恢復', '破壞', '改變', '弄壞'], word: '恢復', meaning: '回到原來的樣子。', example: '睡了一覺，他的精神＿＿了。', img: 'recover.png', options: ['恢復', '代替', '原諒', '乞求'] },
      { id: 'v-活潑', cloze: true, clozeOptions: ['活潑', '呆板', '沉悶', '安靜'], word: '活潑', meaning: '很有精神、喜歡動來動去。', example: '妹妹的個性很＿＿，喜歡唱歌跳舞。', img: 'happy-girl.png', options: ['活潑', '恢復', '迴盪', '神采煥發'] },
      { id: 'v-草莓', cloze: true, clozeOptions: ['草莓', '石頭', '鉛筆', '雨傘'], word: '草莓', meaning: '紅紅的、表面有小點點、酸甜的水果。', example: '我最喜歡吃＿＿蛋糕。', img: 'strawberry.png', options: ['草莓', '楓葉', '雪橇', '客廳'] },
      { id: 'v-客廳', cloze: true, clozeOptions: ['客廳', '浴室', '廁所', '倉庫'], word: '客廳', meaning: '家裡招待朋友、全家聊天的房間。', example: '晚飯後，全家在＿＿看電視。', img: 'living-room.png', options: ['客廳', '草莓', '楓葉', '前額'] },
      { id: 'v-前額', cloze: true, clozeOptions: ['前額', '腳底', '手肘', '膝蓋'], word: '前額', meaning: '眉毛上面、臉最上方那一塊。', example: '他頭痛得用手扶著＿＿。', img: 'forehead.png', options: ['前額', '雙脣', '客廳', '雪橇'] },
      { id: 'v-灌醉', cloze: true, clozeOptions: ['灌醉', '叫醒', '吵醒', '扶起'], word: '灌醉', meaning: '讓人喝太多酒，頭昏昏的。', example: '大人說，不可以把別人＿＿。', img: 'dizzy.png', options: ['灌醉', '釀酒', '恢復', '代替'] },
      { id: 'v-釀酒', cloze: true, clozeOptions: ['釀酒', '洗碗', '掃地', '寫字'], word: '釀酒', meaning: '把水果或穀物放著慢慢發酵，做成會讓人喝醉的飲料。', example: '這個小鎮的人擅長用葡萄＿＿。', img: 'wine-barrel.png', options: ['釀酒', '灌醉', '恢復', '原諒'] },
      { id: 'v-代替', cloze: true, clozeOptions: ['代替', '一起', '陪伴', '跟隨'], word: '代替', meaning: '換另一個人或東西來做。', example: '班長生病，由副班長＿＿他。', img: 'take-turns.png', options: ['代替', '原諒', '乞求', '恢復'] },
      { id: 'v-原諒', cloze: true, clozeOptions: ['原諒', '責罵', '懲罰', '記恨'], word: '原諒', meaning: '不再生氣，不計較別人的錯。', example: '他真心道歉，我就＿＿他了。', img: 'hug-friends.png', options: ['原諒', '代替', '乞求', '灌醉'] },
      { id: 'v-雙脣', cloze: true, clozeOptions: ['雙脣', '雙腳', '雙手', '雙眼'], word: '雙脣', meaning: '上下兩片嘴巴外面的肉。', example: '她緊閉＿＿，一句話也不說。', img: 'lips.png', options: ['雙脣', '前額', '客廳', '楓葉'] },
      { id: 'v-奔跑', cloze: true, clozeOptions: ['奔跑', '坐著', '躺下', '站著'], word: '奔跑', meaning: '用很快的速度向前衝。', example: '孩子們在操場上＿＿。', img: 'run-field.png', options: ['奔跑', '迴盪', '恢復', '原諒'] },
      { id: 'v-乞求', cloze: true, clozeOptions: ['乞求', '命令', '拒絕', '責備'], word: '乞求', meaning: '低聲下氣的請別人答應。', example: '小狗用眼神＿＿主人給牠零食。', img: 'beg-sorry.png', options: ['乞求', '原諒', '代替', '灌醉'] },
      { id: 'v-某天', cloze: true, clozeOptions: ['某天', '每天', '天天', '整天'], word: '某天', meaning: '不說清楚是哪個日子的那一日。', example: '＿＿早上，我在路上撿到一隻小鳥。', img: 'mystery-person.png', options: ['某天', '恢復', '活潑', '迴盪'] },
      { id: 'v-神采煥發', cloze: true, clozeOptions: ['神采煥發', '無精打采', '垂頭喪氣', '疲憊不堪'], word: '神采煥發', meaning: '精力充足，整個人亮亮的很有活力。', example: '睡飽以後，他＿＿＿＿的去上學。', img: 'happy-girl.png', options: ['神采煥發', '垂頭喪氣', '手足無措', '暴跳如雷'] },
      { id: 'v-雪橇', cloze: true, clozeOptions: ['雪橇', '汽車', '輪船', '飛機'], word: '雪橇', meaning: '在冰天凍地上滑行、沒有輪子的板車。', example: '我們坐著＿＿從山坡上滑下來。', img: 'sled.png', options: ['雪橇', '楓葉', '草莓', '前額'] },
      { id: 'v-鈴聲', cloze: true, clozeOptions: ['鈴聲', '雷聲', '雨聲', '風聲'], word: '鈴聲', meaning: '鐺子搖動發出的叮噹響。', example: '下課的＿＿響了。', img: 'bells.png', options: ['鈴聲', '迴盪', '雙脣', '客廳'] },
      { id: 'v-迴盪', cloze: true, clozeOptions: ['迴盪', '消失', '停止', '安靜'], word: '迴盪', meaning: '聲音在空中傳來傳去，久久不散。', example: '歌聲在山谷裡＿＿。', img: 'echo-valley.png', options: ['迴盪', '奔跑', '恢復', '活潑'] },
      { id: 'v-手足無措', cloze: true, clozeOptions: ['手足無措', '從容不迫', '冷靜沉著', '鎮定自若'], word: '手足無措', meaning: '慌張得不知道怎麼辦才好。', example: '燈突然熄了，大家＿＿＿＿。', img: 'panic-crowd.png', options: ['手足無措', '暴跳如雷', '垂頭喪氣', '和好如初'] },
      { id: 'v-暴跳如雷', cloze: true, clozeOptions: ['暴跳如雷', '笑容滿面', '心平氣和', '和顏悅色'], word: '暴跳如雷', meaning: '非常生氣，大吼大叫的樣子。', example: '花瓶被打破，老闆氣得＿＿＿＿。', img: 'angry-adult.png', options: ['暴跳如雷', '手足無措', '和好如初', '神采煥發'] },
      { id: 'v-垂頭喪氣', cloze: true, clozeOptions: ['垂頭喪氣', '興高采烈', '眉開眼笑', '精神抖擻'], word: '垂頭喪氣', meaning: '低著腦袋、很失望沒精神的樣子。', example: '比賽輸了，隊員們＿＿＿＿的離開。', img: 'sad-team.png', options: ['垂頭喪氣', '神采煥發', '暴跳如雷', '手足無措'] },
      { id: 'v-和好如初', cloze: true, clozeOptions: ['和好如初', '一刀兩斷', '越吵越凶', '互不理睬'], word: '和好如初', meaning: '吵架以後，又變回以前一樣親密。', example: '兩人說開了誤會，終於＿＿＿＿。', img: 'hug-friends.png', options: ['和好如初', '垂頭喪氣', '暴跳如雷', '手足無措'] }
    ],
    charwords: [
      { id: 'cw-楓', char: '楓', img: 'maple-leaves.png', charMeaning: '秋天葉子會變紅的樹。', word: '楓紅', meaning: '秋天楓樹的葉子變紅了。', example: '十一月，山上一片＿＿。', options: ['楓紅', '恢宏', '潑水', '藍莓'] },
      { id: 'cw-恢', char: '恢', img: 'recover.png', charMeaning: '寬大；回到原來。', word: '恢宏', meaning: '氣勢寬廣盛大。', example: '這座宮殿的建築非常＿＿。', options: ['恢宏', '餐廳', '額頭', '灌溉'] },
      { id: 'cw-潑', char: '潑', img: 'splash-water.png', charMeaning: '把水灑出去。', word: '潑水', meaning: '把水用力灑出去。', example: '夏天我們在院子裡＿＿玩耍。', options: ['潑水', '陶醉', '醞釀', '代替'] },
      { id: 'cw-莓', char: '莓', img: 'strawberry.png', charMeaning: '小小的、多汁的果實。', word: '藍莓', meaning: '藍紫色、小小圓圓的水果。', example: '我在優格裡加了＿＿。', options: ['藍莓', '諒解', '嘴脣', '奔跑'] },
      { id: 'cw-廳', char: '廳', img: 'living-room.png', charMeaning: '大房間。', word: '餐廳', meaning: '吃飯的地方。', example: '這家＿＿的牛排很好吃。', options: ['餐廳', '乞丐', '某人', '雪橇犬'] },
      { id: 'cw-額', char: '額', img: 'forehead.png', charMeaning: '眉毛上面的部位。', word: '額頭', meaning: '眉毛上面、頭的前面。', example: '媽媽摸摸我的＿＿，看我有沒有發燒。', options: ['額頭', '鈴鐺', '迴轉', '楓紅'] },
      { id: 'cw-灌', char: '灌', img: 'water-field.png', charMeaning: '把水倒進去。', word: '灌溉', meaning: '把水引到田裡給農作物喝。', example: '農夫用河水＿＿稻田。', options: ['灌溉', '恢宏', '潑水', '藍莓'] },
      { id: 'cw-醉', char: '醉', img: 'enjoy-music.png', charMeaning: '酒喝多了；沉迷。', word: '陶醉', meaning: '沉浸在美好的感覺裡。', example: '大家＿＿在美麗的風景中。', options: ['陶醉', '餐廳', '額頭', '灌溉'] },
      { id: 'cw-釀', char: '釀', img: 'wine-barrel.png', charMeaning: '慢慢發酵做成酒。', word: '醞釀', meaning: '慢慢準備、計畫一件事。', example: '一場大雨正在＿＿中。', options: ['醞釀', '陶醉', '潑水', '代替'] },
      { id: 'cw-替', char: '替', img: 'take-turns.png', charMeaning: '換；為別人。', word: '代替', meaning: '換另一個來做。', example: '我＿＿生病的同學值日。', options: ['代替', '諒解', '嘴脣', '奔跑'] },
      { id: 'cw-諒', char: '諒', img: 'hug-friends.png', charMeaning: '體會別人的難處。', word: '諒解', meaning: '了解原因後不再責怪。', example: '謝謝你的＿＿，我下次會注意。', options: ['諒解', '乞丐', '某人', '雪橇犬'] },
      { id: 'cw-脣', char: '脣', img: 'lips.png', charMeaning: '嘴巴外面的兩片肉。', word: '嘴脣', meaning: '嘴巴外面上下兩片肉。', example: '冬天要擦護脣膏，免得＿＿乾裂。', options: ['嘴脣', '鈴鐺', '迴轉', '楓紅'] },
      { id: 'cw-奔', char: '奔', img: 'run-field.png', charMeaning: '快跑。', word: '奔往', meaning: '快速跑向某個地方。', example: '聽到消息，他立刻＿＿醫院。', options: ['奔往', '恢宏', '潑水', '藍莓'] },
      { id: 'cw-乞', char: '乞', img: 'beg-sorry.png', charMeaning: '請求別人給予。', word: '乞丐', meaning: '向別人要錢或食物過日子的人。', example: '故事裡的王子變成了＿＿。', options: ['乞丐', '餐廳', '額頭', '灌溉'] },
      { id: 'cw-某', char: '某', img: 'mystery-person.png', charMeaning: '不說清楚是誰或哪個。', word: '某人', meaning: '不說出名字的某個人。', example: '＿＿把我的鉛筆拿走了。', options: ['某人', '陶醉', '醞釀', '代替'] },
      { id: 'cw-煥', char: '煥', img: 'shiny-room.png', charMeaning: '光亮。', word: '煥然一新', meaning: '整個變得又新又亮。', example: '大掃除後，教室＿＿＿＿。', options: ['煥然一新', '諒解', '嘴脣', '奔往'] },
      { id: 'cw-橇', char: '橇', img: 'sled.png', charMeaning: '在雪上滑的板車。', word: '雪橇犬', meaning: '在雪地裡拉雪橇的狗。', example: '一群＿＿＿拉著車在雪地上跑。', options: ['雪橇犬', '乞丐', '某人', '煥然一新'] },
      { id: 'cw-鈴', char: '鈴', img: 'bells.png', charMeaning: '搖動會響的金屬器具。', word: '鈴鐺', meaning: '搖一搖會叮噹響的小東西。', example: '腳踏車上的＿＿叮叮響。', options: ['鈴鐺', '楓紅', '恢宏', '潑水'] },
      { id: 'cw-迴', char: '迴', img: 'echo-valley.png', charMeaning: '繞回來。', word: '迴轉', meaning: '轉一圈往回走。', example: '這個路口不能＿＿。', options: ['迴轉', '藍莓', '餐廳', '額頭'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-焦頭爛額', situationImg: 'id-very-busy.png',
        anim: { bg: 'room', a: { mom: ['👩', 50, 60, 13], baby: ['👶', 22, 64, 10], pot: ['🍲', 78, 62, 10], sweat: ['💦', 62, 38, 8, 'h'], mess: ['🧸', 34, 74, 8, 'h'] },
          s: [['媽媽一個人在家照顧三個孩子。', [['bob', 'mom']]],
            ['弟弟把玩具丟滿地，寶寶在哭，', [['in', 'mess'], ['shake', 'baby']]],
            ['鍋子裡的湯又快燒焦了！', [['wig', 'pot'], ['in', 'sweat']]],
            ['忙得又累又辛苦，就是焦頭爛額。', [['shake', 'mom']]]] },
        idiom: '焦頭爛額', char: '額', meaning: '事情太多、太麻煩，忙得非常辛苦又狼狽。', example: '期末報告和考試一起來，我忙得焦頭爛額。', situation: '媽媽一個人照顧三個孩子，玩具滿地、寶寶哭、湯又快燒焦。',
        fill: { options: ['搬家那天東西好多，大家忙得＿＿＿＿。', '放假在家躺著看電視，真是＿＿＿＿。'], clue: '提示：哪一句是忙得很辛苦？', explain: '第一句用得對：搬家很忙很累。躺著看電視很輕鬆，剛好相反。' } },
      { id: 'i-脣亡齒寒', situationImg: 'id-neighbors.png',
        anim: { bg: 'park', a: { h1: ['🏠', 30, 60, 12], h2: ['🏠', 70, 60, 12], wind: ['🌬️', 10, 40, 10, 'h'], cold: ['🥶', 70, 36, 9, 'h'] },
          s: [['兩戶人家住在一起，互相照顧。', [['bob', 'h1'], ['bob', 'h2']]],
            ['有一天，前面那一家的牆倒了，', [['shake', 'h1']]],
            ['冷風一吹，後面那一家也冷得發抖。', [['in', 'wind'], ['in', 'cold']]],
            ['關係很密切，一方出事另一方也受影響，就是脣亡齒寒。', [['shake', 'h2']]]] },
        idiom: '脣亡齒寒', char: '脣', meaning: '比喻雙方關係非常密切，一方受害，另一方也會受到影響。', example: '鄰國之間脣亡齒寒，要互相幫助。', situation: '前面那一家的牆倒了，冷風一吹，後面那一家也冷得發抖。',
        fill: { options: ['兩隊是好夥伴，＿＿＿＿，一隊退出另一隊也贏不了。', '兩個人完全不認識，一點也沒有＿＿＿＿的關係。'], clue: '提示：哪一句是關係密切、互相影響？', explain: '第一句用得對：一隊退出會影響另一隊。完全不認識，就不會互相影響。' } },
      { id: 'i-疲於奔命', situationImg: 'id-running-around.png',
        anim: { bg: 'school', a: { kid: ['🏃', 50, 64, 12], a: ['📚', 18, 40, 9], b: ['⚽', 50, 30, 9], c: ['🎹', 82, 40, 9], sweat: ['💦', 60, 44, 8, 'h'] },
          s: [['放學後，小明要去補習，', [['mv', 'kid', [24, 64, 500]]]],
            ['接著去練球，', [['mv', 'kid', [50, 64, 500]]]],
            ['再趕去學鋼琴，累得喘不過氣。', [['mv', 'kid', [78, 64, 500]], ['in', 'sweat']]],
            ['事情太多，到處奔波累壞了，就是疲於奔命。', [['shake', 'kid']]]] },
        idiom: '疲於奔命', char: '奔', meaning: '事情太多，到處奔波，累得筋疲力盡。', example: '他同時參加五個社團，每天疲於奔命。', situation: '小明放學後要補習、練球、學琴，跑來跑去累壞了。',
        fill: { options: ['爸爸一天要跑三個地方開會，＿＿＿＿。', '他整個週末在家休息，過得＿＿＿＿。'], clue: '提示：哪一句是到處奔波、很累？', explain: '第一句用得對：一天跑三個地方，很累。在家休息，剛好相反。' } },
      { id: 'i-搖尾乞憐', situationImg: 'id-dog-beg.png',
        anim: { bg: 'room', a: { dog: ['🐶', 40, 66, 12], man: ['🧑', 74, 58, 13], bone: ['🍖', 74, 40, 9, 'h'], heart: ['🥺', 40, 44, 9, 'h'] },
          s: [['主人手上拿著好吃的肉。', [['in', 'bone']]],
            ['小狗搖著尾巴，', [['wig', 'dog']]],
            ['用可憐的眼神一直看著主人。', [['in', 'heart']]],
            ['低聲下氣討好別人，請求幫忙，就是搖尾乞憐。', [['bob', 'dog']]]] },
        idiom: '搖尾乞憐', char: '乞', meaning: '像小狗搖尾巴一樣，低聲下氣的討好別人，請求同情。', example: '他寧願自己努力，也不願向別人搖尾乞憐。', situation: '小狗搖著尾巴，用可憐的眼神看著拿肉的主人。',
        fill: { options: ['他犯了錯，就向老師＿＿＿＿，希望不被處罰。', '他抬頭挺胸，靠自己的實力贏得比賽，從不＿＿＿＿。'], clue: '提示：哪一句是低聲下氣討好別人？', explain: '第一句用得對：犯錯就討好老師。靠實力贏得比賽，不需要討好別人。' } },
      { id: 'i-掩耳盜鈴', situationImg: 'id-cover-ears.png',
        anim: { bg: 'room', a: { thief: ['🦹', 40, 62, 12], bell: ['🔔', 66, 50, 10], ears: ['🙉', 40, 38, 9, 'h'], noise: ['🔊', 80, 34, 9, 'h'] },
          s: [['有一個人想偷一個大鈴鐺。', [['bob', 'bell']]],
            ['他怕鈴鐺響，就把自己的耳朵摀起來。', [['in', 'ears']]],
            ['可是鈴鐺一碰就響，別人全都聽到了！', [['wig', 'bell'], ['in', 'noise']]],
            ['以為自己聽不到別人就不知道，就是掩耳盜鈴。', [['shake', 'thief']]]] },
        idiom: '掩耳盜鈴', char: '鈴', meaning: '自己騙自己，以為別人不會發現。', example: '把考卷藏起來不讓爸媽看，就像掩耳盜鈴。', situation: '小偷摀住自己的耳朵去偷鈴鐺，以為別人也聽不到。',
        fill: { options: ['他把打破的碗藏在床下，以為沒人發現，真是＿＿＿＿。', '他打破碗後馬上告訴媽媽，一點也不＿＿＿＿。'], clue: '提示：哪一句是自己騙自己？', explain: '第一句用得對：以為藏起來就沒人知道。馬上說出來，剛好相反。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-楓', char: '楓', wrong: '瘋', sentence: '公園裡種了好多楓樹。', options: ['楓', '瘋', '諷'], clue: '這裡說的是秋天葉子會變紅的樹，想一想，哪一個字有木字旁？', explain: '要改成「楓」。會變紅的樹是「楓樹」；「瘋」是發瘋的瘋。' },
      { id: 'fx-恢', char: '恢', wrong: '灰', sentence: '雨停後，天氣恢復晴朗。', options: ['恢', '灰', '詼'], clue: '這裡是說回到原來的樣子，想一想，哪一個字有豎心旁？', explain: '要改成「恢」。回到原樣是「恢復」；「灰」是灰色的灰。' },
      { id: 'fx-潑', char: '潑', wrong: '發', sentence: '他不小心把湯潑到桌上。', options: ['潑', '發', '撥'], clue: '這裡是說把液體灑出去，想一想，哪一個字有三點水？', explain: '要改成「潑」。灑出去是「潑」；「發」是出發的發。' },
      { id: 'fx-莓', char: '莓', wrong: '梅', sentence: '冰箱裡有一盒新鮮的草莓。', options: ['莓', '梅', '每'], clue: '這裡說的是紅紅酸甜的水果，想一想，哪一個字有草字頭？', explain: '要改成「莓」。紅色水果是「草莓」；「梅」是梅花的梅。' },
      { id: 'fx-廳', char: '廳', wrong: '聽', sentence: '客人在客廳等你。', options: ['廳', '聽', '庭'], clue: '這裡說的是招待客人的房間，想一想，哪一個字的外面是「广」？', explain: '要改成「廳」。房間是「客廳」；「聽」是聽見的聽。' },
      { id: 'fx-額', char: '額', wrong: '客', sentence: '他撞到門，額頭腫了一個包。', options: ['額', '客', '顏'], clue: '這裡說的是眉毛上面的部位，想一想，哪一個字的右邊是「頁」？', explain: '要改成「額」。眉上部位是「額頭」；「客」是客人的客。' },
      { id: 'fx-灌', char: '灌', wrong: '罐', sentence: '他把水灌進水壺裡。', options: ['灌', '罐', '觀'], clue: '這裡是說把水倒進去，想一想，哪一個字有三點水？', explain: '要改成「灌」。倒水進去是「灌」；「罐」是罐頭的罐。' },
      { id: 'fx-醉', char: '醉', wrong: '碎', sentence: '爸爸說喝醉了不能開車。', options: ['醉', '碎', '卒'], clue: '這裡是說酒喝太多，想一想，哪一個字的左邊是「酉」？', explain: '要改成「醉」。喝太多酒是「醉」；「碎」是碎片的碎。' },
      { id: 'fx-諒', char: '諒', wrong: '涼', sentence: '請你原諒我的無心之錯。', options: ['諒', '涼', '晾'], clue: '這裡是說不再生氣、不計較，想一想，哪一個字有言字旁？', explain: '要改成「諒」。不計較是「原諒」；「涼」是涼快的涼。' },
      { id: 'fx-奔', char: '奔', wrong: '奮', sentence: '下課鐘一響，大家奔向操場。', options: ['奔', '奮', '卉'], clue: '這裡是說快速的跑，想一想，哪一個字的下面是「卉」？', explain: '要改成「奔」。快跑是「奔」；「奮」是奮鬥的奮。' },
      { id: 'fx-乞', char: '乞', wrong: '吃', sentence: '他向大家乞求原諒。', options: ['乞', '吃', '气'], clue: '這裡是說低聲請求，想一想，哪一個字沒有口字旁？', explain: '要改成「乞」。請求是「乞求」；「吃」是吃飯的吃。' },
      { id: 'fx-某', char: '某', wrong: '謀', sentence: '某一天，我在路上遇到老朋友。', options: ['某', '謀', '煤'], clue: '這裡是說不說清楚是哪一個，想一想，哪一個字沒有言字旁？', explain: '要改成「某」。不說清楚是「某」；「謀」是計謀的謀。' },
      { id: 'fx-煥', char: '煥', wrong: '換', sentence: '整理過後，房間煥然一新。', options: ['煥', '換', '喚'], clue: '這裡是說又新又亮，想一想，哪一個字有火字旁？', explain: '要改成「煥」。又新又亮是「煥然一新」；「換」是交換的換。' },
      { id: 'fx-鈴', char: '鈴', wrong: '零', sentence: '門鈴響了，快去開門。', options: ['鈴', '零', '玲'], clue: '這裡說的是按了會響的東西，想一想，哪一個字有金字旁？', explain: '要改成「鈴」。會響的東西是「鈴」；「零」是零食的零。' },
      { id: 'fx-迴', char: '迴', wrong: '徊', sentence: '笑聲在走廊裡迴盪。', options: ['迴', '徊', '洄'], clue: '這裡是說聲音傳來傳去，想一想，哪一個字有辵字旁？', explain: '要改成「迴」。聲音傳來傳去是「迴盪」；「徊」是徘徊的徊。' }
    ],
    similar: [
      { id: 's1', meaning: '「颱＿」是夏秋常來、帶著暴雨的大氣旋。', sentence: '颱＿天不要去海邊。', frame: '颱＿', options: ['風', '楓'], answer: '風', clue: '提示：這個字沒有木字旁。', explain: '答案是「風」；「楓」是楓葉的楓。' },
      { id: 's2', meaning: '「＿色」是黑白混在一起的顏色。', sentence: '天空一片＿色，好像要下雨。', frame: '＿色', options: ['灰', '恢'], answer: '灰', clue: '提示：這個字沒有豎心旁。', explain: '答案是「灰」；「恢」是恢復的恢。' },
      { id: 's3', meaning: '「出＿」是開始往目的地走。', sentence: '我們早上八點出＿。', frame: '出＿', options: ['發', '潑'], answer: '發', clue: '提示：這個字沒有三點水。', explain: '答案是「發」；「潑」是潑水的潑。' },
      { id: 's4', meaning: '「＿花」是冬天在寒冷中開的花。', sentence: '寒冬裡，＿花開了。', frame: '＿花', options: ['梅', '莓'], answer: '梅', clue: '提示：這是一種樹，左邊是木字旁。', explain: '答案是「梅」；「莓」是草莓的莓。' },
      { id: 's5', meaning: '「＿話」是照著別人說的去做。', sentence: '弟弟很＿話。', frame: '＿話', options: ['聽', '廳'], answer: '聽', clue: '提示：這個字的左邊是「耳」。', explain: '答案是「聽」；「廳」是客廳的廳。' },
      { id: 's6', meaning: '「＿人」是來家裡拜訪的人。', sentence: '家裡來了＿人。', frame: '＿人', options: ['客', '額'], answer: '客', clue: '提示：這個字沒有「頁」。', explain: '答案是「客」；「額」是額頭的額。' },
      { id: 's7', meaning: '「＿頭」是密封在金屬盒子裡的食物。', sentence: '我打開一個鳳梨＿頭。', frame: '＿頭', options: ['罐', '灌'], answer: '罐', clue: '提示：這個字的左邊是「缶」。', explain: '答案是「罐」；「灌」是灌溉的灌。' },
      { id: 's8', meaning: '「＿座」是把位子給別人坐。', sentence: '公車上要＿座給老人。', frame: '＿座', options: ['讓', '釀'], answer: '讓', clue: '提示：和說話有關，左邊是言字旁。', explain: '答案是「讓」；「釀」是釀酒的釀。' },
      { id: 's9', meaning: '「＿快」是溫度舒服、不熱。', sentence: '大樹下很＿快。', frame: '＿快', options: ['涼', '諒'], answer: '涼', clue: '提示：和水有關，左邊是三點水。', explain: '答案是「涼」；「諒」是原諒的諒。' },
      { id: 's10', meaning: '「早＿」是一天剛開始的時候。', sentence: '早＿的空氣很新鮮。', frame: '早＿', options: ['晨', '脣'], answer: '晨', clue: '提示：這個字的上面是「日」。', explain: '答案是「晨」；「脣」是嘴脣的脣。' },
      { id: 's11', meaning: '「＿飯」是把飯放進嘴裡嚼一嚼吞下。', sentence: '我們一起去＿飯。', frame: '＿飯', options: ['吃', '乞'], answer: '吃', clue: '提示：和嘴巴有關，左邊是口字旁。', explain: '答案是「吃」；「乞」是乞求的乞。' },
      { id: 's12', meaning: '「交＿」是把東西互相給對方。', sentence: '我們來交＿禮物。', frame: '交＿', options: ['換', '煥'], answer: '換', clue: '提示：要用手，左邊是提手旁。', explain: '答案是「換」；「煥」是煥然一新的煥。' },
      { id: 's13', meaning: '「＿食」是正餐以外的小點心。', sentence: '我的書包裡有＿食。', frame: '＿食', options: ['零', '鈴'], answer: '零', clue: '提示：這個字的上面是雨字頭。', explain: '答案是「零」；「鈴」是鈴鐺的鈴。' },
      { id: 's14', meaning: '「＿家」是走到自己住的地方。', sentence: '放學後我馬上＿家。', frame: '＿家', options: ['回', '迴'], answer: '回', clue: '提示：這個字沒有辵字旁。', explain: '答案是「回」；「迴」是迴盪的迴。' }
    ],
    listen: [
      { id: 'l1', text: '燈突然熄了，大家慌得不知道怎麼辦。', answer: 0, options: [{ text: '手足無措', img: 'panic-crowd.png' }, { text: '暴跳如雷', img: 'angry-adult.png' }, { text: '垂頭喪氣', img: 'sad-team.png' }, { text: '和好如初', img: 'hug-friends.png' }] },
      { id: 'l2', text: '花瓶被打破，老闆氣得大吼大叫。', answer: 0, options: [{ text: '暴跳如雷', img: 'angry-adult.png' }, { text: '手足無措', img: 'panic-crowd.png' }, { text: '神采煥發', img: 'happy-girl.png' }, { text: '原諒', img: 'hug-friends.png' }] },
      { id: 'l3', text: '比賽輸了，大家低著頭，很失望。', answer: 0, options: [{ text: '垂頭喪氣', img: 'sad-team.png' }, { text: '神采煥發', img: 'happy-girl.png' }, { text: '活潑', img: 'happy-girl.png' }, { text: '暴跳如雷', img: 'angry-adult.png' }] },
      { id: 'l4', text: '說開誤會後，兩個人又像以前一樣要好。', answer: 0, options: [{ text: '和好如初', img: 'hug-friends.png' }, { text: '垂頭喪氣', img: 'sad-team.png' }, { text: '手足無措', img: 'panic-crowd.png' }, { text: '代替', img: 'take-turns.png' }] },
      { id: 'l5', text: '睡飽了，他整個人精神很好、亮亮的。', answer: 0, options: [{ text: '神采煥發', img: 'happy-girl.png' }, { text: '垂頭喪氣', img: 'sad-team.png' }, { text: '灌醉', img: 'dizzy.png' }, { text: '恢復', img: 'recover.png' }] },
      { id: 'l6', text: '歌聲在山谷裡傳來傳去，久久不散。', answer: 0, options: [{ text: '迴盪', img: 'echo-valley.png' }, { text: '奔跑', img: 'run-field.png' }, { text: '鈴聲', img: 'bells.png' }, { text: '活潑', img: 'happy-girl.png' }] },
      { id: 'l7', text: '他真心道歉，我就不再生他的氣了。', answer: 0, options: [{ text: '原諒', img: 'hug-friends.png' }, { text: '代替', img: 'take-turns.png' }, { text: '乞求', img: 'beg-sorry.png' }, { text: '灌醉', img: 'dizzy.png' }] },
      { id: 'l8', text: '我們坐著沒有輪子的板車，從雪坡上滑下來。', answer: 0, options: [{ text: '雪橇', img: 'sled.png' }, { text: '楓葉', img: 'maple-leaves.png' }, { text: '客廳', img: 'living-room.png' }, { text: '草莓', img: 'strawberry.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '在哪裡', answer: '怎麼樣', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看在哪裡有什麼樣的東西。',
      /* 短語：（動詞）在（地方）＋形容詞＋的＋名詞（句子都是自己寫的） */
      intro: { example: '飄在風中淡淡的花香', img: 'pr-flower-breeze.png',
        parts: [{ text: '飄在風中', role: '在哪裡' }, { text: '淡淡', role: '怎麼樣' }, { text: '的' }, { text: '花香', role: '什麼東西' }],
        explain: '先說東西在哪裡、怎麼動，再說出它的樣子，加上「的」，最後說是什麼東西。' },
      pick: [
        { id: 'ph1', img: 'pr-clouds.png', before: '飄在天空中', noun: '白雲', ask: '飄在天空中什麼樣的白雲', look: '再看看圖片，雲看起來怎麼樣？', options: ['柔軟', '堅硬', '粗糙', '尖銳'], clue: '提示：看起來像棉花糖一樣。', explain: '答案是「柔軟」，完整的短語是「飄在天空中柔軟的白雲」。' },
        { id: 'ph2', img: 'pr-rose.png', before: '開在花園裡', noun: '玫瑰', ask: '開在花園裡什麼樣的玫瑰', look: '再看看圖片，玫瑰的顏色怎麼樣？', options: ['鮮豔', '枯萎', '灰暗', '醜陋'], clue: '提示：紅通通的，一眼就看到。', explain: '答案是「鮮豔」，完整的短語是「開在花園裡鮮豔的玫瑰」。' },
        { id: 'ph3', img: 'pr-goldfish.png', before: '游在池塘裡', noun: '金魚', ask: '游在池塘裡什麼樣的金魚', look: '再看看圖片，金魚游得怎麼樣？', options: ['活潑', '呆板', '懶散', '虛弱'], clue: '提示：一下子東、一下子西，停不下來。', explain: '答案是「活潑」，完整的短語是「游在池塘裡活潑的金魚」。' },
        { id: 'ph4', img: 'pr-moon.png', before: '掛在夜空中', noun: '月亮', ask: '掛在夜空中什麼樣的月亮', look: '再看看圖片，月光照得清不清楚？', options: ['明亮', '暗淡', '模糊', '漆黑'], clue: '提示：把整條小路都照得清清楚楚。', explain: '答案是「明亮」，完整的短語是「掛在夜空中明亮的月亮」。' },
        { id: 'ph5', img: 'bells.png', before: '響在耳邊', noun: '鈴聲', ask: '響在耳邊什麼樣的鈴聲', look: '再看看圖片，鈴鐺發出什麼聲音？', options: ['清脆', '沙啞', '低沉', '刺耳'], clue: '提示：叮鈴叮鈴，像玻璃珠碰在一起。', explain: '答案是「清脆」，完整的短語是「響在耳邊清脆的鈴聲」。' },
        { id: 'ph6', img: 'echo-valley.png', before: '迴盪在山谷間', noun: '笑聲', ask: '迴盪在山谷間什麼樣的笑聲', look: '再看看圖片，大家玩得開不開心？', options: ['歡樂', '悲傷', '冷淡', '難過'], clue: '提示：大家玩得好開心，一直哈哈大笑。', explain: '答案是「歡樂」，完整的短語是「迴盪在山谷間歡樂的笑聲」。' }
      ],
      say: [],
      words: [
        { word: '手足無措', meaning: '慌張得不知道怎麼辦才好。', img: 'panic-crowd.png' },
        { word: '暴跳如雷', meaning: '非常生氣，大吼大叫的樣子。', img: 'angry-adult.png' },
        { word: '垂頭喪氣', meaning: '低著腦袋、很失望沒精神的樣子。', img: 'sad-team.png' },
        { word: '和好如初', meaning: '吵架以後，又變回以前一樣親密。', img: 'hug-friends.png' }
      ],
      choose: [
        { id: 'pw1', word: '手足無措', options: ['第一次上臺表演，他緊張得手足無措。', '他冷靜的處理好每一件事，手足無措。'], clue: '提示：想一想，「手足無措」是很慌張，還是很冷靜？', explain: '第一句用得對：太緊張不知道怎麼辦。冷靜處理，剛好相反。' },
        { id: 'pw2', word: '暴跳如雷', options: ['看到牆壁被亂畫，爸爸暴跳如雷。', '收到生日禮物，她開心得暴跳如雷。'], clue: '提示：想一想，「暴跳如雷」是很生氣，還是很開心？', explain: '第一句用得對：牆壁被畫很生氣。開心不能用暴跳如雷。' },
        { id: 'pw3', word: '垂頭喪氣', options: ['沒考好，他垂頭喪氣的走回家。', '他得了冠軍，垂頭喪氣的上臺領獎。'], clue: '提示：想一想，「垂頭喪氣」是失望，還是得意？', explain: '第一句用得對：沒考好很失望。得冠軍是開心，剛好相反。' },
        { id: 'pw4', word: '和好如初', options: ['吵完架隔天，兩姐妹又和好如初。', '他們吵架後再也不說話，終於和好如初。'], clue: '提示：想一想，「和好如初」是變回要好，還是不說話？', explain: '第一句用得對：吵架後又變要好。再也不說話，剛好相反。' }
      ],
      make: [
        { id: 'pm1', word: '手足無措', clue: '提示：想想看，什麼時候你會慌得不知道怎麼辦？', model: '在大賣場和媽媽走散時，我手足無措的大哭。' },
        { id: 'pm2', word: '暴跳如雷', clue: '提示：想想看，什麼事會讓人非常生氣？', model: '小偷偷走了腳踏車，鄰居氣得暴跳如雷。' },
        { id: 'pm3', word: '垂頭喪氣', clue: '提示：想想看，什麼時候你會很失望？', model: '遠足因為下雨取消，大家都垂頭喪氣。' },
        { id: 'pm4', word: '和好如初', clue: '提示：想想看，你和朋友吵架後怎麼和好？', model: '我向好朋友道歉後，我們又和好如初。' }
      ]
    },
    pattern: [
      { key: 'renpingdou', id: 'rp', title: '任憑……都……', img: 'renpingdou.png',
        meaning: '用「任憑」、「都」，說出不管別人怎麼做，結果都不會改變。',
        examples: ['任憑大家怎麼叫，小狗都不肯出來。'],
        match: [
          { id: 'pt-rp-m1', img: 'pt-stubborn-cat.png', front: '任憑我怎麼叫牠，', options: ['小貓都不肯下來。', '小貓就下來了。', '所以很高興。'], clue: '提示：看看圖片，小貓有沒有下來？', explain: '答案是「小貓都不肯下來」：不管怎麼叫，結果都不變。' },
          { id: 'pt-rp-m2', img: 'pt-strong-tree.png', front: '任憑風雨多麼猛烈，', options: ['大樹都站得很穩。', '大樹就倒了。', '所以很安靜。'], clue: '提示：看看圖片，大樹倒了沒有？', explain: '答案是「大樹都站得很穩」：不管風雨多大，結果都不變。' },
          { id: 'pt-rp-m3', img: 'pt-firm-kid.png', front: '任憑同學怎麼勸，', options: ['他都不肯改變主意。', '他就馬上答應。', '所以很開心。'], clue: '提示：看看圖片，他的表情怎麼樣？', explain: '答案是「他都不肯改變主意」：不管怎麼勸，結果都不變。' }
        ],
        conj: [
          { id: 'pt-rp-c1', full: '任憑媽媽怎麼哄，寶寶都哭個不停。', img: 'pt-crying-baby.png', sentence: '＿＿媽媽怎麼哄，寶寶＿哭個不停。', options: ['任憑……都……', '雖然……可是……', '如果……就……'], clue: '提示：不管怎麼做，結果都不變。數數看有幾個空格。', explain: '答案是「任憑……都……」：任憑媽媽怎麼哄，寶寶都哭個不停。' },
          { id: 'pt-rp-c2', full: '任憑別人怎麼笑他，他都堅持練習。', img: 'pt-practice.png', sentence: '＿＿別人怎麼笑他，他＿堅持練習。', options: ['任憑……都……', '雖然……可是……', '如果……就……'], clue: '提示：不管怎麼做，結果都不變。數數看有幾個空格。', explain: '答案是「任憑……都……」：任憑別人怎麼笑他，他都堅持練習。' }
        ],
        half: [
          { id: 'pt-rp-h1', front: '任憑弟弟怎麼拜託，', clue: '提示：弟弟一直拜託，結果怎樣？記得要說「都」。', model: '哥哥都不肯把玩具借他。' },
          { id: 'pt-rp-h2', front: '任憑天氣多麼寒冷，', clue: '提示：天氣再冷，誰還是會做什麼？記得要說「都」。', model: '爺爺都會出門散步。' }
        ],
        whole: [
          { id: 'pt-rp-w1', clue: '提示：用「任憑」、「都」說出不管怎樣都不改變的事。想想看：有什麼事你一定會堅持？', model: '任憑功課再多，我都會每天看一頁書。' }
        ] },
      { key: 'suirankeshi', id: 'sk', title: '雖然……可是……', img: 'suirankeshi.png',
        meaning: '用「雖然」、「可是」，說出前後相反、讓人想不到的情形。',
        examples: ['這件衣服雖然很舊，可是穿起來很舒服。'],
        match: [
          { id: 'pt-sk-m1', img: 'pt-small-dog.png', front: '這隻小狗雖然很小，', options: ['可是叫聲很大。', '所以很小聲。', '而且很小。'], clue: '提示：看看圖片，小狗叫得大不大聲？前後要相反。', explain: '答案是「可是叫聲很大」：小和大聲，前後相反。' },
          { id: 'pt-sk-m2', img: 'pt-apologize.png', front: '他雖然不是故意的，', options: ['可是還是道歉了。', '所以不道歉。', '而且很故意。'], clue: '提示：看看圖片，他有沒有道歉？前後要相反。', explain: '答案是「可是還是道歉了」：不是故意的，卻還是道歉，前後相反。' },
          { id: 'pt-sk-m3', img: 'pt-old-house.png', front: '這間房子雖然很老舊，', options: ['可是住起來很溫暖。', '所以住起來很冷。', '而且到處都破了。'], clue: '提示：看看圖片，屋裡的人感覺怎麼樣？前後要相反。', explain: '答案是「可是住起來很溫暖」：老舊和溫暖，前後相反。' }
        ],
        conj: [
          { id: 'pt-sk-c1', full: '題目雖然很難，可是他還是做出來了。', img: 'pt-hard-question.png', sentence: '題目＿＿很難，＿＿他還是做出來了。', options: ['雖然……可是……', '任憑……都……', '如果……就……'], clue: '提示：前後的意思相反。數數看有幾個空格。', explain: '答案是「雖然……可是……」：題目雖然很難，可是他還是做出來了。' },
          { id: 'pt-sk-c2', full: '外面雖然很冷，可是屋裡很暖和。', img: 'pt-warm-home.png', sentence: '外面＿＿很冷，＿＿屋裡很暖和。', options: ['雖然……可是……', '任憑……都……', '如果……就……'], clue: '提示：前後的意思相反。數數看有幾個空格。', explain: '答案是「雖然……可是……」：外面雖然很冷，可是屋裡很暖和。' }
        ],
        half: [
          { id: 'pt-sk-h1', front: '我們雖然吵過架，', clue: '提示：吵過架，可是後來怎樣？記得要說「可是」。', model: '可是現在還是好朋友。' },
          { id: 'pt-sk-h2', front: '這碗湯雖然看起來很淡，', clue: '提示：看起來淡，可是喝起來怎樣？記得要說「可是」。', model: '可是喝起來很鮮甜。' }
        ],
        whole: [
          { id: 'pt-sk-w1', clue: '提示：用「雖然」、「可是」說出前後相反的情形。想想看：有什麼事一開始很難，後來卻做到了？', model: '騎腳踏車雖然一開始很難，可是我後來學會了。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'simile', name: '譬喻', meaning: '把一樣東西比成另一樣有相同地方的東西，讓人更容易想像。', example: '課文把夜空中閃閃的星星比成珍珠，讓人感覺到星星又亮又美。',
          show: { sentence: '小女孩的笑容像陽光一樣溫暖。', mark: ['像陽光一樣'] },
          yesno: [
            { id: 'rh-si-y1', sentence: '雪地像一張白色的大地毯。', answer: true, mark: ['像一張白色的大地毯'], clue: '提示：這句話有沒有把雪地比成另一樣東西？', explain: '是譬喻：把雪地比成白地毯。' },
            { id: 'rh-si-y2', sentence: '地上積了很多雪。', answer: false, clue: '提示：這句話有沒有把雪比成另一樣東西？', explain: '不是譬喻：這句話只是說地上有雪。' }
          ],
          pick: [
            { id: 'rh-si-p1', mark: ['像一團火'], options: ['秋天的楓樹像一團火。', '秋天的楓葉變紅了。'], clue: '提示：哪一句把楓樹比成另一樣東西？', explain: '把楓樹比成火，是譬喻。' },
            { id: 'rh-si-p2', mark: ['像寶石'], options: ['草莓紅得像寶石。', '我買了草莓。'], clue: '提示：哪一句把草莓比成另一樣東西？', explain: '把草莓比成寶石，是譬喻。' },
            { id: 'rh-si-p3', mark: ['像兩顆星星'], options: ['她的眼睛亮得像兩顆星星。', '她看著我。', '她的眼睛很大。'], clue: '提示：哪一句把眼睛比成另一樣東西？', explain: '把眼睛比成星星，是譬喻。' },
            { id: 'rh-si-p4', mark: ['像一條白龍'], options: ['瀑布像一條白龍衝下來。', '山上有瀑布。', '水很冰。'], clue: '提示：哪一句把瀑布比成另一樣東西？', explain: '把瀑布比成白龍，是譬喻。' },
            { id: 'rh-si-p5', mark: ['像一把傘'], options: ['大樹像一把傘替我們遮陽。', '樹下很涼。', '我坐在樹下。', '樹很高。'], clue: '提示：哪一句把大樹比成另一樣東西？', explain: '把大樹比成傘，是譬喻。' },
            { id: 'rh-si-p6', mark: ['像小鈴鐺'], options: ['她的笑聲像小鈴鐺。', '她笑了。', '她很開心。', '她站在門口。'], clue: '提示：哪一句把笑聲比成另一樣東西？', explain: '把笑聲比成鈴鐺，是譬喻。' }
          ] },
        { key: 'repeat', name: '類疊', meaning: '同一個字或詞連著重複，或隔開來重複說好幾次，讀起來有節奏，也讓人印象更深。', example: '課文寫大家急急忙忙出門、整夜不睡不休息，重複的字讓人感覺到有多緊急。',
          show: { sentence: '她急急忙忙的穿上外套。', mark: ['急急忙忙'] },
          yesno: [
            { id: 'rh-rp-y1', sentence: '他高高興興的回家了。', answer: true, mark: ['高高興興'], clue: '提示：找找看，有沒有連著重複的字？', explain: '是類疊：「高高」、「興興」連著重複。' },
            { id: 'rh-rp-y2', sentence: '他開心的回家了。', answer: false, clue: '提示：找找看，有沒有同一個字或詞重複出現？', explain: '不是類疊：這句話沒有重複的字或詞。' }
          ],
          pick: [
            { id: 'rh-rp-p1', mark: ['層層'], options: ['山上的楓葉層層疊疊。', '山上的楓葉紅了。'], clue: '提示：哪一句有連著重複的字？', explain: '「層層」連著重複，是類疊。' },
            { id: 'rh-rp-p2', mark: ['一口一口'], options: ['她一口一口的喝著熱湯。', '她喝了熱湯。'], clue: '提示：哪一句把同一個詞說了兩次？', explain: '「一口一口」重複了「一口」，是類疊。' },
            { id: 'rh-rp-p3', mark: ['不吃不喝'], options: ['他難過得不吃不喝。', '他很難過。', '他坐在床上。'], clue: '提示：哪一句有同一個字隔開來重複？', explain: '「不吃不喝」重複了「不」，是類疊。' },
            { id: 'rh-rp-p4', mark: ['亮晶晶'], options: ['星星亮晶晶的。', '天空中有光點。', '夜空很美。'], clue: '提示：哪一句有連著重複的字？', explain: '「亮晶晶」重複了「晶」，是類疊。' },
            { id: 'rh-rp-p5', mark: ['跑啊跑'], options: ['小狗跑啊跑，跑到河邊。', '小狗跑到河邊。', '河水很清。', '小狗喝水。'], clue: '提示：哪一句把同一個字說了好幾次？', explain: '「跑啊跑」重複了「跑」，是類疊。' },
            { id: 'rh-rp-p6', mark: ['安安靜靜'], options: ['教室裡安安靜靜的。', '大家在寫作業。', '老師在講臺。', '窗戶開著。'], clue: '提示：哪一句有連著重複的字？', explain: '「安安靜靜」連著重複，是類疊。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '月亮像一面圓圓的鏡子。', answer: '譬喻', mark: ['像一面圓圓的鏡子'], clue: '提示：這句話有沒有把月亮比成另一樣東西？', explain: '答案是「譬喻」：把月亮比成鏡子。' },
        { id: 'rh2', sentence: '她的臉紅得像蘋果。', answer: '譬喻', mark: ['像蘋果'], clue: '提示：這句話有沒有把臉比成另一樣東西？', explain: '答案是「譬喻」：把臉比成蘋果。' },
        { id: 'rh3', sentence: '他們說說笑笑的走在路上。', answer: '類疊', mark: ['說說笑笑'], clue: '提示：這句話有沒有連著重複的字？', explain: '答案是「類疊」：「說說」、「笑笑」連著重複。' },
        { id: 'rh4', sentence: '一步一步往前走，終於到了山頂。', answer: '類疊', mark: ['一步一步'], clue: '提示：這句話有沒有把同一個詞說兩次？', explain: '答案是「類疊」：「一步」重複了兩次。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L11 = d; }
})(this);
