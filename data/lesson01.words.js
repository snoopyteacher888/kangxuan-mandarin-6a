/* 第 1 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'infer', qe: 'infer', qf: 'infer', qg: 'interpret', qh: 'interpret',
      qi: 'evaluate', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qg: { think: ['比賽前，他對換棒次、搬器材的事有什麼感覺？', '聽了隊友的鼓勵、想起老師的話以後，他的心情怎麼變了？'], why: '他一開始覺得委屈、生氣，想故意跑慢；看到受傷的同學還堅持上場、隊友互相打氣，他又激動又慚愧；最後想通了，決定為班級全力衝刺。心情是從不滿，到慚愧，再到充滿鬥志。' },
      qh: { think: ['一個人說「你贏了」，是把功勞給誰？', '另一個人說「我們贏了」，又是把功勞給誰？'], why: '說「你贏了」，是稱讚最後衝過終點的同學；說「我們贏了」，是說勝利屬於整個隊伍。兩句話一起出現，表示兩人都放下了不愉快，懂得團隊合作。' },
      qi: { think: ['他一開始做了哪些不太好的事？', '後來他怎麼改變？'], why: '他會生氣、會鬧脾氣，但也會反省；最後能放下自己的得失，為班級努力，表示他其實是個願意改過、有責任感的人。' },
      qj: { think: ['「跑道」只是比賽的地方嗎？', '每個人的人生是不是也像在跑道上，要和別人一起往前？'], why: '課名表面上是說比賽的跑道，也比喻每個人成長的路。在路上要學會合作、放下自己，才能一起抵達終點。說出你覺得適不適合和理由就可以。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['大隊接力時，我跑得不快，但我努力把棒子交好。', '分組做海報，我負責畫畫，大家一起完成了作品。'], bad: ['我只想自己出風頭，別人怎樣都不關我的事。', '分組時我都不做事，讓別人做就好。'], why: '題目問的是你參加團體合作的經驗。不管負責什麼，只要盡心盡力就是團隊精神。只想出風頭、不做事，都不是合作。' },
      k2: { good: ['我會先說出自己的感受，再聽聽老師的理由。', '我會想一想，換一個位置是不是也能幫上忙。'], bad: ['我會故意表現不好，讓大家輸。', '我會一直生悶氣，誰都不理。'], why: '題目問的是被分配到不喜歡的工作時怎麼辦。好好說出感受、試著從團體的角度想，都是好方法。故意搞砸、生悶氣，只會讓大家更難過。' }
    },
    hanzi: [
      { id: 'h-軸', combo: { layout: 'lr', parts: [['車', 'm', '車子'], ['由', 's', '']] }, char: '軸', zhuyin: 'ㄓㄡˊ', radical: '車', strokes: 12, words: ['壓軸', '車軸'], say: '軸，車軸的軸', cloze: '車＿', img: 'wheel-axle.png', options: ['軸', '抽', '油', '袖'], clue: '這個字的左邊是車字旁。', explain: '答案是「軸」，左邊是車字旁；「抽」的左邊是提手旁，「袖」的左邊是衣字旁。', parts: ['車', '由'], story: '左邊是車，右邊的「由」念起來有點像「軸」。穿過車輪中間、讓輪子轉動的桿子，就是「車軸」；排在最後的重要節目，叫「壓軸」。', sentence: '這場表演的壓軸是全班大合唱。', build: { layout: 'lr', show: ['？', '由'], answer: '車', options: ['車', '扌', '氵', '衤'], clue: '想一想：讓輪子轉動的桿子，左邊放哪一個？' } },
      { id: 'h-奪', combo: { type: '會意字', pict: '上面的「大」和中間的「隹」像一隻鳥，下面的「寸」是手。手裡抓著的鳥用力飛走了，或被別人搶走，就是「奪」。' }, char: '奪', zhuyin: 'ㄉㄨㄛˊ', radical: '大', strokes: 14, words: ['爭奪', '搶奪'], say: '奪，搶奪的奪', cloze: '搶＿', img: 'grab-ball.png', options: ['奪', '奮', '奇', '套'], clue: '這個字的下面是「寸」。', explain: '答案是「奪」，下面是「寸」；「奮」的下面是「田」，「套」的下面是「長」的樣子。', parts: ['大', '隹', '寸'], story: '中間像一隻鳥，下面的「寸」是手。手裡的鳥被人用力搶走，就是「搶奪」。', sentence: '兩隊在場上爭奪冠軍。' },
      { id: 'h-屈', combo: { type: '會意字', pict: '上面的「尸」像一個人彎著身子，下面是「出」。人彎下身子低頭，就是「屈」。' }, char: '屈', zhuyin: 'ㄑㄩ', radical: '尸', strokes: 8, words: ['委屈', '屈服'], say: '屈，屈服的屈', cloze: '＿服', img: 'bow-down.png', options: ['屈', '居', '屆', '掘'], clue: '這個字的上面是「尸」，裡面是「出」。', explain: '答案是「屈」，裡面是「出」；「居」的裡面是「古」，「屆」的裡面是「由」。', parts: ['尸', '出'], story: '上面像人彎著身子，下面是「出」。彎下腰、低下頭，不再反抗，就是「屈服」；受到不公平的對待心裡難過，叫「委屈」。', sentence: '他不肯向困難屈服。' },
      { id: 'h-偏', combo: { layout: 'lr', parts: [['亻', 'm', '人'], ['扁', 's', '']] }, char: '偏', zhuyin: 'ㄆㄧㄢ', radical: '人', strokes: 11, words: ['偏心', '偏食'], say: '偏，偏食的偏', cloze: '＿食', img: 'picky-eater.png', options: ['偏', '編', '遍', '篇'], clue: '這個字的左邊是單人旁。', explain: '答案是「偏」，左邊是單人旁；「編」的左邊是糸字旁，「篇」的上面是竹字頭。', parts: ['亻', '扁'], story: '左邊是人，右邊的「扁」念起來像「偏」。人站得歪歪的、不在中間，就是「偏」；只愛吃某些東西，叫「偏食」。', sentence: '弟弟很偏食，只愛吃肉不吃菜。', build: { layout: 'lr', show: ['？', '扁'], answer: '亻', options: ['亻', '糸', '辶', '竹'], clue: '想一想：站得歪歪的是誰？' } },
      { id: 'h-搬', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['般', 's', '']] }, char: '搬', zhuyin: 'ㄅㄢ', radical: '手', strokes: 13, words: ['搬運', '搬家'], say: '搬，搬家的搬', cloze: '＿家', img: 'moving-boxes.png', options: ['搬', '般', '盤', '班'], clue: '這個字的左邊是提手旁。', explain: '答案是「搬」，左邊是提手旁；「般」沒有提手旁，「盤」的下面是「皿」。', parts: ['扌', '般'], story: '左邊是手，右邊的「般」念起來像「搬」。用手把東西移到別的地方，就是「搬」；把家裡的東西全部換到新的房子，叫「搬家」。', sentence: '我們下個月要搬家了。', build: { layout: 'lr', show: ['？', '般'], answer: '扌', options: ['扌', '木', '口', '言'], clue: '想一想：移動箱子要用身體的哪個部分？' } },
      { id: 'h-芥', combo: { layout: 'tb', parts: [['艹', 'm', '草'], ['介', 's', '']] }, char: '芥', zhuyin: 'ㄐㄧㄝˋ', radical: '艸', strokes: 8, words: ['芥蒂', '芥菜'], say: '芥，芥菜的芥', cloze: '＿菜', img: 'mustard-green.png', options: ['芥', '介', '界', '疥'], clue: '這個字的上面是草字頭。', explain: '答案是「芥」，上面是草字頭；「介」沒有草字頭，「界」的上面是「田」。', parts: ['艹', '介'], story: '上面的草字頭是植物，下面的「介」念起來像「芥」。一種綠色、吃起來有點苦的青菜，就是「芥菜」。', sentence: '外婆用芥菜煮了一鍋雞湯。', build: { layout: 'tb', show: ['？', '介'], answer: '艹', options: ['艹', '田', '疒', '亻'], clue: '想一想：這是一種青菜，上面放哪一個？' } },
      { id: 'h-蒂', combo: { layout: 'tb', parts: [['艹', 'm', '草'], ['帝', 's', '']] }, char: '蒂', zhuyin: 'ㄉㄧˋ', radical: '艸', strokes: 13, words: ['芥蒂', '瓜蒂'], say: '蒂，瓜蒂的蒂', cloze: '瓜＿', img: 'melon-stem.png', options: ['蒂', '帝', '締', '啼'], clue: '這個字的上面是草字頭。', explain: '答案是「蒂」，上面是草字頭；「締」的左邊是糸字旁，「啼」的左邊是口字旁。', parts: ['艹', '帝'], story: '上面的草字頭是植物，下面的「帝」念起來像「蒂」。瓜果連在藤上的那一小段，就是「瓜蒂」；心裡卡著一點小小的不愉快，叫「芥蒂」。', sentence: '西瓜的瓜蒂還是綠的，表示很新鮮。', build: { layout: 'tb', show: ['？', '帝'], answer: '艹', options: ['艹', '糸', '口', '竹'], clue: '想一想：瓜果連在植物上的地方，上面放哪一個？' } },
      { id: 'h-抑', combo: { type: '形聲字', pict: '左邊是提手旁，右邊念起來有點像「抑」。用手往下壓，不讓它冒出來，就是「抑」。' }, char: '抑', zhuyin: 'ㄧˋ', radical: '手', strokes: 7, words: ['壓抑', '抑制'], say: '抑，抑制的抑', cloze: '＿制', img: 'hold-anger.png', options: ['抑', '仰', '迎', '昂'], clue: '這個字的左邊是提手旁。', explain: '答案是「抑」，左邊是提手旁；「仰」的左邊是單人旁，「迎」有辵字旁。', parts: ['扌', '卬'], story: '左邊是手，用手往下壓，不讓東西冒出來，就是「抑」；控制住不讓它發生，叫「抑制」。', sentence: '他努力抑制想哭的心情。' },
      { id: 'h-拒', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['巨', 's', '']] }, char: '拒', zhuyin: 'ㄐㄩˋ', radical: '手', strokes: 8, words: ['拒絕', '抗拒'], say: '拒，抗拒的拒', cloze: '抗＿', img: 'say-no.png', options: ['拒', '距', '巨', '炬'], clue: '這個字的左邊是提手旁。', explain: '答案是「拒」，左邊是提手旁；「距」的左邊是足字旁，「炬」的左邊是火字旁。', parts: ['扌', '巨'], story: '左邊是手，右邊的「巨」念起來像「拒」。伸出手擋住，說「不要」，就是「拒絕」。', sentence: '陌生人給的糖果要拒絕。', build: { layout: 'lr', show: ['？', '巨'], answer: '扌', options: ['扌', '足', '火', '木'], clue: '想一想：伸出來擋住的是身體的哪個部分？' } },
      { id: 'h-尷', combo: { type: '形聲字', pict: '左邊的「尢」像一個人跛著腳、站不穩，右邊的「監」念起來有點像「尷」。站也不是、走也不是，就是「尷」。' }, char: '尷', zhuyin: 'ㄍㄢ', radical: '尢', strokes: 17, words: ['尷尬', '好尷尬'], say: '尷，尷尬的尷', cloze: '＿尬', img: 'awkward.png', options: ['尷', '監', '艦', '濫'], clue: '這個字的左邊是「尢」。', explain: '答案是「尷」，左邊是「尢」；「艦」的左邊是舟字旁，「濫」的左邊是三點水。', parts: ['尢', '監'], story: '左邊的「尢」像一個人站不穩，右邊念起來像「尷」。站也不是、走也不是，不知道怎麼辦，就是「尷尬」。', sentence: '叫錯同學的名字，我覺得好尷尬。' },
      { id: 'h-尬', combo: { type: '形聲字', pict: '左邊的「尢」像一個人站不穩，右邊的「介」念起來有點像「尬」。和「尷」合在一起，就是不知道怎麼辦的「尷尬」。' }, char: '尬', zhuyin: 'ㄍㄚˋ', radical: '尢', strokes: 7, words: ['尷尬', '尷尬的場面'], say: '尬，尷尬的尬', cloze: '尷＿', img: 'awkward.png', options: ['尬', '介', '尤', '界'], clue: '這個字的左邊是「尢」，右邊是「介」。', explain: '答案是「尬」；「介」沒有「尢」，「尤」少了右邊。', parts: ['尢', '介'], story: '左邊的「尢」像一個人站不穩，右邊的「介」念起來有點像「尬」。「尷」和「尬」都有「尢」，合起來就是「尷尬」。', sentence: '走錯教室，真是尷尬極了。' },
      { id: 'h-悔', combo: { layout: 'lr', parts: [['忄', 'm', '心'], ['每', 's', '']] }, char: '悔', zhuyin: 'ㄏㄨㄟˇ', radical: '心', strokes: 10, words: ['後悔', '悔改'], say: '悔，悔改的悔', cloze: '＿改', img: 'regret.png', options: ['悔', '侮', '梅', '海'], clue: '這個字的左邊是豎心旁。', explain: '答案是「悔」，左邊是豎心旁；「侮」的左邊是單人旁，「梅」的左邊是木字旁。', parts: ['忄', '每'], story: '左邊是心，右邊的「每」念起來有點像「悔」。心裡覺得做錯了，很希望沒做過，就是「後悔」；知道錯了並且改正，叫「悔改」。', sentence: '他知道錯了，決定悔改。', build: { layout: 'lr', show: ['？', '每'], answer: '忄', options: ['忄', '亻', '木', '氵'], clue: '想一想：覺得做錯了，是哪裡的感覺？' } },
      { id: 'h-拱', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['共', 's', '']] }, char: '拱', zhuyin: 'ㄍㄨㄥˇ', radical: '手', strokes: 9, words: ['拱手讓人', '拱門'], say: '拱，拱門的拱', cloze: '＿門', img: 'arch-gate.png', options: ['拱', '洪', '供', '哄'], clue: '這個字的左邊是提手旁。', explain: '答案是「拱」，左邊是提手旁；「洪」的左邊是三點水，「供」的左邊是單人旁。', parts: ['扌', '共'], story: '左邊是手，右邊的「共」念起來像「拱」。兩手合在胸前，彎成一個圓弧，就是「拱手」；彎彎的、像彩虹一樣的門，叫「拱門」。', sentence: '花園入口有一座開滿玫瑰的拱門。', build: { layout: 'lr', show: ['？', '共'], answer: '扌', options: ['扌', '氵', '亻', '口'], clue: '想一想：兩手合在胸前，左邊放哪一個？' } },
      { id: 'h-距', combo: { layout: 'lr', parts: [['足', 'm', '腳'], ['巨', 's', '']] }, char: '距', zhuyin: 'ㄐㄩˋ', radical: '足', strokes: 12, words: ['距離', '差距'], say: '距，差距的距', cloze: '差＿', img: 'ruler-gap.png', options: ['距', '拒', '巨', '炬'], clue: '這個字的左邊是足字旁。', explain: '答案是「距」，左邊是足字旁；「拒」的左邊是提手旁，「炬」的左邊是火字旁。', parts: ['足', '巨'], story: '左邊是腳，右邊的「巨」念起來像「距」。用腳走一走，量兩個地方隔多遠，就是「距離」；兩邊相差多少，叫「差距」。', sentence: '我和第一名的分數只有一點點差距。', build: { layout: 'lr', show: ['？', '巨'], answer: '足', options: ['足', '扌', '火', '木'], clue: '想一想：用來走路、量遠近的是身體的哪個部分？' } },
      { id: 'h-默', combo: { layout: 'lr', parts: [['黑', 's', ''], ['犬', 'm', '狗']] }, char: '默', zhuyin: 'ㄇㄛˋ', radical: '黑', strokes: 16, words: ['默默', '沉默'], say: '默，沉默的默', cloze: '沉＿', img: 'silent-kid.png', options: ['默', '黑', '獸', '墨'], clue: '這個字的右邊是「犬」。', explain: '答案是「默」，右邊是「犬」；「墨」的下面是「土」，「獸」的左邊不是「黑」。', parts: ['黑', '犬'], story: '左邊的「黑」念起來有點像「默」，右邊是狗。狗在黑暗中安安靜靜的不叫，就是「默」；一句話都不說，叫「沉默」。', sentence: '大家問他問題，他卻一直沉默。', build: { layout: 'lr', show: ['黑', '？'], answer: '犬', options: ['犬', '土', '戈', '力'], clue: '想一想：在黑暗中安靜不叫的動物，右邊放哪一個？' } },
      { id: 'h-鬥', combo: { type: '象形字', pict: '「鬥」像兩個人面對面，伸出手打來打去。後來就是比輸贏、打架的意思。' }, char: '鬥', zhuyin: 'ㄉㄡˋ', radical: '鬥', strokes: 10, words: ['鬥志', '戰鬥'], say: '鬥，戰鬥的鬥', cloze: '戰＿', img: 'arm-wrestle.png', options: ['鬥', '門', '鬧', '開'], clue: '這個字像兩個人面對面伸手比力氣。', explain: '答案是「鬥」；「門」是大門的門，「鬧」的裡面是「市」。', parts: ['鬥'], story: '「鬥」像兩個人面對面比力氣。想要拚下去、不認輸的心，叫「鬥志」。', sentence: '球員們充滿鬥志，一路追分。' },
      { id: 'h-扭', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['丑', 's', '']] }, char: '扭', zhuyin: 'ㄋㄧㄡˇ', radical: '手', strokes: 7, words: ['扭曲', '扭傷'], say: '扭，扭傷的扭', cloze: '＿傷', img: 'twisted-ankle.png', options: ['扭', '紐', '鈕', '妞'], clue: '這個字的左邊是提手旁。', explain: '答案是「扭」，左邊是提手旁；「紐」的左邊是糸字旁，「鈕」的左邊是金字旁。', parts: ['扌', '丑'], story: '左邊是手，右邊的「丑」念起來有點像「扭」。用手把東西轉一轉，就是「扭」；腳轉到不對的方向受傷，叫「扭傷」。', sentence: '他跳下樓梯時，不小心扭傷了腳。', build: { layout: 'lr', show: ['？', '丑'], answer: '扌', options: ['扌', '糸', '金', '女'], clue: '想一想：把瓶蓋轉開要用身體的哪個部分？' } },
      { id: 'h-猛', combo: { layout: 'lr', parts: [['犭', 'm', '狗'], ['孟', 's', '']] }, char: '猛', zhuyin: 'ㄇㄥˇ', radical: '犬', strokes: 11, words: ['猛然', '兇猛'], say: '猛，兇猛的猛', cloze: '兇＿', img: 'tiger-roar.png', options: ['猛', '孟', '錳', '蜢'], clue: '這個字的左邊是犬字旁。', explain: '答案是「猛」，左邊是犬字旁；「孟」沒有犬字旁，「蜢」的左邊是虫字旁。', parts: ['犭', '孟'], story: '左邊的犬字旁和野獸有關，右邊的「孟」念起來像「猛」。野獸又兇又有力氣，就是「兇猛」；突然、一下子，叫「猛然」。', sentence: '森林裡的老虎非常兇猛。', build: { layout: 'lr', show: ['？', '孟'], answer: '犭', options: ['犭', '子', '金', '虫'], clue: '想一想：又兇又有力的野獸，左邊放哪一個？' } },
      { id: 'h-愣', combo: { type: '形聲字', pict: '左邊是豎心旁，右邊念起來有點像「愣」。心裡一下子呆住，反應不過來，就是「愣」。' }, char: '愣', zhuyin: 'ㄌㄥˋ', radical: '心', strokes: 12, words: ['發愣', '愣住'], say: '愣，愣住的愣', cloze: '＿住', img: 'stunned.png', options: ['愣', '楞', '榜', '傍'], clue: '這個字的左邊是豎心旁。', explain: '答案是「愣」，左邊是豎心旁；「楞」的左邊是木字旁，「傍」的左邊是單人旁。', parts: ['忄', '四', '方'], story: '左邊是心，右邊念起來有點像「愣」。心裡呆住了，一下子不知道怎麼辦，就是「愣住」。', sentence: '聽到這個好消息，他愣住了好幾秒。' }
    ],
    vocab: [
      { id: 'v-壓軸', cloze: true, clozeOptions: ['壓軸', '開場', '暖身', '休息'], word: '壓軸', meaning: '排在最後、最精采的節目。', example: '晚會的＿＿是老師們一起跳舞。', img: 'stage-finale.png', options: ['壓軸', '鬥志', '芥蒂', '距離'] },
      { id: 'v-爭奪', cloze: true, clozeOptions: ['爭奪', '分享', '送給', '讓出'], word: '爭奪', meaning: '互相搶，誰也不讓誰。', example: '兩隊為了＿＿冠軍，拚盡全力。', img: 'grab-ball.png', options: ['爭奪', '拒絕', '搬運', '後悔'] },
      { id: 'v-委屈', cloze: true, clozeOptions: ['委屈', '得意', '興奮', '驕傲'], word: '委屈', meaning: '被冤枉、受到不公平的對待，心裡很難過。', example: '被誤會偷拿東西，他覺得很＿＿。', img: 'upset-kid.png', options: ['委屈', '尷尬', '偏心', '默默'] },
      { id: 'v-偏心', cloze: true, clozeOptions: ['偏心', '公平', '公正', '平均'], word: '偏心', meaning: '只對某一方好，不公平。', example: '媽媽把大塊的蛋糕給妹妹，哥哥說媽媽＿＿。', img: 'cake-unfair.png', options: ['偏心', '委屈', '尷尬', '扭曲'] },
      { id: 'v-搬運', cloze: true, clozeOptions: ['搬運', '睡覺', '唱歌', '畫畫'], word: '搬運', meaning: '把東西從一個地方移到另一個地方。', example: '工人正在＿＿一箱箱的貨物。', img: 'moving-boxes.png', options: ['搬運', '爭奪', '拒絕', '壓抑'] },
      { id: 'v-芥蒂', cloze: true, clozeOptions: ['芥蒂', '禮物', '笑話', '點心'], word: '芥蒂', meaning: '心裡有一點不愉快，放不下。', example: '吵架以後，他們心裡還有一點＿＿。', img: 'two-kids-apart.png', options: ['芥蒂', '壓軸', '距離', '鬥志'] },
      { id: 'v-壓抑', cloze: true, clozeOptions: ['壓抑', '大笑', '說出', '放開'], word: '壓抑', meaning: '把心情悶在心裡，不讓它跑出來。', example: '他一直＿＿著難過，終於忍不住哭了。', img: 'hold-anger.png', options: ['壓抑', '拒絕', '後悔', '搬運'] },
      { id: 'v-拒絕', cloze: true, clozeOptions: ['拒絕', '答應', '同意', '接受'], word: '拒絕', meaning: '不答應、不接受。', example: '他＿＿了陌生人給的糖果。', img: 'say-no.png', options: ['拒絕', '壓抑', '爭奪', '扭曲'] },
      { id: 'v-尷尬', cloze: true, clozeOptions: ['尷尬', '輕鬆', '開心', '自在'], word: '尷尬', meaning: '不好意思、不知道怎麼辦才好。', example: '我在臺上忘記臺詞，覺得好＿＿。', img: 'awkward.png', options: ['尷尬', '委屈', '偏心', '猛然'] },
      { id: 'v-後悔', cloze: true, clozeOptions: ['後悔', '高興', '得意', '慶幸'], word: '後悔', meaning: '事情做完，才發現做錯了，很希望能重來。', example: '他對朋友說了重話，事後很＿＿。', img: 'regret.png', options: ['後悔', '尷尬', '委屈', '默默'] },
      { id: 'v-拱手讓人', cloze: true, clozeOptions: ['拱手讓人', '緊抓不放', '寸步不讓', '全力爭取'], word: '拱手讓人', meaning: '輕輕鬆鬆就把快得到的東西送給對方。', example: '因為一時大意，他把第一名＿＿＿＿。', img: 'give-trophy.png', options: ['拱手讓人', '勢均力敵', '無理取鬧', '鬥志'] },
      { id: 'v-距離', cloze: true, clozeOptions: ['距離', '顏色', '味道', '聲音'], word: '距離', meaning: '兩個地方或兩個時間中間隔多遠。', example: '我家和學校的＿＿不遠，走路十分鐘就到。', img: 'ruler-gap.png', options: ['距離', '壓軸', '芥蒂', '鬥志'] },
      { id: 'v-默默', cloze: true, clozeOptions: ['默默', '大聲', '吵鬧', '尖叫'], word: '默默', meaning: '安安靜靜，不說話。', example: '清潔阿姨每天＿＿的打掃校園。', img: 'silent-kid.png', options: ['默默', '猛然', '尷尬', '偏心'] },
      { id: 'v-鬥志', cloze: true, clozeOptions: ['鬥志', '睡意', '餓意', '冷意'], word: '鬥志', meaning: '想要拚下去、不認輸的心。', example: '聽到大家的加油聲，球員們＿＿高昂。', img: 'arm-wrestle.png', options: ['鬥志', '芥蒂', '距離', '壓軸'] },
      { id: 'v-扭曲', cloze: true, clozeOptions: ['扭曲', '平直', '整齊', '筆直'], word: '扭曲', meaning: '轉來轉去，變得歪歪的。', example: '大火把鐵窗燒得＿＿變形。', img: 'bent-metal.png', options: ['扭曲', '壓抑', '拒絕', '搬運'] },
      { id: 'v-猛然', cloze: true, clozeOptions: ['猛然', '慢慢', '輕輕', '悠悠'], word: '猛然', meaning: '一下子、冷不防的。', example: '走到半路，我＿＿想起忘了帶便當。', img: 'sudden-idea.png', options: ['猛然', '默默', '尷尬', '委屈'] },
      { id: 'v-發愣', cloze: true, clozeOptions: ['發愣', '跳舞', '奔跑', '唱歌'], word: '發愣', meaning: '呆住了，一下子反應不過來。', example: '老師突然叫他，他坐在位子上＿＿。', img: 'stunned.png', options: ['發愣', '後悔', '壓抑', '拒絕'] },
      { id: 'v-勢均力敵', cloze: true, clozeOptions: ['勢均力敵', '一面倒', '差得很遠', '相差懸殊'], word: '勢均力敵', meaning: '雙方一樣強，分不出高低。', example: '兩隊＿＿＿＿，比賽打到最後一秒才分勝負。', img: 'tug-even.png', options: ['勢均力敵', '拱手讓人', '無理取鬧', '默默'] },
      { id: 'v-無理取鬧', cloze: true, clozeOptions: ['無理取鬧', '講道理', '有禮貌', '心平氣和'], word: '無理取鬧', meaning: '明明沒有原因，還故意吵吵嚷嚷。', example: '弟弟要不到玩具就＿＿＿＿，大哭大叫。', img: 'tantrum.png', options: ['無理取鬧', '勢均力敵', '拱手讓人', '委屈'] }
    ],
    charwords: [
      { id: 'cw-軸', char: '軸', img: 'wheel-axle.png', charMeaning: '讓輪子轉動的桿子；最後的重要節目。', word: '車軸', meaning: '穿過車輪中間、讓輪子轉動的桿子。', example: '腳踏車的＿＿鬆了，騎起來會晃。', options: ['車軸', '搶奪', '屈服', '偏食'] },
      { id: 'cw-奪', char: '奪', img: 'grab-ball.png', charMeaning: '搶。', word: '搶奪', meaning: '用力把別人的東西搶過來。', example: '小狗＿＿我手上的飛盤。', options: ['搶奪', '搬家', '芥菜', '瓜蒂'] },
      { id: 'cw-屈', char: '屈', img: 'bow-down.png', charMeaning: '彎下來；低頭。', word: '屈服', meaning: '不再反抗，低頭聽從。', example: '就算遇到困難，他也不＿＿。', options: ['屈服', '抑制', '抗拒', '尷尬'] },
      { id: 'cw-偏', char: '偏', img: 'picky-eater.png', charMeaning: '不正、只靠向一邊。', word: '偏食', meaning: '只愛吃某些食物。', example: '＿＿的人容易營養不夠。', options: ['偏食', '尷尬', '悔改', '拱門'] },
      { id: 'cw-搬', char: '搬', img: 'moving-boxes.png', charMeaning: '移動東西。', word: '搬家', meaning: '把家換到新的房子。', example: '我們家＿＿到海邊的小鎮。', options: ['搬家', '差距', '沉默', '戰鬥'] },
      { id: 'cw-芥', char: '芥', img: 'mustard-green.png', charMeaning: '一種青菜；很小的東西。', word: '芥菜', meaning: '綠綠的、吃起來有點苦的青菜。', example: '過年時，外婆會煮＿＿長年菜。', options: ['芥菜', '扭傷', '兇猛', '愣住'] },
      { id: 'cw-蒂', char: '蒂', img: 'melon-stem.png', charMeaning: '瓜果連著枝莖的地方。', word: '瓜蒂', meaning: '瓜果連在藤上的那一小段。', example: '挑西瓜時，可以看看＿＿新不新鮮。', options: ['瓜蒂', '車軸', '搶奪', '屈服'] },
      { id: 'cw-抑', char: '抑', img: 'hold-anger.png', charMeaning: '往下壓、控制。', word: '抑制', meaning: '控制住，不讓它發生或變大。', example: '多喝水可以＿＿口渴的感覺。', options: ['抑制', '偏食', '搬家', '芥菜'] },
      { id: 'cw-拒', char: '拒', img: 'say-no.png', charMeaning: '不接受。', word: '抗拒', meaning: '不願意，想要推開。', example: '小狗＿＿洗澡，一直往外跑。', options: ['抗拒', '瓜蒂', '抑制', '尷尬'] },
      { id: 'cw-尷', char: '尷', img: 'awkward.png', charMeaning: '不知道怎麼辦。', word: '尷尬', meaning: '不好意思、不知道怎麼辦。', example: '叫錯名字，場面好＿＿。', options: ['尷尬', '悔改', '拱門', '差距'] },
      { id: 'cw-尬', char: '尬', img: 'awkward.png', charMeaning: '不知道怎麼辦。', word: '尷尬的場面', meaning: '大家都不知道說什麼、很不自在的情形。', example: '他說錯話，出現了＿＿＿＿＿。', options: ['尷尬的場面', '沉默', '戰鬥', '扭傷'] },
      { id: 'cw-悔', char: '悔', img: 'regret.png', charMeaning: '覺得做錯了。', word: '悔改', meaning: '知道錯了，並且改正。', example: '他真心＿＿，再也不說謊了。', options: ['悔改', '兇猛', '愣住', '車軸'] },
      { id: 'cw-拱', char: '拱', img: 'arch-gate.png', charMeaning: '彎成圓弧；兩手合在胸前。', word: '拱門', meaning: '上面彎彎的、像彩虹一樣的門。', example: '婚禮會場有一座花＿＿。', options: ['拱門', '搶奪', '屈服', '偏食'] },
      { id: 'cw-距', char: '距', img: 'ruler-gap.png', charMeaning: '中間隔多遠。', word: '差距', meaning: '兩邊相差多少。', example: '這兩隊的實力＿＿很大。', options: ['差距', '搬家', '芥菜', '瓜蒂'] },
      { id: 'cw-默', char: '默', img: 'silent-kid.png', charMeaning: '不說話。', word: '沉默', meaning: '一句話都不說。', example: '被問到答案時，全班一片＿＿。', options: ['沉默', '抑制', '抗拒', '尷尬'] },
      { id: 'cw-鬥', char: '鬥', img: 'arm-wrestle.png', charMeaning: '比輸贏、打架。', word: '戰鬥', meaning: '雙方互相打、拚輸贏。', example: '卡通裡的英雄和怪獸展開一場＿＿。', options: ['戰鬥', '悔改', '拱門', '差距'] },
      { id: 'cw-扭', char: '扭', img: 'twisted-ankle.png', charMeaning: '轉動。', word: '扭傷', meaning: '身體轉到不對的方向而受傷。', example: '打球時，他不小心＿＿了手腕。', options: ['扭傷', '沉默', '戰鬥', '兇猛'] },
      { id: 'cw-猛', char: '猛', img: 'tiger-roar.png', charMeaning: '很兇、很有力；突然。', word: '兇猛', meaning: '又兇又有力氣。', example: '鱷魚是很＿＿的動物。', options: ['兇猛', '愣住', '車軸', '搶奪'] },
      { id: 'cw-愣', char: '愣', img: 'stunned.png', charMeaning: '呆住。', word: '愣住', meaning: '一下子呆住，反應不過來。', example: '看到滿桌的禮物，他＿＿了。', options: ['愣住', '屈服', '偏食', '扭傷'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-巧奪天工', situationImg: 'id-fine-carving.png',
        anim: { bg: 'room', a: { wood: ['🪵', 40, 60, 14], knife: ['🔪', 60, 50, 8], bird: ['🕊️', 40, 54, 14, 'h'], star: ['✨', 40, 34, 9, 'h'], wow: ['😲', 80, 60, 11, 'h'] },
          s: [['木匠拿著一塊普通的木頭，', [['bob', 'wood']]],
            ['一刀一刀，慢慢的雕刻，', [['wig', 'knife'], ['shake', 'wood']]],
            ['竟然刻出一隻好像會飛的鳥！', [['out', 'wood'], ['in', 'bird'], ['in', 'star']]],
            ['做得比天然的還精巧，就是巧奪天工。', [['in', 'wow'], ['pop', 'star']]]] },
        idiom: '巧奪天工', char: '奪', meaning: '人做出來的東西非常精巧，比天然的還要美。', example: '這座木雕巧奪天工，連羽毛都刻得清清楚楚。', situation: '木匠用一塊普通的木頭，刻出一隻好像會飛的鳥。',
        fill: { options: ['這件玉雕作品＿＿＿＿，大家都看呆了。', '他隨便捏了一團泥巴，真是＿＿＿＿。'], clue: '提示：哪一句說的作品真的非常精巧？', explain: '第一句用得對：玉雕非常精巧。隨便捏的泥巴，不能說巧奪天工。' } },
      { id: 'i-屈指可數', situationImg: 'id-few-fingers.png',
        anim: { bg: 'school', a: { hand: ['✋', 50, 56, 16], f1: ['1️⃣', 30, 26, 8, 'h'], f2: ['2️⃣', 50, 26, 8, 'h'], f3: ['3️⃣', 70, 26, 8, 'h'], kid: ['🧒', 20, 66, 10] },
          s: [['全校會說三種語言的同學有幾個？', [['bob', 'kid']]],
            ['用手指算一算：一個，', [['in', 'f1'], ['wig', 'hand']]],
            ['兩個，三個……就沒有了。', [['in', 'f2'], ['in', 'f3']]],
            ['少到用手指就數得完，就是屈指可數。', [['pop', 'hand']]]] },
        idiom: '屈指可數', char: '屈', meaning: '彎著手指就能數完；形容數量很少。', example: '能跑完全程馬拉松的小學生屈指可數。', situation: '全校會說三種語言的同學，用手指一算只有三個。',
        fill: { options: ['冬天來海邊玩的人＿＿＿＿。', '夜市裡人山人海，人多得＿＿＿＿。'], clue: '提示：哪一句說的是數量很少？', explain: '第一句用得對：冬天海邊人很少。人山人海是很多人，剛好相反。' } },
      { id: 'i-以偏概全', situationImg: 'id-one-apple.png',
        anim: { bg: 'park', a: { box: ['🧺', 50, 64, 18], bad: ['🍎', 40, 50, 9], g1: ['🍎', 56, 54, 9, 'h'], g2: ['🍎', 66, 50, 9, 'h'], kid: ['🧒', 16, 62, 11], x: ['❌', 40, 36, 8, 'h'] },
          s: [['一籃蘋果裡，小明拿到一顆壞掉的。', [['shake', 'bad'], ['in', 'x']]],
            ['他就說：「這籃蘋果全都是壞的！」', [['shake', 'kid']]],
            ['可是其他蘋果都又紅又甜呀！', [['in', 'g1'], ['in', 'g2'], ['pop', 'g1']]],
            ['只看一小部分就說全部，就是以偏概全。', [['wig', 'box']]]] },
        idiom: '以偏概全', char: '偏', meaning: '只看到一小部分，就說全部都是這樣。', example: '只因為一次考不好，就說他不認真，是以偏概全。', situation: '小明拿到一顆壞蘋果，就說整籃都是壞的。',
        fill: { options: ['只遇到一個兇的店員，就說整條街的人都很兇，這是＿＿＿＿。', '他仔細問了很多人，才下結論，一點也不＿＿＿＿。'], clue: '提示：哪一句是只看一小部分就說全部？', explain: '兩句意思相反。第一句用得對：只遇到一個人，就說全部。仔細問了很多人，就不是以偏概全。' } },
      { id: 'i-瓜熟蒂落', situationImg: 'id-ripe-melon.png',
        anim: { bg: 'park', a: { vine: ['🌿', 50, 30, 18], melon: ['🍈', 50, 46, 12], sun: ['☀️', 84, 16, 10], ok: ['✅', 50, 70, 9, 'h'] },
          s: [['藤上掛著一顆青青的瓜。', [['bob', 'melon']]],
            ['太陽每天照，瓜慢慢長大、變熟了。', [['wig', 'sun'], ['grow', 'melon', 1.3]]],
            ['時間一到，瓜自己就掉了下來。', [['mv', 'melon', [50, 66, 800]]]],
            ['時機成熟，事情自然成功，就是瓜熟蒂落。', [['in', 'ok']]]] },
        idiom: '瓜熟蒂落', char: '蒂', meaning: '瓜熟了自然會掉下來；比喻時機成熟，事情自然就成功。', example: '大家準備了好久，到了比賽那天瓜熟蒂落，順利拿下冠軍。', situation: '藤上的瓜慢慢長大變熟，時間一到自己就掉下來。',
        fill: { options: ['他練琴練了好幾年，到了表演那天＿＿＿＿，彈得好極了。', '他什麼都沒準備，就想＿＿＿＿。'], clue: '提示：哪一句是準備好了、時機成熟？', explain: '第一句用得對：練了好幾年，時候到了自然成功。什麼都沒準備，時機還沒成熟。' } },
      { id: 'i-潛移默化', situationImg: 'id-read-together.png',
        anim: { bg: 'room', a: { mom: ['👩', 30, 58, 14], kid: ['🧒', 66, 64, 11], b1: ['📖', 40, 50, 8], b2: ['📖', 72, 56, 7, 'h'], cal: ['📅', 84, 22, 10], heart: ['💗', 50, 30, 8, 'h'] },
          s: [['媽媽每天晚上都安靜的看書。', [['bob', 'b1']]],
            ['一天、一個月、一年過去了……', [['wig', 'cal']]],
            ['不知不覺，弟弟也愛上了看書。', [['in', 'b2'], ['bob', 'b2']]],
            ['在不知不覺中慢慢改變，就是潛移默化。', [['in', 'heart']]]] },
        idiom: '潛移默化', char: '默', meaning: '在不知不覺中，慢慢受到影響而改變。', example: '爸媽有禮貌，孩子在潛移默化中也變得有禮貌。', situation: '媽媽每天看書，弟弟不知不覺也愛上了看書。',
        fill: { options: ['常常聽音樂，他在＿＿＿＿中愛上了唱歌。', '老師一說完，他馬上就改變了，這是＿＿＿＿。'], clue: '提示：哪一句是不知不覺慢慢改變？', explain: '第一句用得對：常常聽，慢慢愛上唱歌。馬上就改變，不是慢慢的潛移默化。' } },
      { id: 'i-勾心鬥角', situationImg: 'id-sneaky-team.png',
        anim: { bg: 'school', a: { a: ['🧒', 26, 62, 12], b: ['👦', 74, 62, 12], t1: ['💭', 26, 40, 10, 'h'], t2: ['💭', 74, 40, 10, 'h'], ang: ['😠', 50, 30, 9, 'h'] },
          s: [['兩個同學在同一組做報告。', [['bob', 'a'], ['bob', 'b']]],
            ['一個偷偷想：我要讓他出糗。', [['in', 't1'], ['shake', 't1']]],
            ['另一個也偷偷想：我要搶走功勞。', [['in', 't2'], ['shake', 't2']]],
            ['互相用心機、暗中較勁，就是勾心鬥角。', [['in', 'ang']]]] },
        idiom: '勾心鬥角', char: '鬥', meaning: '互相用心機、暗中比來比去，不真心合作。', example: '同一組的人要真心合作，不要勾心鬥角。', situation: '同一組的兩個同學，各自偷偷想著要讓對方出糗、搶走功勞。',
        fill: { options: ['他們表面上是朋友，其實一直＿＿＿＿。', '大家真心合作、互相幫忙，從不＿＿＿＿。'], clue: '提示：哪一句是互相用心機？', explain: '兩句意思相反。第一句用得對：表面是朋友，其實暗中較勁。真心合作，就不是勾心鬥角。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-軸', char: '軸', wrong: '抽', sentence: '腳踏車的車軸需要上油了。', options: ['軸', '抽', '袖'], clue: '這裡說的是讓輪子轉動的桿子，想一想，哪一個字有車字旁？', explain: '要改成「軸」。讓輪子轉動的是「車軸」；「抽」是抽屜的抽。' },
      { id: 'fx-奪', char: '奪', wrong: '奮', sentence: '兩隊正在爭奪最後一張決賽門票。', options: ['奪', '奮', '套'], clue: '這裡是說互相搶，想一想，哪一個字的下面是「寸」？', explain: '要改成「奪」。互相搶是「爭奪」；「奮」是奮鬥的奮。' },
      { id: 'fx-屈', char: '屈', wrong: '居', sentence: '被誤會的妹妹委屈得哭了。', options: ['屈', '居', '屆'], clue: '這裡是說受到不公平對待，心裡難過，想一想，哪一個字的裡面是「出」？', explain: '要改成「屈」。受到不公平對待是「委屈」；「居」是居住的居。' },
      { id: 'fx-偏', char: '偏', wrong: '篇', sentence: '老師對每個學生都一樣，從不偏心。', options: ['偏', '篇', '編'], clue: '這裡是說只對某一方好，想一想，哪一個字有單人旁？', explain: '要改成「偏」。只對某一方好是「偏心」；「篇」是一篇文章的篇。' },
      { id: 'fx-搬', char: '搬', wrong: '般', sentence: '大家一起幫忙搬桌子。', options: ['搬', '般', '盤'], clue: '這裡是說把東西移走，想一想，哪一個字有提手旁？', explain: '要改成「搬」。移動東西是「搬」；「般」是一般的般。' },
      { id: 'fx-芥', char: '芥', wrong: '介', sentence: '奶奶的長年菜是用芥菜做的。', options: ['芥', '介', '界'], clue: '這裡說的是一種青菜，想一想，哪一個字有草字頭？', explain: '要改成「芥」。那種青菜是「芥菜」；「介」是介紹的介。' },
      { id: 'fx-蒂', char: '蒂', wrong: '帝', sentence: '吵架以後，他心裡還留著一點芥蒂。', options: ['蒂', '帝', '啼'], clue: '這裡是說心裡放不下的不愉快，想一想，哪一個字有草字頭？', explain: '要改成「蒂」。放不下的不愉快是「芥蒂」；「帝」是皇帝的帝。' },
      { id: 'fx-抑', char: '抑', wrong: '仰', sentence: '他努力壓抑心中的怒氣。', options: ['抑', '仰', '迎'], clue: '這裡是說把心情悶住，想一想，哪一個字有提手旁？', explain: '要改成「抑」。把心情悶住是「壓抑」；「仰」是仰頭的仰。' },
      { id: 'fx-拒', char: '拒', wrong: '距', sentence: '他客氣的拒絕了邀請。', options: ['拒', '距', '巨'], clue: '這裡是說不答應，想一想，哪一個字有提手旁？', explain: '要改成「拒」。不答應是「拒絕」；「距」是距離的距。' },
      { id: 'fx-尷', char: '尷', wrong: '監', sentence: '同學叫錯老師的名字，場面好尷尬。', options: ['尷', '監', '艦'], clue: '這裡是說不好意思、不知道怎麼辦，想一想，哪一個字的左邊是「尢」？', explain: '要改成「尷」。不知道怎麼辦是「尷尬」；「監」是監督的監。' },
      { id: 'fx-悔', char: '悔', wrong: '侮', sentence: '他很後悔沒有好好準備考試。', options: ['悔', '侮', '梅'], clue: '這裡是說覺得做錯了，想一想，哪一個字有豎心旁？', explain: '要改成「悔」。覺得做錯了是「後悔」；「侮」是侮辱的侮。' },
      { id: 'fx-拱', char: '拱', wrong: '洪', sentence: '他一不小心，把冠軍拱手讓人。', options: ['拱', '洪', '供'], clue: '這裡是說輕易把東西讓出去，想一想，哪一個字有提手旁？', explain: '要改成「拱」。輕易讓出去是「拱手讓人」；「洪」是洪水的洪。' },
      { id: 'fx-距', char: '距', wrong: '拒', sentence: '我家到公園的距離很近。', options: ['距', '拒', '炬'], clue: '這裡是說兩個地方隔多遠，想一想，哪一個字有足字旁？', explain: '要改成「距」。隔多遠是「距離」；「拒」是拒絕的拒。' },
      { id: 'fx-默', char: '默', wrong: '墨', sentence: '他沉默了好久，才開口說話。', options: ['默', '墨', '黑'], clue: '這裡是說一句話都不說，想一想，哪一個字的右邊是「犬」？', explain: '要改成「默」。一句話都不說是「沉默」；「墨」是墨水的墨。' },
      { id: 'fx-鬥', char: '鬥', wrong: '門', sentence: '加油聲讓隊員們鬥志高昂。', options: ['鬥', '門', '鬧'], clue: '這裡是說不認輸的心，想一想，哪一個字像兩個人面對面比力氣？', explain: '要改成「鬥」。不認輸的心是「鬥志」；「門」是大門的門。' },
      { id: 'fx-扭', char: '扭', wrong: '鈕', sentence: '他打球時扭傷了腳踝。', options: ['扭', '鈕', '紐'], clue: '這裡是說身體轉錯方向受傷，想一想，哪一個字有提手旁？', explain: '要改成「扭」。轉錯方向受傷是「扭傷」；「鈕」是鈕扣的鈕。' },
      { id: 'fx-猛', char: '猛', wrong: '蜢', sentence: '他猛然想起今天是媽媽的生日。', options: ['猛', '蜢', '孟'], clue: '這裡是說突然，想一想，哪一個字有犬字旁？', explain: '要改成「猛」。突然是「猛然」；「蜢」是蚱蜢的蜢。' },
      { id: 'fx-愣', char: '愣', wrong: '楞', sentence: '聽到這個消息，他愣在原地。', options: ['愣', '楞', '傍'], clue: '這裡是說呆住了，想一想，哪一個字有豎心旁？', explain: '要改成「愣」。呆住了是「愣」；「楞」的左邊是木字旁。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿屜」是桌子下面可以拉出來放東西的盒子。', sentence: '我把鉛筆收進＿屜裡。', frame: '＿屜', options: ['抽', '軸'], answer: '抽', clue: '提示：要用手拉，左邊是提手旁。', explain: '答案是「抽」；「軸」是車軸的軸，有車字旁。' },
      { id: 's2', meaning: '「興＿」是非常高興、很激動。', sentence: '要去遊樂園了，弟弟好興＿。', frame: '興＿', options: ['奮', '奪'], answer: '奮', clue: '提示：這個字的下面是「田」。', explain: '答案是「奮」；「奪」是爭奪的奪，下面是「寸」。' },
      { id: 's3', meaning: '「＿住」是住在某個地方。', sentence: '爺爺＿住在山腳下。', frame: '＿住', options: ['居', '屈'], answer: '居', clue: '提示：這個字的裡面是「古」。', explain: '答案是「居」；「屈」是委屈的屈。' },
      { id: 's4', meaning: '「一＿文章」是一整份寫好的文字作品。', sentence: '我寫了一＿作文。', frame: '一＿', options: ['篇', '偏'], answer: '篇', clue: '提示：以前寫在竹片上，上面是竹字頭。', explain: '答案是「篇」；「偏」是偏心的偏。' },
      { id: 's5', meaning: '「一＿」是普通、平常。', sentence: '這只是一＿的石頭。', frame: '一＿', options: ['般', '搬'], answer: '般', clue: '提示：這個字沒有提手旁。', explain: '答案是「般」；「搬」是搬家的搬。' },
      { id: 's6', meaning: '「＿紹」是把人或事物說給別人知道。', sentence: '新同學上臺自我＿紹。', frame: '＿紹', options: ['介', '芥'], answer: '介', clue: '提示：這個字沒有草字頭。', explain: '答案是「介」；「芥」是芥菜的芥。' },
      { id: 's7', meaning: '「皇＿」是古代國家最大的領導者。', sentence: '故事裡的皇＿住在華麗的宮殿。', frame: '皇＿', options: ['帝', '蒂'], answer: '帝', clue: '提示：這個字沒有草字頭。', explain: '答案是「帝」；「蒂」是瓜蒂的蒂。' },
      { id: 's8', meaning: '「＿大」是非常非常大。', sentence: '海裡有一隻＿大的鯨魚。', frame: '＿大', options: ['巨', '拒'], answer: '巨', clue: '提示：這個字沒有偏旁。', explain: '答案是「巨」；「拒」是拒絕的拒，有提手旁。' },
      { id: 's9', meaning: '「＿花」是冬天開的、香香的花。', sentence: '冬天的山上開滿了＿花。', frame: '＿花', options: ['梅', '悔'], answer: '梅', clue: '提示：這是一種植物，左邊是木字旁。', explain: '答案是「梅」；「悔」是後悔的悔，有豎心旁。' },
      { id: 's10', meaning: '「＿水」是大量的水淹過來。', sentence: '大雨讓河水氾濫，引發＿水。', frame: '＿水', options: ['洪', '拱'], answer: '洪', clue: '提示：和水有關，左邊是三點水。', explain: '答案是「洪」；「拱」是拱門的拱，有提手旁。' },
      { id: 's11', meaning: '「＿水」是寫毛筆字用的黑色汁液。', sentence: '寫書法前，要先磨好＿水。', frame: '＿水', options: ['墨', '默'], answer: '墨', clue: '提示：這個字的下面是「土」。', explain: '答案是「墨」；「默」是沉默的默，右邊是「犬」。' },
      { id: 's12', meaning: '「＿扣」是衣服上用來扣住的小圓片。', sentence: '襯衫的＿扣掉了一顆。', frame: '＿扣', options: ['鈕', '扭'], answer: '鈕', clue: '提示：以前常用金屬做，左邊是金字旁。', explain: '答案是「鈕」；「扭」是扭傷的扭，有提手旁。' }
    ],
    listen: [
      { id: 'l1', text: '晚會最後、最精采的節目。', answer: 0, options: [{ text: '壓軸', img: 'stage-finale.png' }, { text: '鬥志', img: 'arm-wrestle.png' }, { text: '芥蒂', img: 'two-kids-apart.png' }, { text: '距離', img: 'ruler-gap.png' }] },
      { id: 'l2', text: '被冤枉偷拿東西，心裡好難過。', answer: 0, options: [{ text: '委屈', img: 'upset-kid.png' }, { text: '尷尬', img: 'awkward.png' }, { text: '後悔', img: 'regret.png' }, { text: '發愣', img: 'stunned.png' }] },
      { id: 'l3', text: '媽媽總是把大塊的給妹妹，不公平。', answer: 0, options: [{ text: '偏心', img: 'cake-unfair.png' }, { text: '委屈', img: 'upset-kid.png' }, { text: '拒絕', img: 'say-no.png' }, { text: '默默', img: 'silent-kid.png' }] },
      { id: 'l4', text: '在臺上忘記臺詞，不知道怎麼辦才好。', answer: 0, options: [{ text: '尷尬', img: 'awkward.png' }, { text: '偏心', img: 'cake-unfair.png' }, { text: '壓抑', img: 'hold-anger.png' }, { text: '猛然', img: 'sudden-idea.png' }] },
      { id: 'l5', text: '兩隊一樣強，比到最後一秒才分出勝負。', answer: 0, options: [{ text: '勢均力敵', img: 'tug-even.png' }, { text: '拱手讓人', img: 'give-trophy.png' }, { text: '無理取鬧', img: 'tantrum.png' }, { text: '鬥志', img: 'arm-wrestle.png' }] },
      { id: 'l6', text: '要不到玩具，就躺在地上大哭大鬧。', answer: 0, options: [{ text: '無理取鬧', img: 'tantrum.png' }, { text: '勢均力敵', img: 'tug-even.png' }, { text: '委屈', img: 'upset-kid.png' }, { text: '發愣', img: 'stunned.png' }] },
      { id: 'l7', text: '走到半路，突然想起忘了帶便當。', answer: 0, options: [{ text: '猛然', img: 'sudden-idea.png' }, { text: '默默', img: 'silent-kid.png' }, { text: '尷尬', img: 'awkward.png' }, { text: '後悔', img: 'regret.png' }] },
      { id: 'l8', text: '清潔阿姨安安靜靜的打掃校園。', answer: 0, options: [{ text: '默默', img: 'silent-kid.png' }, { text: '猛然', img: 'sudden-idea.png' }, { text: '鬥志', img: 'arm-wrestle.png' }, { text: '偏心', img: 'cake-unfair.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '像什麼般', answer: '怎麼樣', noun: '什麼人或東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看像什麼、是什麼樣的人或東西。',
      /* 短語：像＋名詞＋般＋形容詞＋的＋名詞（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '像火箭般快速的選手', img: 'pr-rocket-runner.png',
        parts: [{ text: '像火箭般', role: '像什麼般' }, { text: '快速', role: '怎麼樣' }, { text: '的' }, { text: '選手', role: '什麼人或東西' }],
        explain: '先用「像……般」找一樣東西來比，再說出樣子，加上「的」，最後說是什麼人或東西。' },
      pick: [
        { id: 'ph1', img: 'pr-brave-captain.png', before: '像獅子般', noun: '隊長', ask: '像獅子般什麼樣的隊長', look: '再看看圖片，隊長面對強敵怕不怕？', options: ['勇猛', '膽小', '懶惰', '柔軟'], clue: '提示：一點都不退縮，帶頭往前衝。', explain: '答案是「勇猛」，完整的短語是「像獅子般勇猛的隊長」。' },
        { id: 'ph2', img: 'pr-quiet-kid.png', before: '像小貓般', noun: '妹妹', ask: '像小貓般什麼樣的妹妹', look: '再看看圖片，妹妹說話的樣子怎麼樣？', options: ['溫柔', '兇惡', '吵鬧', '粗魯'], clue: '提示：說話輕輕的，動作慢慢的。', explain: '答案是「溫柔」，完整的短語是「像小貓般溫柔的妹妹」。' },
        { id: 'ph3', img: 'pr-steady-rock.png', before: '像大山般', noun: '爸爸', ask: '像大山般什麼樣的爸爸', look: '再看看圖片，遇到困難時爸爸怎麼樣？', options: ['可靠', '慌張', '膽小', '吵鬧'], clue: '提示：有他在，大家都覺得很安心。', explain: '答案是「可靠」，完整的短語是「像大山般可靠的爸爸」。' },
        { id: 'ph4', img: 'pr-shiny-trophy.png', before: '像太陽般', noun: '獎盃', ask: '像太陽般什麼樣的獎盃', look: '再看看圖片，獎盃亮不亮？', options: ['耀眼', '黯淡', '粗糙', '破舊'], clue: '提示：亮得讓人看了都要瞇起來。', explain: '答案是「耀眼」，完整的短語是「像太陽般耀眼的獎盃」。' },
        { id: 'ph5', img: 'pr-busy-bee-kid.png', before: '像蜜蜂般', noun: '小幫手', ask: '像蜜蜂般什麼樣的小幫手', look: '再看看圖片，小幫手一直在做什麼？', options: ['勤勞', '懶惰', '安靜', '膽小'], clue: '提示：一整天跑來跑去，忙個不停。', explain: '答案是「勤勞」，完整的短語是「像蜜蜂般勤勞的小幫手」。' },
        { id: 'ph6', img: 'pr-cold-wind.png', before: '像冰塊般', noun: '北風', ask: '像冰塊般什麼樣的北風', look: '再看看圖片，路人穿得怎麼樣？', options: ['寒冷', '炎熱', '香甜', '柔軟'], clue: '提示：吹在臉上，大家都縮著脖子。', explain: '答案是「寒冷」，完整的短語是「像冰塊般寒冷的北風」。' },
        { id: 'ph7', img: 'pr-loud-drum.png', before: '像打雷般', noun: '鼓聲', ask: '像打雷般什麼樣的鼓聲', look: '再看看圖片，觀眾有沒有摀住耳朵？', options: ['響亮', '微弱', '安靜', '柔和'], clue: '提示：整座體育館都在震動。', explain: '答案是「響亮」，完整的短語是「像打雷般響亮的鼓聲」。' },
        { id: 'ph8', img: 'pr-smooth-lake.png', before: '像鏡子般', noun: '水面', ask: '像鏡子般什麼樣的水面', look: '再看看圖片，水面有沒有波紋？', options: ['平靜', '洶湧', '混亂', '吵鬧'], clue: '提示：倒映著天上的雲，一動也不動。', explain: '答案是「平靜」，完整的短語是「像鏡子般平靜的水面」。' }
      ],
      say: [],
      words: [
        { word: '無理取鬧', meaning: '明明沒有原因，還故意吵吵嚷嚷。', img: 'tantrum.png' },
        { word: '拱手讓人', meaning: '輕輕鬆鬆就把快得到的東西送給對方。', img: 'give-trophy.png' },
        { word: '勢均力敵', meaning: '雙方一樣強，分不出高低。', img: 'tug-even.png' },
        { word: '鬥志', meaning: '想要拚下去、不認輸的心。', img: 'arm-wrestle.png' }
      ],
      choose: [
        { id: 'pw1', word: '無理取鬧', options: ['弟弟要不到糖果就在地上打滾，真是無理取鬧。', '他有禮貌的說出自己的想法，真是無理取鬧。'], clue: '提示：想一想，「無理取鬧」是講道理，還是故意吵？', explain: '第一句用得對：要不到就打滾，故意吵。有禮貌的說想法，剛好相反。' },
        { id: 'pw2', word: '拱手讓人', options: ['比賽最後一分鐘他分心了，把冠軍拱手讓人。', '他努力到最後，終於把冠軍拱手讓人，自己拿到第一名。'], clue: '提示：想一想，「拱手讓人」是自己得到，還是讓給別人？', explain: '第一句用得對：分心把冠軍讓給別人。自己拿到第一名，就不是拱手讓人。' },
        { id: 'pw3', word: '勢均力敵', options: ['兩位選手勢均力敵，比賽非常精采。', '大人和小孩比腕力，真是勢均力敵，大人一下子就贏了。'], clue: '提示：想一想，「勢均力敵」是差不多強，還是差很多？', explain: '第一句用得對：兩位選手一樣強。大人一下子就贏，表示差很多。' },
        { id: 'pw4', word: '鬥志', options: ['聽到大家的加油，他的鬥志又燃燒起來了。', '他很累，鬥志很想睡覺。'], clue: '提示：想一想，「鬥志」是不認輸的心，還是想睡覺？', explain: '第一句用得對：加油讓他更想拚。「鬥志很想睡覺」說不通。' }
      ],
      make: [
        { id: 'pm1', word: '無理取鬧', clue: '提示：想想看，有沒有人沒道理還一直吵？', model: '小表弟要不到玩具就無理取鬧，大家都很頭痛。' },
        { id: 'pm2', word: '拱手讓人', clue: '提示：想想看，有沒有因為大意而失去機會的事？', model: '他在最後一題寫錯，把第一名拱手讓人。' },
        { id: 'pm3', word: '勢均力敵', clue: '提示：想想看，什麼比賽雙方一樣厲害？', model: '兩班拔河勢均力敵，繩子一直停在中間。' },
        { id: 'pm4', word: '鬥志', clue: '提示：想想看，什麼讓你更想拚下去？', model: '看到對手追上來，我的鬥志更強了。' }
      ]
    },
    pattern: [
      { key: 'budanhai', id: 'bh', title: '不但……還……', img: 'budanhai.png',
        meaning: '先用「不但」說一件事，再用「還」說出更進一步的事，表示不只一樣。',
        examples: ['哥哥不但會游泳，還會潛水。'],
        match: [
          { id: 'pt-bh-m1', img: 'pt-helpful-kid.png', front: '小美不但幫忙掃地，', options: ['還把垃圾拿去倒。', '還在掃地。', '還把地弄髒了。'], clue: '提示：看看圖片，掃完地，小美還做了什麼？', explain: '答案是「還把垃圾拿去倒」：掃地，又倒垃圾。' },
          { id: 'pt-bh-m2', img: 'pt-fast-runner.png', front: '他不但跑得快，', options: ['還跳得很遠。', '還跑得很快。', '還跑得很慢。'], clue: '提示：看看圖片，他還在比什麼項目？', explain: '答案是「還跳得很遠」：跑得快，又跳得遠。' },
          { id: 'pt-bh-m3', img: 'pt-sing-paint.png', front: '姐姐不但很會唱歌，', options: ['還畫得一手好畫。', '還很會唱歌。', '還不會唱歌。'], clue: '提示：看看圖片，姐姐手上拿著什麼？', explain: '答案是「還畫得一手好畫」：會唱歌，又會畫畫。' }
        ],
        conj: [
          { id: 'pt-bh-c1', full: '這家店的麵不但好吃，還很便宜。', img: 'pt-noodle-shop.png', sentence: '這家店的麵＿＿好吃，＿很便宜。', options: ['不但……還……', '只要……一定……', '雖然……卻……'], clue: '提示：兩個優點一起說。數數看有幾個空格。', explain: '答案是「不但……還……」：這家店的麵不但好吃，還很便宜。' },
          { id: 'pt-bh-c2', full: '他不但沒有生氣，還笑著原諒了我。', img: 'pt-forgive.png', sentence: '他＿＿沒有生氣，＿笑著原諒了我。', options: ['不但……還……', '只要……一定……', '雖然……卻……'], clue: '提示：不只沒生氣，又多做了一件事。數數看有幾個空格。', explain: '答案是「不但……還……」：他不但沒有生氣，還笑著原諒了我。' }
        ],
        half: [
          { id: 'pt-bh-h1', front: '這次校外教學，我們不但看到了海豚，', clue: '提示：除了海豚，還看到什麼？記得要說「還」。', model: '還摸到了海星。' },
          { id: 'pt-bh-h2', front: '班長不但功課好，', clue: '提示：班長還有什麼優點？記得要說「還」。', model: '還很熱心幫助同學。' }
        ],
        whole: [
          { id: 'pt-bh-w1', clue: '提示：先用「不但」說一件事，再用「還」說更進一步的事。想想看：誰有兩個優點？', model: '我的好朋友不但很幽默，還很會照顧人。' }
        ] },
      { key: 'zhiyaoyiding', id: 'zy', title: '只要……一定……', img: 'zhiyaoyiding.png',
        meaning: '先用「只要」說一個條件，再用「一定」說出做到這個條件後，很確定會有的結果。',
        examples: ['只要大家同心協力，一定能把教室布置好。'],
        match: [
          { id: 'pt-zy-m1', img: 'pt-practice-piano.png', front: '只要每天練習，', options: ['你一定能彈得更好。', '你一定每天練習。', '你一定會忘記。'], clue: '提示：看看圖片，每天練習會有什麼結果？', explain: '答案是「你一定能彈得更好」：每天練習是條件，彈得更好是結果。' },
          { id: 'pt-zy-m2', img: 'pt-early-bed.png', front: '只要早點睡覺，', options: ['明天一定很有精神。', '明天一定很累。', '一定會晚睡。'], clue: '提示：看看圖片，睡飽了早上會怎麼樣？', explain: '答案是「明天一定很有精神」：早睡是條件，有精神是結果。' },
          { id: 'pt-zy-m3', img: 'pt-team-carry.png', front: '只要大家一起出力，', options: ['一定搬得動這張桌子。', '一定會搬不動桌子。', '一定是同一群人。'], clue: '提示：看看圖片，大家合力搬桌子，結果呢？', explain: '答案是「一定搬得動這張桌子」：一起出力是條件，搬得動是結果。' }
        ],
        conj: [
          { id: 'pt-zy-c1', full: '只要你肯努力，一定會進步。', img: 'pt-improve.png', sentence: '＿＿你肯努力，＿＿會進步。', options: ['只要……一定……', '不但……還……', '雖然……卻……'], clue: '提示：前面是條件，後面是很確定的結果。數數看有幾個空格。', explain: '答案是「只要……一定……」：只要你肯努力，一定會進步。' },
          { id: 'pt-zy-c2', full: '只要按時澆水，花一定會開得很漂亮。', img: 'pt-water-flower.png', sentence: '＿＿按時澆水，花＿＿會開得很漂亮。', options: ['只要……一定……', '不但……還……', '雖然……卻……'], clue: '提示：澆水是條件，花開是結果。數數看有幾個空格。', explain: '答案是「只要……一定……」：只要按時澆水，花一定會開得很漂亮。' }
        ],
        half: [
          { id: 'pt-zy-h1', front: '只要大家團結合作，', clue: '提示：團結合作會有什麼結果？記得要說「一定」。', model: '我們一定能贏得比賽。' },
          { id: 'pt-zy-h2', front: '只要上課認真聽講，', clue: '提示：認真聽講會怎麼樣？記得要說「一定」。', model: '你一定能學得很好。' }
        ],
        whole: [
          { id: 'pt-zy-w1', clue: '提示：先用「只要」說條件，再用「一定」說確定的結果。想想看：要做到什麼，才會有好的結果？', model: '只要每天運動，身體一定會越來越健康。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'simile', name: '譬喻', meaning: '把一樣東西比成另一樣有相同地方的東西，讓人更容易想像。', example: '課文把起跑衝出去的同學比成一隻獵豹，讓人感覺到他跑得有多快。',
          show: { sentence: '他跑起來像一陣風。' },
          yesno: [
            { id: 'rh-si-y1', sentence: '接力棒在大家手中傳來傳去，像一顆跳動的心。', answer: true, clue: '提示：這句話有沒有把接力棒比成另一樣東西？', explain: '是譬喻：把接力棒比成跳動的心。' },
            { id: 'rh-si-y2', sentence: '他把接力棒交給下一位。', answer: false, clue: '提示：這句話有沒有把接力棒比成別的東西？', explain: '不是譬喻：這句話只是說交棒。' }
          ],
          pick: [
            { id: 'rh-si-p1', options: ['操場上的跑道像一條紅色的緞帶。', '操場上有跑道。'], clue: '提示：哪一句把跑道比成另一樣東西？', explain: '「像一條紅色的緞帶」是譬喻。' },
            { id: 'rh-si-p2', options: ['他的笑容像陽光一樣溫暖。', '他笑了。'], clue: '提示：哪一句把笑容比成別的東西？', explain: '「像陽光一樣溫暖」是譬喻。' },
            { id: 'rh-si-p3', options: ['觀眾的加油聲像海浪一波一波傳來。', '觀眾在加油。', '比賽開始了。'], clue: '提示：哪一句用「像」把加油聲比成別的東西？', explain: '「像海浪一波一波傳來」是譬喻。' },
            { id: 'rh-si-p4', options: ['衝過終點的他，好像一位凱旋的英雄。', '他衝過終點。', '他贏了比賽。'], clue: '提示：哪一句把他比成另一種人？', explain: '「好像一位凱旋的英雄」是譬喻。' },
            { id: 'rh-si-p5', options: ['汗水從他臉上流下，像斷了線的珠子。', '他流了很多汗。', '天氣很熱。', '他在擦汗。'], clue: '提示：哪一句用「像」把汗水比成別的東西？', explain: '「像斷了線的珠子」是譬喻。' },
            { id: 'rh-si-p6', options: ['團隊就像一部機器，每個零件都很重要。', '我們是一個團隊。', '大家一起比賽。', '團隊有四個人。'], clue: '提示：哪一句把團隊比成另一樣東西？', explain: '「就像一部機器」是譬喻。' }
          ] },
        { key: 'exclaim', name: '感嘆', meaning: '說話時加上「啊」、「哇」、「唉」這些聲音，或用驚嘆號，把心裡的驚訝、高興、難過大聲的說出來。', example: '課文最後兩個人抱在一起大喊贏了，用驚嘆號把開心的心情喊出來。',
          show: { sentence: '哇！我們贏了！', mark: ['哇！'] },
          yesno: [
            { id: 'rh-ex-y1', sentence: '唉！只差一點點就贏了。', answer: true, mark: ['唉！'], clue: '提示：這句話有沒有用「唉」，說出心裡的可惜？', explain: '是感嘆：「唉」說出了可惜的心情。' },
            { id: 'rh-ex-y2', sentence: '我們只差一點點就贏了。', answer: false, clue: '提示：這句話有沒有用嘆詞或驚嘆號，把心情喊出來？', explain: '不是感嘆：這句話只是說出結果。' }
          ],
          pick: [
            { id: 'rh-ex-p1', mark: ['太好了！'], options: ['太好了！我們拿到冠軍了！', '我們拿到冠軍了。'], clue: '提示：哪一句用驚嘆號把高興喊出來？', explain: '「太好了！」是感嘆。' },
            { id: 'rh-ex-p2', mark: ['哎呀！'], options: ['哎呀！接力棒掉了！', '接力棒掉了。'], clue: '提示：哪一句用「哎呀」說出驚訝？', explain: '「哎呀！」是感嘆。' },
            { id: 'rh-ex-p3', mark: ['加油！'], options: ['加油！你一定可以的！', '他在比賽。', '比賽快開始了。'], clue: '提示：哪一句用驚嘆號大聲說出心情？', explain: '「加油！」是感嘆。' },
            { id: 'rh-ex-p4', mark: ['哇！'], options: ['哇！他跑得好快！', '他跑得很快。', '他是第一棒。'], clue: '提示：哪一句用「哇」說出驚訝？', explain: '「哇！」是感嘆。' },
            { id: 'rh-ex-p5', mark: ['唉！'], options: ['唉！我又跌倒了。', '我跌倒了。', '操場很滑。', '我在跑步。'], clue: '提示：哪一句用「唉」說出難過？', explain: '「唉！」是感嘆。' },
            { id: 'rh-ex-p6', mark: ['真是太棒了！'], options: ['我們拿下冠軍了，真是太棒了！', '我們贏了比賽。', '比賽結束了。', '大家回到教室。'], clue: '提示：哪一句用驚嘆號把高興喊出來？', explain: '「真是太棒了！」是感嘆。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '他像一枝離弦的箭，衝向終點。', answer: '譬喻', clue: '提示：這句話有沒有把他比成別的東西？', explain: '答案是「譬喻」：把他比成射出去的箭。' },
        { id: 'rh2', sentence: '她的歌聲像小鳥一樣清脆。', answer: '譬喻', clue: '提示：這句話有沒有用「像」？', explain: '答案是「譬喻」：把歌聲比成小鳥的叫聲。' },
        { id: 'rh3', sentence: '哇！好壯觀的煙火！', answer: '感嘆', mark: ['哇！'], clue: '提示：這句話有沒有用「哇」和驚嘆號？', explain: '答案是「感嘆」：用「哇」說出驚訝。' },
        { id: 'rh4', sentence: '唉！今天又下雨了。', answer: '感嘆', mark: ['唉！'], clue: '提示：這句話有沒有用「唉」說出心情？', explain: '答案是「感嘆」：用「唉」說出失望。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L01 = d; }
})(this);
