/* 第 12 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'infer', qe: 'infer', qf: 'infer', qg: 'interpret', qh: 'interpret',
      qi: 'evaluate', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qg: { think: ['女孩為什麼一直想打開車窗？', '窗外站著的是誰？'], why: '女孩要去外地工作，弟弟們特地到鐵路旁送她。她打開窗，是為了把懷裡的水果丟給弟弟們，謝謝他們來送行。' },
      qh: { think: ['「我」一開始怎麼看這個女孩？', '看到她丟水果以後，「我」的想法變成怎樣？'], why: '一開始「我」覺得她又髒又不懂事，很討厭她；看到她把水果送給弟弟，才明白她很愛家人，心裡升起一股溫暖，連自己的疲倦也忘了。' },
      qi: { think: ['文章開頭的天氣和心情是什麼顏色、什麼感覺？', '結尾出現了什麼鮮豔的顏色？'], why: '開頭是灰暗、沉悶的冬天傍晚；結尾出現鮮豔的橘色水果在空中飛，代表「我」的心情也從灰暗變得明亮溫暖。' },
      qj: { think: ['你有沒有一開始誤會別人，後來才了解他的經驗？', '這件事讓你學到什麼？'], why: '先說你原本怎麼看那個人，再說後來發生什麼事讓你改變想法。這篇文章提醒我們：不要只看外表就下判斷。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['我會寫一張卡片，謝謝來送我的家人。', '我會給他們一個大大的擁抱。'], bad: ['我不會理他們，直接走掉。', '我會嫌他們很麻煩。'], why: '題目問的是如果家人來送行，你會怎麼表達感謝。寫卡片、擁抱都是好方法。不理人、嫌麻煩，都沒有珍惜家人的心意。' },
      k2: { good: ['我會先多觀察，不只看外表就下判斷。', '我會試著了解他為什麼這樣做。'], bad: ['看起來髒的人一定很討厭。', '我只看外表就決定喜不喜歡一個人。'], why: '題目問的是怎麼看待一個不熟悉的人。多觀察、試著了解，才不會誤會別人。只看外表就判斷，很容易看錯人。' }
    },
    hanzi: [
      { id: 'h-廂', combo: { type: '形聲字', pict: '外面的「广」像屋子，裡面的「相」念起來像「廂」。大房子旁邊的小房間，就是「廂」。' }, char: '廂', zhuyin: 'ㄒㄧㄤ', radical: '广', strokes: 12, words: ['車廂', '一廂情願'], say: '廂，車廂的廂', cloze: '車＿', img: 'train-car.png', options: ['廂', '箱', '湘', '想'], clue: '這個字的外面是「广」。', explain: '答案是「廂」，外面是「广」；「箱」的上面是竹字頭，「想」的下面是「心」。', parts: ['广', '相'], story: '外面像屋子，裡面念起來像「廂」。火車上一節一節像小房間的地方，就是「車廂」。', sentence: '這節車廂裡坐滿了乘客。' },
      { id: 'h-頰', combo: { layout: 'lr', parts: [['夾', 's', ''], ['頁', 'm', '頭']] }, char: '頰', zhuyin: 'ㄐㄧㄚˊ', radical: '頁', strokes: 16, words: ['臉頰', '雙頰'], say: '頰，雙頰的頰', cloze: '雙＿', img: 'red-cheeks.png', options: ['頰', '夾', '峽', '俠'], clue: '這個字的右邊是「頁」。', explain: '答案是「頰」，右邊是「頁」；「峽」的左邊是山字旁，「俠」的左邊是單人旁。', parts: ['夾', '頁'], story: '左邊的「夾」念起來像「頰」，右邊的「頁」和頭有關。臉的兩邊、像被夾住的地方，就是「臉頰」。', sentence: '寒風吹得她雙頰通紅。', build: { layout: 'lr', show: ['夾', '？'], answer: '頁', options: ['頁', '攵', '力', '欠'], clue: '想一想：和頭臉有關的部首放在右邊，是哪一個？' } },
      { id: 'h-袱', combo: { layout: 'lr', parts: [['衤', 'm', '布'], ['伏', 's', '']] }, char: '袱', zhuyin: 'ㄈㄨˊ', radical: '衣', strokes: 11, words: ['包袱', '包袱巾'], say: '袱，包袱的袱', cloze: '包＿', img: 'cloth-bundle.png', options: ['袱', '伏', '服', '福'], clue: '這個字的左邊是衣字旁。', explain: '答案是「袱」，左邊是衣字旁；「伏」的左邊是單人旁，「福」的左邊是示字旁。', parts: ['衤', '伏'], story: '左邊是衣服、布，右邊的「伏」念起來像「袱」。用一塊布把東西包起來，就是「包袱」。', sentence: '奶奶用布把衣服包成一個包袱。', build: { layout: 'lr', show: ['？', '伏'], answer: '衤', options: ['衤', '亻', '礻', '扌'], clue: '想一想：包東西的布和什麼有關？' } },
      { id: 'h-瘡', combo: { type: '形聲字', pict: '外面的「疒」和生病有關，裡面的「倉」念起來像「瘡」。皮膚破掉、紅腫的傷口，就是「瘡」。' }, char: '瘡', zhuyin: 'ㄔㄨㄤ', radical: '疒', strokes: 15, words: ['凍瘡', '瘡疤'], say: '瘡，瘡疤的瘡', cloze: '＿疤', img: 'cold-hands.png', options: ['瘡', '倉', '槍', '創'], clue: '這個字的外面是病字旁。', explain: '答案是「瘡」，外面是病字旁；「槍」的左邊是木字旁，「創」的右邊是立刀旁。', parts: ['疒', '倉'], story: '外面是生病的「疒」，裡面念起來像「瘡」。手腳太冷而紅腫裂開，叫「凍瘡」。', sentence: '他小時候受過傷，腿上留下一個瘡疤。' },
      { id: 'h-狽', combo: { layout: 'lr', parts: [['犭', 'm', '動物'], ['貝', 's', '']] }, char: '狽', zhuyin: 'ㄅㄟˋ', radical: '犬', strokes: 10, words: ['狼狽', '狼狽為奸'], say: '狽，狼狽的狽', cloze: '狼＿', img: 'messy-rain.png', options: ['狽', '貝', '唄', '鋇'], clue: '這個字的左邊是犬字旁。', explain: '答案是「狽」，左邊是犬字旁；「貝」沒有偏旁，「唄」的左邊是口字旁。', parts: ['犭', '貝'], story: '左邊是動物，右邊的「貝」念起來像「狽」。傳說中前腿很短的動物，要靠在狼身上才能走，所以很「狼狽」，表示很難堪、很糟的樣子。', sentence: '被雨淋溼的他，看起來好狼狽。', build: { layout: 'lr', show: ['？', '貝'], answer: '犭', options: ['犭', '口', '金', '亻'], clue: '想一想：這是一種動物，左邊放哪一個？' } },
      { id: 'h-憊', combo: { layout: 'tb', parts: [['備', 's', ''], ['心', 'm', '心']] }, char: '憊', zhuyin: 'ㄅㄟˋ', radical: '心', strokes: 16, words: ['疲憊', '疲憊不堪'], say: '憊，疲憊的憊', cloze: '疲＿', img: 'tired-kid.png', options: ['憊', '備', '憶', '億'], clue: '這個字的下面是「心」。', explain: '答案是「憊」，下面是「心」；「備」沒有「心」，「憶」的左邊是豎心旁。', parts: ['備', '心'], story: '上面的「備」念起來像「憊」，下面是心。身體和心都累壞了，就是「疲憊」。', sentence: '走了一整天，大家都很疲憊。', build: { layout: 'tb', show: ['備', '？'], answer: '心', options: ['心', '皿', '木', '女'], clue: '想一想：身體和精神都累壞了，下面放哪一個部首？' } },
      { id: 'h-淒', combo: { layout: 'lr', parts: [['氵', 'm', '水'], ['妻', 's', '']] }, char: '淒', zhuyin: 'ㄑㄧ', radical: '水', strokes: 11, words: ['淒厲', '淒涼'], say: '淒，淒涼的淒', cloze: '＿涼', img: 'lonely-night.png', options: ['淒', '妻', '棲', '萋'], clue: '這個字的左邊是三點水。', explain: '答案是「淒」，左邊是三點水；「棲」的左邊是木字旁，「萋」的上面是草字頭。', parts: ['氵', '妻'], story: '左邊是水，右邊的「妻」念起來像「淒」。下著冷冷的雨，讓人覺得又冷又寂寞，就是「淒涼」。', sentence: '秋風吹過空蕩蕩的公園，好淒涼。', build: { layout: 'lr', show: ['？', '妻'], answer: '氵', options: ['氵', '木', '艹', '女'], clue: '想一想：冷冷的雨是什麼？' } },
      { id: 'h-隧', combo: { layout: 'lr', parts: [['阝', 'm', '山丘'], ['遂', 's', '']] }, char: '隧', zhuyin: 'ㄙㄨㄟˋ', radical: '阜', strokes: 15, words: ['隧道', '海底隧道'], say: '隧，隧道的隧', cloze: '＿道', img: 'tunnel.png', options: ['隧', '遂', '邃', '燧'], clue: '這個字的左邊是阜字旁。', explain: '答案是「隧」，左邊是阜字旁；「遂」沒有阜字旁，「燧」的左邊是火字旁。', parts: ['阝', '遂'], story: '左邊的「阝」是山丘，右邊的「遂」念起來像「隧」。從山的肚子裡挖出來的路，就是「隧道」。', sentence: '火車開進長長的隧道。', build: { layout: 'lr', show: ['？', '遂'], answer: '阝', options: ['阝', '火', '穴', '木'], clue: '想一想：穿過山丘的路，左邊放哪一個？' } },
      { id: 'h-卯', combo: { type: '象形字', pict: '「卯」像把兩扇門打開，是古代記時間用的字，也常用在「卯足全力」。' }, char: '卯', zhuyin: 'ㄇㄠˇ', radical: '卩', strokes: 5, words: ['卯足全力', '寅吃卯糧'], say: '卯，卯足全力的卯', cloze: '＿足全力', img: 'push-hard.png', options: ['卯', '印', '卬', '柳'], clue: '這個字只有五畫，左右對稱像兩扇門。', explain: '答案是「卯」；「印」的左邊不一樣，「柳」的左邊是木字旁。', parts: ['卯'], story: '像打開的兩扇門，古時候用來記時間。把全部的力氣都拿出來，叫「卯足全力」。', sentence: '比賽最後一圈，他卯足全力衝刺。' },
      { id: 'h-貫', combo: { layout: 'tb', parts: [['毌', 's', ''], ['貝', 'm', '錢']] }, char: '貫', zhuyin: 'ㄍㄨㄢˋ', radical: '貝', strokes: 11, words: ['全神貫注', '貫穿'], say: '貫，貫穿的貫', cloze: '＿穿', img: 'focus-kid.png', options: ['貫', '慣', '實', '買'], clue: '這個字的下面是「貝」，上面是「毌」。', explain: '答案是「貫」；「慣」的左邊多了豎心旁，「買」的上面是「罒」。', parts: ['毌', '貝'], story: '上面像一根繩子穿過東西，下面是貝殼錢。用繩子把錢穿成一串，就是「貫」；從頭穿到尾，叫「貫穿」。', sentence: '這條河貫穿整座城市。', build: { layout: 'tb', show: ['毌', '？'], answer: '貝', options: ['貝', '目', '心', '見'], clue: '想一想：古時候串起來的錢是什麼？' } },
      { id: 'h-岔', combo: { layout: 'tb', parts: [['分', 's', ''], ['山', 'm', '山']] }, char: '岔', zhuyin: 'ㄔㄚˋ', radical: '山', strokes: 7, words: ['岔路', '打岔'], say: '岔，打岔的岔', cloze: '打＿', img: 'fork-road.png', options: ['岔', '盆', '忿', '分'], clue: '這個字的上面是「分」，下面是「山」。', explain: '答案是「岔」；「盆」的下面是「皿」，「忿」的下面是「心」。', parts: ['分', '山'], story: '上面是「分」，下面是「山」。山路在這裡分開成兩條，就是「岔路」；別人說話時插嘴，叫「打岔」。', sentence: '老師說話時不要打岔。', build: { layout: 'tb', show: ['分', '？'], answer: '山', options: ['山', '皿', '心', '石'], clue: '想一想：路分開的地方常在哪裡？' } },
      { id: 'h-欄', combo: { layout: 'lr', parts: [['木', 'm', '木頭'], ['闌', 's', '']] }, char: '欄', zhuyin: 'ㄌㄢˊ', radical: '木', strokes: 21, words: ['欄柵', '欄杆'], say: '欄，欄杆的欄', cloze: '＿杆', img: 'fence.png', options: ['欄', '攔', '爛', '蘭'], clue: '這個字的左邊是木字旁。', explain: '答案是「欄」，左邊是木字旁；「攔」的左邊是提手旁，「爛」的左邊是火字旁。', parts: ['木', '闌'], story: '左邊是木頭，右邊的「闌」念起來像「欄」。用木頭做、擋住不讓人過去的東西，就是「欄杆」。', sentence: '請扶著欄杆慢慢下樓梯。', build: { layout: 'lr', show: ['？', '闌'], answer: '木', options: ['木', '扌', '火', '艹'], clue: '想一想：擋路的架子常是用什麼做的？' } },
      { id: 'h-柵', combo: { layout: 'lr', parts: [['木', 'm', '木頭'], ['冊', 's', '']] }, char: '柵', zhuyin: 'ㄓㄚˋ', radical: '木', strokes: 9, words: ['欄柵', '柵欄'], say: '柵，柵欄的柵', cloze: '＿欄', img: 'fence.png', options: ['柵', '冊', '珊', '刪'], clue: '這個字的左邊是木字旁。', explain: '答案是「柵」，左邊是木字旁；「珊」的左邊是「王」，「刪」的右邊是立刀旁。', parts: ['木', '冊'], story: '左邊是木頭，右邊的「冊」像一根根竹片排在一起。用木條一根根排成的圍牆，就是「柵欄」。', sentence: '農場四周圍著木頭柵欄。', build: { layout: 'lr', show: ['？', '冊'], answer: '木', options: ['木', '王', '刂', '扌'], clue: '想一想：一根根排成圍牆的是什麼材料？' } },
      { id: 'h-矮', combo: { layout: 'lr', parts: [['矢', 'm', '箭'], ['委', 's', '']] }, char: '矮', zhuyin: 'ㄞˇ', radical: '矢', strokes: 13, words: ['矮小', '矮子'], say: '矮，矮子的矮', cloze: '＿子', img: 'short-tall.png', options: ['矮', '委', '倭', '萎'], clue: '這個字的左邊是「矢」。', explain: '答案是「矮」，左邊是「矢」；「倭」的左邊是單人旁，「萎」的上面是草字頭。', parts: ['矢', '委'], story: '左邊的「矢」是短短的箭，右邊的「委」念起來有點像「矮」。像短箭一樣不高，就是「矮」。', sentence: '弟弟站在矮凳子上拿東西。', build: { layout: 'lr', show: ['？', '委'], answer: '矢', options: ['矢', '亻', '艹', '禾'], clue: '想一想：短短的箭是哪一個部首？' } },
      { id: 'h-陰', combo: { layout: 'lr', parts: [['阝', 'm', '山丘'], ['侌', 's', '']] }, char: '陰', zhuyin: 'ㄧㄣ', radical: '阜', strokes: 11, words: ['陰暗', '陰天'], say: '陰，陰天的陰', cloze: '＿天', img: 'cloudy-sky.png', options: ['陰', '陽', '蔭', '隱'], clue: '這個字的左邊是阜字旁，右邊有「云」。', explain: '答案是「陰」；「陽」的右邊是「昜」，「蔭」的上面多了草字頭。', parts: ['阝', '侌'], story: '左邊是山丘，右邊像雲遮住太陽。山的背面照不到陽光，就是「陰」；雲多沒太陽，叫「陰天」。', sentence: '今天是陰天，看不到太陽。', build: { layout: 'lr', show: ['？', '侌'], answer: '阝', options: ['阝', '艹', '日', '亻'], clue: '想一想：照不到陽光的山丘，左邊放哪一個？' } },
      { id: 'h-扔', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['乃', 's', '']] }, char: '扔', zhuyin: 'ㄖㄥ', radical: '手', strokes: 5, words: ['扔掉', '扔球'], say: '扔，扔球的扔', cloze: '＿球', img: 'throw-ball.png', options: ['扔', '仍', '奶', '乃'], clue: '這個字的左邊是提手旁。', explain: '答案是「扔」，左邊是提手旁；「仍」的左邊是單人旁，「奶」的左邊是女字旁。', parts: ['扌', '乃'], story: '左邊是手，右邊的「乃」念起來有點像「扔」。用手把東西丟出去，就是「扔」。', sentence: '請把垃圾扔進垃圾桶。', build: { layout: 'lr', show: ['？', '乃'], answer: '扌', options: ['扌', '亻', '女', '口'], clue: '想一想：丟東西要用身體的哪個部分？' } },
      { id: 'h-茫', combo: { type: '形聲字', pict: '上面是草字頭，下面的「汒」是一片大水。草和水連成一大片，看不到邊，就是「茫」。' }, char: '茫', zhuyin: 'ㄇㄤˊ', radical: '艸', strokes: 10, words: ['蒼茫', '茫然'], say: '茫，茫然的茫', cloze: '＿然', img: 'misty-field.png', options: ['茫', '忙', '芒', '盲'], clue: '這個字的上面是草字頭，下面有三點水。', explain: '答案是「茫」；「芒」沒有三點水，「忙」的左邊是豎心旁。', parts: ['艹', '氵', '亡'], story: '上面是草，下面是一大片水。一眼望去看不到邊，就是「蒼茫」；什麼都不知道的樣子，叫「茫然」。', sentence: '迷路的小孩一臉茫然。' },
      { id: 'h-悶', combo: { type: '形聲字', pict: '外面是「門」，裡面是「心」。心被關在門裡，透不過氣，就是「悶」。' }, char: '悶', zhuyin: 'ㄇㄣˋ', radical: '心', strokes: 12, words: ['鬱悶', '悶熱'], say: '悶，悶熱的悶', cloze: '＿熱', img: 'hot-room.png', options: ['悶', '問', '聞', '們'], clue: '這個字是「門」裡面有一個「心」。', explain: '答案是「悶」，門裡是「心」；「問」的門裡是「口」，「聞」的門裡是「耳」。', parts: ['門', '心'], story: '外面是門，裡面是心。心被關在門裡出不來，覺得不舒服，就是「悶」；又熱又不通風，叫「悶熱」。', sentence: '夏天的教室好悶熱。' }
    ],
    vocab: [
      { id: 'v-車廂', cloze: true, clozeOptions: ['車廂', '屋頂', '花園', '操場'], word: '車廂', meaning: '鐵路上的長長交通工具裡，一節一節讓乘客坐的空間。', example: '這列火車有八節＿＿。', img: 'train-car.png', options: ['車廂', '隧道', '岔路', '欄柵'] },
      { id: 'v-臉頰', cloze: true, clozeOptions: ['臉頰', '腳底', '手肘', '膝蓋'], word: '臉頰', meaning: '面孔的兩邊。', example: '妹妹害羞得＿＿都紅了。', img: 'red-cheeks.png', options: ['臉頰', '凍瘡', '包袱', '車廂'] },
      { id: 'v-包袱', cloze: true, clozeOptions: ['包袱', '電視', '冰箱', '沙發'], word: '包袱', meaning: '用一塊布把物品裹起來的行李。', example: '旅人背著一個＿＿上路。', img: 'cloth-bundle.png', options: ['包袱', '車廂', '欄柵', '臉頰'] },
      { id: 'v-凍瘡', cloze: true, clozeOptions: ['凍瘡', '曬傷', '蚊咬', '擦傷'], word: '凍瘡', meaning: '天氣太冷，手腳皮膚紅腫裂開的傷。', example: '冬天戴手套，手才不會長＿＿。', img: 'cold-hands.png', options: ['凍瘡', '臉頰', '包袱', '隧道'] },
      { id: 'v-狼狽', cloze: true, clozeOptions: ['狼狽', '整齊', '帥氣', '從容'], word: '狼狽', meaning: '樣子很糟、很難堪。', example: '他跌進泥巴裡，樣子好＿＿。', img: 'messy-rain.png', options: ['狼狽', '疲憊', '鬱悶', '陰暗'] },
      { id: 'v-疲憊', cloze: true, clozeOptions: ['疲憊', '有精神', '有活力', '輕鬆'], word: '疲憊', meaning: '非常累，沒有力氣。', example: '爸爸加班回來，一臉＿＿。', img: 'tired-kid.png', options: ['疲憊', '狼狽', '矮小', '蒼茫'] },
      { id: 'v-淒厲', cloze: true, clozeOptions: ['淒厲', '輕柔', '悅耳', '溫和'], word: '淒厲', meaning: '聲音又尖又悲傷，聽了很不舒服。', example: '半夜傳來一聲＿＿的貓叫。', img: 'lonely-night.png', options: ['淒厲', '陰暗', '鬱悶', '狼狽'] },
      { id: 'v-隧道', cloze: true, clozeOptions: ['隧道', '天橋', '屋頂', '陽臺'], word: '隧道', meaning: '從山裡或地底下挖出來、讓車子通過的路。', example: '火車鑽進長長的＿＿，四周一片黑。', img: 'tunnel.png', options: ['隧道', '岔路', '車廂', '欄柵'] },
      { id: 'v-卯足全力', cloze: true, clozeOptions: ['卯足全力', '隨便應付', '有氣無力', '輕鬆偷懶'], word: '卯足全力', meaning: '把所有的勁道都使出來。', example: '拔河時，大家＿＿＿＿往後拉。', img: 'push-hard.png', options: ['卯足全力', '全神貫注', '漫不經心', '心灰意冷'] },
      { id: 'v-全神貫注', cloze: true, clozeOptions: ['全神貫注', '心不在焉', '東張西望', '漫不經心'], word: '全神貫注', meaning: '把心思和精力百分之百集中在某件事上。', example: '他＿＿＿＿的看著螞蟻搬家。', img: 'focus-kid.png', options: ['全神貫注', '卯足全力', '恍然大悟', '心灰意冷'] },
      { id: 'v-岔路', cloze: true, clozeOptions: ['岔路', '大海', '天空', '屋頂'], word: '岔路', meaning: '從大道分出去的小徑。', example: '走到＿＿口，不知道該往哪邊走。', img: 'fork-road.png', options: ['岔路', '隧道', '欄柵', '車廂'] },
      { id: 'v-欄柵', cloze: true, clozeOptions: ['欄柵', '窗簾', '地毯', '枕頭'], word: '欄柵', meaning: '用木條或鐵條排成的圍籬。', example: '鐵路旁有一排＿＿擋著。', img: 'fence.png', options: ['欄柵', '岔路', '包袱', '車廂'] },
      { id: 'v-矮小', cloze: true, clozeOptions: ['矮小', '高大', '巨大', '雄偉'], word: '矮小', meaning: '身材或東西不高、不大。', example: '那間＿＿的木屋是外公的家。', img: 'short-tall.png', options: ['矮小', '陰暗', '蒼茫', '疲憊'] },
      { id: 'v-陰暗', cloze: true, clozeOptions: ['陰暗', '明亮', '燦爛', '光亮'], word: '陰暗', meaning: '光線不足，看起來黑黑的。', example: '地下室很＿＿，要開燈才看得到。', img: 'cloudy-sky.png', options: ['陰暗', '矮小', '鬱悶', '淒厲'] },
      { id: 'v-扔掉', cloze: true, clozeOptions: ['扔掉', '撿起', '留著', '收好'], word: '扔掉', meaning: '把不要的東西丟了。', example: '把吃完的果皮＿＿。', img: 'throw-ball.png', options: ['扔掉', '矮小', '陰暗', '全神貫注'] },
      { id: 'v-蒼茫', cloze: true, clozeOptions: ['蒼茫', '清楚', '明亮', '狹小'], word: '蒼茫', meaning: '一望無際、看不清楚的樣子。', example: '傍晚的海上一片＿＿。', img: 'misty-field.png', options: ['蒼茫', '陰暗', '矮小', '淒厲'] },
      { id: 'v-鬱悶', cloze: true, clozeOptions: ['鬱悶', '開心', '愉快', '輕鬆'], word: '鬱悶', meaning: '心裡不舒服、不開心，好像透不過氣。', example: '連下好幾天雨，讓人覺得＿＿。', img: 'hot-room.png', options: ['鬱悶', '疲憊', '狼狽', '蒼茫'] },
      { id: 'v-漫不經心', cloze: true, clozeOptions: ['漫不經心', '專心一意', '全神貫注', '聚精會神'], word: '漫不經心', meaning: '一點也沒留意、毫無在乎。', example: '他＿＿＿＿的寫功課，錯了好多題。', img: 'bored-kid.png', options: ['漫不經心', '全神貫注', '卯足全力', '恍然大悟'] },
      { id: 'v-恍然大悟', cloze: true, clozeOptions: ['恍然大悟', '一頭霧水', '莫名其妙', '百思不解'], word: '恍然大悟', meaning: '忽地一下子全部懂了。', example: '聽了老師的說明，我才＿＿＿＿。', img: 'try-idea.png', options: ['恍然大悟', '心灰意冷', '漫不經心', '全神貫注'] },
      { id: 'v-心灰意冷', cloze: true, clozeOptions: ['心灰意冷', '信心滿滿', '充滿希望', '鬥志高昂'], word: '心灰意冷', meaning: '很失望，什麼都不想做。', example: '一次失敗不要＿＿＿＿，再試一次吧！', img: 'sad-team.png', options: ['心灰意冷', '恍然大悟', '卯足全力', '漫不經心'] }
    ],
    charwords: [
      { id: 'cw-廂', char: '廂', img: 'train-car.png', charMeaning: '像房間一樣的空間。', word: '一廂情願', meaning: '只有自己這樣想，沒問過對方。', example: '他以為大家都喜歡他的畫，其實是＿＿＿＿。', options: ['一廂情願', '雙頰', '包袱巾', '瘡疤'] },
      { id: 'cw-頰', char: '頰', img: 'red-cheeks.png', charMeaning: '臉的兩邊。', word: '雙頰', meaning: '臉的兩邊。', example: '跑完步，她的＿＿紅通通的。', options: ['雙頰', '狼狽為奸', '疲憊不堪', '淒涼'] },
      { id: 'cw-袱', char: '袱', img: 'cloth-bundle.png', charMeaning: '包東西的布。', word: '包袱巾', meaning: '用來包東西的方形布。', example: '阿嬤用＿＿＿包了一盒年糕。', options: ['包袱巾', '海底隧道', '寅吃卯糧', '貫穿'] },
      { id: 'cw-瘡', char: '瘡', img: 'cold-hands.png', charMeaning: '皮膚上的傷。', word: '瘡疤', meaning: '傷口好了以後留下的痕跡。', example: '膝蓋上的＿＿是小時候跌倒留下的。', options: ['瘡疤', '打岔', '欄杆', '柵欄'] },
      { id: 'cw-狽', char: '狽', img: 'messy-rain.png', charMeaning: '傳說中的一種動物。', word: '狼狽為奸', meaning: '壞人互相勾結做壞事。', example: '那兩個小偷＿＿＿＿，一起偷東西。', options: ['狼狽為奸', '矮子', '陰天', '扔球'] },
      { id: 'cw-憊', char: '憊', img: 'tired-kid.png', charMeaning: '非常累。', word: '疲憊不堪', meaning: '累得受不了。', example: '爬了一整天的山，大家＿＿＿＿。', options: ['疲憊不堪', '茫然', '悶熱', '一廂情願'] },
      { id: 'cw-淒', char: '淒', img: 'lonely-night.png', charMeaning: '寒冷、悲傷。', word: '淒涼', meaning: '冷清又讓人難過。', example: '下雨的夜晚，街上顯得很＿＿。', options: ['淒涼', '雙頰', '包袱巾', '瘡疤'] },
      { id: 'cw-隧', char: '隧', img: 'tunnel.png', charMeaning: '地底下的路。', word: '海底隧道', meaning: '從海底下穿過去的路。', example: '這條＿＿＿＿連接兩座島。', options: ['海底隧道', '狼狽為奸', '疲憊不堪', '淒涼'] },
      { id: 'cw-卯', char: '卯', img: 'push-hard.png', charMeaning: '古代記時間的字。', word: '寅吃卯糧', meaning: '錢不夠用，先花掉以後的錢。', example: '他亂花錢，總是＿＿＿＿。', options: ['寅吃卯糧', '貫穿', '打岔', '欄杆'] },
      { id: 'cw-貫', char: '貫', img: 'focus-kid.png', charMeaning: '穿過；連起來。', word: '貫穿', meaning: '從一頭穿到另一頭。', example: '這條大路＿＿整個小鎮。', options: ['貫穿', '柵欄', '矮子', '陰天'] },
      { id: 'cw-岔', char: '岔', img: 'fork-road.png', charMeaning: '分開。', word: '打岔', meaning: '別人說話時插嘴打斷。', example: '別人說話時不要＿＿。', options: ['打岔', '扔球', '茫然', '悶熱'] },
      { id: 'cw-欄', char: '欄', img: 'fence.png', charMeaning: '擋住的架子。', word: '欄杆', meaning: '橋邊或樓梯旁擋著的扶手架子。', example: '站在橋上，不要靠著＿＿往下看。', options: ['欄杆', '一廂情願', '雙頰', '包袱巾'] },
      { id: 'cw-柵', char: '柵', img: 'fence.png', charMeaning: '一根根排成的圍牆。', word: '柵欄', meaning: '用木條或鐵條排成的圍牆。', example: '羊群被關在＿＿裡。', options: ['柵欄', '瘡疤', '狼狽為奸', '疲憊不堪'] },
      { id: 'cw-矮', char: '矮', img: 'short-tall.png', charMeaning: '不高。', word: '矮子', meaning: '個子很矮的人。', example: '故事裡的＿＿很會修鞋。', options: ['矮子', '淒涼', '海底隧道', '寅吃卯糧'] },
      { id: 'cw-陰', char: '陰', img: 'cloudy-sky.png', charMeaning: '沒有陽光。', word: '陰天', meaning: '雲很多、看不到太陽的天氣。', example: '今天是＿＿，好像快下雨了。', options: ['陰天', '貫穿', '打岔', '欄杆'] },
      { id: 'cw-扔', char: '扔', img: 'throw-ball.png', charMeaning: '丟。', word: '扔球', meaning: '把球丟出去。', example: '我們在公園裡＿＿玩。', options: ['扔球', '柵欄', '矮子', '陰天'] },
      { id: 'cw-茫', char: '茫', img: 'misty-field.png', charMeaning: '看不清楚；不知道。', word: '茫然', meaning: '完全不知道怎麼辦的樣子。', example: '他看著題目，一臉＿＿。', options: ['茫然', '扔球', '一廂情願', '雙頰'] },
      { id: 'cw-悶', char: '悶', img: 'hot-room.png', charMeaning: '不通風；不開心。', word: '悶熱', meaning: '又熱又不通風。', example: '颱風來之前，天氣特別＿＿。', options: ['悶熱', '包袱巾', '瘡疤', '狼狽為奸'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-一廂情願', situationImg: 'id-one-sided.png',
        anim: { bg: 'school', a: { kid: ['🧒', 30, 62, 12], cake: ['🎂', 50, 62, 10], friend: ['👦', 74, 62, 12], think: ['💭', 30, 38, 10, 'h'], no: ['🙅', 74, 38, 9, 'h'] },
          s: [['小明以為好朋友最愛吃巧克力蛋糕。', [['in', 'think']]],
            ['他開心的買了一大塊送給朋友。', [['mv', 'cake', [62, 62, 600]]]],
            ['朋友卻說：「我不吃巧克力耶。」', [['in', 'no']]],
            ['只照自己的想法，沒問過對方，就是一廂情願。', [['shake', 'kid']]]] },
        idiom: '一廂情願', char: '廂', meaning: '只照自己的想法，沒有考慮對方願不願意。', example: '你以為大家都想去海邊，這只是你一廂情願的想法。', situation: '小明沒問朋友，就買了朋友不吃的巧克力蛋糕。',
        fill: { options: ['他沒問妹妹，就幫她報名鋼琴課，真是＿＿＿＿。', '他先問大家想吃什麼，再一起決定，一點也不＿＿＿＿。'], clue: '提示：哪一句是只照自己的想法？', explain: '第一句用得對：沒問妹妹就報名。先問大家再決定，剛好相反。' } },
      { id: 'i-狼狽為奸', situationImg: 'id-bad-team.png',
        anim: { bg: 'room', a: { a: ['🦹', 30, 62, 12], b: ['🦹', 54, 62, 12], box: ['💰', 80, 64, 9], cop: ['👮', 86, 40, 11, 'h'] },
          s: [['兩個壞人偷偷商量。', [['bob', 'a'], ['bob', 'b']]],
            ['一個負責把風，一個負責偷錢。', [['mv', 'b', [72, 62, 700]]]],
            ['最後兩個人都被警察抓到了！', [['in', 'cop'], ['shake', 'a'], ['shake', 'b']]],
            ['壞人互相勾結做壞事，就是狼狽為奸。', [['pop', 'cop']]]] },
        idiom: '狼狽為奸', char: '狽', meaning: '壞人互相勾結，一起做壞事。', example: '那兩個騙子狼狽為奸，騙了很多老人的錢。', situation: '兩個壞人一個把風、一個偷錢，最後都被警察抓到。',
        fill: { options: ['這兩個小偷＿＿＿＿，專門偷腳踏車。', '他們兩人一起做志工幫助別人，真是＿＿＿＿。'], clue: '提示：哪一句是壞人一起做壞事？', explain: '第一句用得對：小偷一起做壞事。做志工是好事，不能用這個成語。' } },
      { id: 'i-寅吃卯糧', situationImg: 'id-spend-early.png',
        anim: { bg: 'room', a: { kid: ['🧒', 30, 62, 12], wallet: ['👛', 56, 62, 10], toy: ['🧸', 80, 62, 10, 'h'], cal: ['📅', 56, 34, 10] },
          s: [['小華這個月的零用錢已經花光了。', [['shake', 'wallet']]],
            ['他又想買新玩具，', [['in', 'toy']]],
            ['就先跟媽媽預支下個月的零用錢。', [['wig', 'cal']]],
            ['錢不夠用，先花掉以後的錢，就是寅吃卯糧。', [['shake', 'kid']]]] },
        idiom: '寅吃卯糧', char: '卯', meaning: '錢不夠用，只好先把以後的錢拿來花。', example: '每個月都寅吃卯糧，最後只會越來越缺錢。', situation: '小華零用錢花光了，又先預支下個月的錢買玩具。',
        fill: { options: ['他亂花錢，常常＿＿＿＿，跟爸媽預支零用錢。', '他每個月都存下一半的錢，從不＿＿＿＿。'], clue: '提示：哪一句是先花掉以後的錢？', explain: '第一句用得對：預支以後的零用錢。存錢的人不會寅吃卯糧。' } },
      { id: 'i-如雷貫耳', situationImg: 'id-famous.png',
        anim: { bg: 'school', a: { star: ['🌟', 50, 40, 12], crowd: ['👥', 50, 68, 14], thunder: ['⚡', 24, 24, 10, 'h'], ear: ['👂', 78, 36, 9, 'h'] },
          s: [['學校來了一位有名的作家。', [['bob', 'star']]],
            ['大家都聽過她寫的書，', [['in', 'ear']]],
            ['她的名字就像打雷一樣響亮！', [['in', 'thunder'], ['wig', 'thunder']]],
            ['名氣很大，大家都聽過，就是如雷貫耳。', [['pop', 'star']]]] },
        idiom: '如雷貫耳', char: '貫', meaning: '名氣很大，大家都聽過。', example: '這位科學家的大名如雷貫耳，今天終於見到他了。', situation: '學校來了一位有名的作家，大家都聽過她的名字。',
        fill: { options: ['這位球星的名字＿＿＿＿，沒有人不知道。', '這個人沒什麼人認識，名字真是＿＿＿＿。'], clue: '提示：哪一句是名氣很大？', explain: '第一句用得對：大家都知道這位球星。沒什麼人認識，剛好相反。' } },
      { id: 'i-陽奉陰違', situationImg: 'id-two-faced.png',
        anim: { bg: 'room', a: { mom: ['👩', 26, 58, 12], kid: ['🧒', 60, 64, 12], ok: ['👌', 60, 40, 9], game: ['🎮', 82, 64, 9, 'h'] },
          s: [['媽媽說：「寫完功課才能玩。」', [['bob', 'mom']]],
            ['弟弟說：「好！」', [['in', 'ok']]],
            ['媽媽一出門，他就偷偷玩電動。', [['out', 'mom'], ['in', 'game'], ['wig', 'game']]],
            ['表面上答應，背地裡卻不做，就是陽奉陰違。', [['shake', 'kid']]]] },
        idiom: '陽奉陰違', char: '陰', meaning: '表面上答應會做，背地裡卻不照著做。', example: '老師在時他乖乖打掃，老師一走就偷懶，真是陽奉陰違。', situation: '弟弟答應寫完功課才玩，媽媽一出門就偷玩電動。',
        fill: { options: ['他當面說會改，轉身又犯，簡直是＿＿＿＿。', '他答應的事都說到做到，從不＿＿＿＿。'], clue: '提示：哪一句是表面答應、背地不做？', explain: '第一句用得對：說會改卻又犯。說到做到，剛好相反。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-廂', char: '廂', wrong: '箱', sentence: '我們坐在第三節車廂。', options: ['廂', '箱', '湘'], clue: '這裡說的是火車上一節一節的空間，想一想，哪一個字的外面是「广」？', explain: '要改成「廂」。火車的一節是「車廂」；「箱」是箱子的箱。' },
      { id: 'fx-頰', char: '頰', wrong: '夾', sentence: '她的臉頰上有一個小酒窩。', options: ['頰', '夾', '峽'], clue: '這裡說的是臉的兩邊，想一想，哪一個字的右邊是「頁」？', explain: '要改成「頰」。臉的兩邊是「臉頰」；「夾」是夾子的夾。' },
      { id: 'fx-袱', char: '袱', wrong: '伏', sentence: '他背著一個大包袱出門。', options: ['袱', '伏', '服'], clue: '這裡說的是用布包起來的行李，想一想，哪一個字有衣字旁？', explain: '要改成「袱」。布包是「包袱」；「伏」是埋伏的伏。' },
      { id: 'fx-瘡', char: '瘡', wrong: '倉', sentence: '冬天太冷，手上長了凍瘡。', options: ['瘡', '倉', '創'], clue: '這裡說的是皮膚上的傷，想一想，哪一個字有病字旁？', explain: '要改成「瘡」。皮膚的傷是「瘡」；「倉」是倉庫的倉。' },
      { id: 'fx-憊', char: '憊', wrong: '備', sentence: '比賽結束，選手們都很疲憊。', options: ['憊', '備', '憶'], clue: '這裡是說非常累，想一想，哪一個字的下面是「心」？', explain: '要改成「憊」。很累是「疲憊」；「備」是準備的備。' },
      { id: 'fx-淒', char: '淒', wrong: '妻', sentence: '風聲聽起來好淒厲。', options: ['淒', '妻', '棲'], clue: '這裡是說聲音又尖又悲傷，想一想，哪一個字有三點水？', explain: '要改成「淒」。聲音尖又悲傷是「淒厲」；「妻」是妻子的妻。' },
      { id: 'fx-隧', char: '隧', wrong: '遂', sentence: '這條隧道有兩公里長。', options: ['隧', '遂', '燧'], clue: '這裡說的是穿過山的路，想一想，哪一個字有阜字旁？', explain: '要改成「隧」。穿山的路是「隧道」；「遂」是順遂的遂。' },
      { id: 'fx-貫', char: '貫', wrong: '慣', sentence: '他全神貫注的看著棋盤。', options: ['貫', '慣', '買'], clue: '這裡是說心思完全集中，想一想，哪一個字沒有豎心旁？', explain: '要改成「貫」。集中精神是「全神貫注」；「慣」是習慣的慣。' },
      { id: 'fx-岔', char: '岔', wrong: '盆', sentence: '走到岔路口，我們往右轉。', options: ['岔', '盆', '分'], clue: '這裡說的是分開的路，想一想，哪一個字的下面是「山」？', explain: '要改成「岔」。分開的路是「岔路」；「盆」是臉盆的盆。' },
      { id: 'fx-欄', char: '欄', wrong: '攔', sentence: '請不要爬到欄杆上。', options: ['欄', '攔', '蘭'], clue: '這裡說的是擋著的扶手架子，想一想，哪一個字有木字旁？', explain: '要改成「欄」。扶手架是「欄杆」；「攔」是阻攔的攔。' },
      { id: 'fx-矮', char: '矮', wrong: '委', sentence: '牆邊有一排矮小的樹。', options: ['矮', '委', '萎'], clue: '這裡是說不高，想一想，哪一個字的左邊是「矢」？', explain: '要改成「矮」。不高是「矮」；「委」是委屈的委。' },
      { id: 'fx-陰', char: '陰', wrong: '陽', sentence: '樹蔭下很陰涼。', options: ['陰', '陽', '隱'], clue: '這裡是說沒有陽光照到、很涼爽，想一想，哪一個字的右邊有「云」？', explain: '要改成「陰」。沒陽光的涼爽是「陰涼」；「陽」是太陽的陽。' },
      { id: 'fx-扔', char: '扔', wrong: '仍', sentence: '他把紙團扔進垃圾桶。', options: ['扔', '仍', '奶'], clue: '這裡是說用手丟出去，想一想，哪一個字有提手旁？', explain: '要改成「扔」。丟出去是「扔」；「仍」是仍然的仍。' },
      { id: 'fx-茫', char: '茫', wrong: '忙', sentence: '大霧中，四周一片茫然看不清。', options: ['茫', '忙', '芒'], clue: '這裡是說看不清楚的樣子，想一想，哪一個字有草字頭和三點水？', explain: '要改成「茫」。看不清楚是「茫茫」；「忙」是忙碌的忙。' },
      { id: 'fx-悶', char: '悶', wrong: '問', sentence: '房間沒開窗，好悶。', options: ['悶', '問', '聞'], clue: '這裡是說不通風、不舒服，想一想，哪一個字的門裡是「心」？', explain: '要改成「悶」。不通風是「悶」；「問」是問問題的問。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿子」是用來裝東西、方方的盒子。', sentence: '玩具都收在大＿子裡。', frame: '＿子', options: ['箱', '廂'], answer: '箱', clue: '提示：這個字的上面是竹字頭。', explain: '答案是「箱」；「廂」是車廂的廂。' },
      { id: 's2', meaning: '「＿子」是用來固定紙或衣服的小工具。', sentence: '用＿子把照片固定在線上。', frame: '＿子', options: ['夾', '頰'], answer: '夾', clue: '提示：這個字沒有「頁」。', explain: '答案是「夾」；「頰」是臉頰的頰。' },
      { id: 's3', meaning: '「衣＿」是穿在身上的衣物。', sentence: '我換上乾淨的衣＿。', frame: '衣＿', options: ['服', '袱'], answer: '服', clue: '提示：這個字的左邊是「月」。', explain: '答案是「服」；「袱」是包袱的袱。' },
      { id: 's4', meaning: '「＿庫」是存放東西的大房子。', sentence: '稻米都放在＿庫裡。', frame: '＿庫', options: ['倉', '瘡'], answer: '倉', clue: '提示：這個字沒有病字旁。', explain: '答案是「倉」；「瘡」是凍瘡的瘡。' },
      { id: 's5', meaning: '「準＿」是事先把東西弄好。', sentence: '我準＿好了上學的東西。', frame: '準＿', options: ['備', '憊'], answer: '備', clue: '提示：這個字的下面沒有「心」。', explain: '答案是「備」；「憊」是疲憊的憊。' },
      { id: 's6', meaning: '「＿子」是丈夫的另一半。', sentence: '他和＿子一起去旅行。', frame: '＿子', options: ['妻', '淒'], answer: '妻', clue: '提示：這個字沒有三點水。', explain: '答案是「妻」；「淒」是淒涼的淒。' },
      { id: 's7', meaning: '「習＿」是常常這樣做，變成很自然的事。', sentence: '我有早起的習＿。', frame: '習＿', options: ['慣', '貫'], answer: '慣', clue: '提示：和心有關，左邊是豎心旁。', explain: '答案是「慣」；「貫」是貫穿的貫。' },
      { id: 's8', meaning: '「臉＿」是洗臉用的圓形容器。', sentence: '把水倒進臉＿裡。', frame: '臉＿', options: ['盆', '岔'], answer: '盆', clue: '提示：這個字的下面是「皿」。', explain: '答案是「盆」；「岔」是岔路的岔。' },
      { id: 's9', meaning: '「＿住」是擋著不讓走。', sentence: '警察＿住闖紅燈的車。', frame: '＿住', options: ['攔', '欄'], answer: '攔', clue: '提示：要用手，左邊是提手旁。', explain: '答案是「攔」；「欄」是欄杆的欄。' },
      { id: 's10', meaning: '「＿屈」是心裡覺得不公平、很難過。', sentence: '被誤會的他覺得好＿屈。', frame: '＿屈', options: ['委', '矮'], answer: '委', clue: '提示：這個字沒有「矢」。', explain: '答案是「委」；「矮」是矮小的矮。' },
      { id: 's11', meaning: '「太＿」是白天天上會發光發熱的大火球。', sentence: '早上太＿從東邊升起。', frame: '太＿', options: ['陽', '陰'], answer: '陽', clue: '提示：這個字的右邊是「昜」。', explain: '答案是「陽」；「陰」是陰天的陰。' },
      { id: 's12', meaning: '「＿然」是還是這樣、沒有改變。', sentence: '雨停了，天空＿然很暗。', frame: '＿然', options: ['仍', '扔'], answer: '仍', clue: '提示：這個字的左邊是單人旁。', explain: '答案是「仍」；「扔」是扔掉的扔。' },
      { id: 's13', meaning: '「＿碌」是事情很多，沒有空。', sentence: '爸爸工作很＿碌。', frame: '＿碌', options: ['忙', '茫'], answer: '忙', clue: '提示：和心有關，左邊是豎心旁。', explain: '答案是「忙」；「茫」是茫然的茫。' },
      { id: 's14', meaning: '「＿題」是想知道答案的事。', sentence: '我舉手請教老師一個＿題。', frame: '＿題', options: ['問', '悶'], answer: '問', clue: '提示：這個字的門裡是「口」。', explain: '答案是「問」；「悶」是悶熱的悶。' }
    ],
    listen: [
      { id: 'l1', text: '他把所有的力氣都拿出來，用力往前推。', answer: 0, options: [{ text: '卯足全力', img: 'push-hard.png' }, { text: '全神貫注', img: 'focus-kid.png' }, { text: '漫不經心', img: 'bored-kid.png' }, { text: '心灰意冷', img: 'sad-team.png' }] },
      { id: 'l2', text: '他把心思全部放在拼圖上，旁邊的事都沒注意。', answer: 0, options: [{ text: '全神貫注', img: 'focus-kid.png' }, { text: '漫不經心', img: 'bored-kid.png' }, { text: '恍然大悟', img: 'try-idea.png' }, { text: '卯足全力', img: 'push-hard.png' }] },
      { id: 'l3', text: '聽完說明，我突然一下子全都明白了。', answer: 0, options: [{ text: '恍然大悟', img: 'try-idea.png' }, { text: '心灰意冷', img: 'sad-team.png' }, { text: '漫不經心', img: 'bored-kid.png' }, { text: '疲憊', img: 'tired-kid.png' }] },
      { id: 'l4', text: '失敗了好多次，他很失望，什麼都不想做。', answer: 0, options: [{ text: '心灰意冷', img: 'sad-team.png' }, { text: '恍然大悟', img: 'try-idea.png' }, { text: '全神貫注', img: 'focus-kid.png' }, { text: '扔掉', img: 'throw-ball.png' }] },
      { id: 'l5', text: '他寫功課一點也不專心，錯了好多題。', answer: 0, options: [{ text: '漫不經心', img: 'bored-kid.png' }, { text: '全神貫注', img: 'focus-kid.png' }, { text: '卯足全力', img: 'push-hard.png' }, { text: '狼狽', img: 'messy-rain.png' }] },
      { id: 'l6', text: '火車從山的肚子裡穿過去，四周一片黑。', answer: 0, options: [{ text: '隧道', img: 'tunnel.png' }, { text: '岔路', img: 'fork-road.png' }, { text: '車廂', img: 'train-car.png' }, { text: '欄柵', img: 'fence.png' }] },
      { id: 'l7', text: '跌進泥巴裡，全身髒兮兮，樣子很難堪。', answer: 0, options: [{ text: '狼狽', img: 'messy-rain.png' }, { text: '疲憊', img: 'tired-kid.png' }, { text: '鬱悶', img: 'hot-room.png' }, { text: '矮小', img: 'short-tall.png' }] },
      { id: 'l8', text: '傍晚的海上一望無際，看不清楚遠方。', answer: 0, options: [{ text: '蒼茫', img: 'misty-field.png' }, { text: '陰暗', img: 'cloudy-sky.png' }, { text: '淒厲', img: 'lonely-night.png' }, { text: '矮小', img: 'short-tall.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '一□□', answer: '怎麼樣', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看是什麼樣的東西。',
      /* 短語：疊字量詞＋形容詞＋的＋名詞（句子都是自己寫的） */
      intro: { example: '一朵朵美麗的花', img: 'pr-flower-field.png',
        parts: [{ text: '一朵朵', role: '一□□' }, { text: '美麗', role: '怎麼樣' }, { text: '的' }, { text: '花', role: '什麼東西' }],
        explain: '先用「一□□」說出有很多，再說出東西的樣子，加上「的」，最後說是什麼東西。' },
      pick: [
        { id: 'ph1', img: 'pr-waves.png', before: '一層層', noun: '浪花', ask: '一層層什麼樣的浪花', look: '再看看圖片，浪花是什麼顏色？', options: ['雪白', '漆黑', '乾枯', '枯黃'], clue: '提示：像奶油一樣的顏色，拍在岸上。', explain: '答案是「雪白」，完整的短語是「一層層雪白的浪花」。' },
        { id: 'ph2', img: 'pr-rice-field.png', before: '一片片', noun: '稻田', ask: '一片片什麼樣的稻田', look: '再看看圖片，稻子熟了嗎？', options: ['金黃', '灰暗', '漆黑', '枯萎'], clue: '提示：秋天收成時，顏色像熟透的玉米。', explain: '答案是「金黃」，完整的短語是「一片片金黃的稻田」。' },
        { id: 'ph3', img: 'pr-lanterns.png', before: '一盞盞', noun: '燈籠', ask: '一盞盞什麼樣的燈籠', look: '再看看圖片，燈籠亮不亮？', options: ['明亮', '暗淡', '破舊', '漆黑'], clue: '提示：把整條街照得清清楚楚。', explain: '答案是「明亮」，完整的短語是「一盞盞明亮的燈籠」。' },
        { id: 'ph4', img: 'pr-mountains.png', before: '一座座', noun: '高山', ask: '一座座什麼樣的高山', look: '再看看圖片，山有多高？', options: ['雄偉', '矮小', '平坦', '低矮'], clue: '提示：抬頭看，山頂都在雲裡。', explain: '答案是「雄偉」，完整的短語是「一座座雄偉的高山」。' },
        { id: 'ph5', img: 'pr-stars.png', before: '一顆顆', noun: '星星', ask: '一顆顆什麼樣的星星', look: '再看看圖片，星星亮不亮？', options: ['閃亮', '黯淡', '灰暗', '模糊'], clue: '提示：在夜空中一眨一眨的發光。', explain: '答案是「閃亮」，完整的短語是「一顆顆閃亮的星星」。' },
        { id: 'ph6', img: 'pr-tangerines.png', before: '一籃籃', noun: '橘子', ask: '一籃籃什麼樣的橘子', look: '再看看圖片，橘子是什麼顏色？', options: ['鮮豔', '腐爛', '乾癟', '灰暗'], clue: '提示：橘紅色的，看了就想吃。', explain: '答案是「鮮豔」，完整的短語是「一籃籃鮮豔的橘子」。' }
      ],
      say: [],
      words: [
        { word: '漫不經心', meaning: '一點也沒留意、毫無在乎。', img: 'bored-kid.png' },
        { word: '恍然大悟', meaning: '忽地一下子全部懂了。', img: 'try-idea.png' },
        { word: '心灰意冷', meaning: '很失望，什麼都不想做。', img: 'sad-team.png' },
        { word: '全神貫注', meaning: '把心思和精力百分之百集中在某件事上。', img: 'focus-kid.png' }
      ],
      choose: [
        { id: 'pw1', word: '漫不經心', options: ['他漫不經心的過馬路，差點被車撞到。', '他漫不經心的檢查每一題，一題都沒錯。'], clue: '提示：想一想，「漫不經心」是不留意，還是很仔細？', explain: '第一句用得對：不留意差點出事。仔細檢查每一題，剛好相反。' },
        { id: 'pw2', word: '恍然大悟', options: ['看到謎底，大家才恍然大悟。', '他想了一整天，還是恍然大悟，完全不懂。'], clue: '提示：想一想，「恍然大悟」是突然明白，還是一直不懂？', explain: '第一句用得對：看到謎底突然明白。完全不懂，剛好相反。' },
        { id: 'pw3', word: '心灰意冷', options: ['被拒絕好幾次，他有點心灰意冷。', '他拿到冠軍，心灰意冷的笑了。'], clue: '提示：想一想，「心灰意冷」是很失望，還是很開心？', explain: '第一句用得對：被拒絕很失望。拿冠軍是開心，剛好相反。' },
        { id: 'pw4', word: '全神貫注', options: ['外科醫生全神貫注的動手術。', '他全神貫注的東張西望，一點也不專心。'], clue: '提示：想一想，「全神貫注」是很專心，還是不專心？', explain: '第一句用得對：醫生很專心。東張西望不專心，剛好相反。' }
      ],
      make: [
        { id: 'pm1', word: '漫不經心', clue: '提示：想想看，不專心做事會發生什麼事？', model: '他漫不經心的倒水，把水灑了一地。' },
        { id: 'pm2', word: '恍然大悟', clue: '提示：想想看，什麼時候你突然想通了？', model: '看到媽媽的笑容，我才恍然大悟今天是她的生日。' },
        { id: 'pm3', word: '心灰意冷', clue: '提示：想想看，什麼事會讓人很失望？', model: '練習很久還是失敗，他差點心灰意冷。' },
        { id: 'pm4', word: '全神貫注', clue: '提示：想想看，你做什麼事時最專心？', model: '我全神貫注的拼著一千片的拼圖。' }
      ]
    },
    pattern: [
      { key: 'meijing', id: 'mj', title: '沒想到……竟然……', img: 'meijing.png',
        meaning: '用「沒想到」、「竟然」，說出讓人意外、想不到的結果。',
        examples: ['沒想到這隻小貓竟然會開門。'],
        match: [
          { id: 'pt-mj-m1', img: 'pt-empty-train.png', front: '沒想到下班時間，', options: ['車廂裡竟然沒有人。', '車廂裡很多人。', '火車開走了。'], clue: '提示：看看圖片，車廂裡有幾個人？這是意外的事嗎？', explain: '答案是「車廂裡竟然沒有人」：下班時間通常很擠，結果卻沒人，讓人意外。' },
          { id: 'pt-mj-m2', img: 'pt-small-hero.png', front: '沒想到這個小女孩，', options: ['竟然救了一整家人。', '正在床上睡覺。', '正在吃一碗飯。'], clue: '提示：看看圖片，小女孩做了什麼了不起的事？', explain: '答案是「竟然救了一整家人」：小女孩做了大事，讓人意外。' },
          { id: 'pt-mj-m3', img: 'pt-old-runner.png', front: '沒想到八十歲的爺爺，', options: ['竟然跑完了馬拉松。', '每天在公園坐著。', '戴著老花眼鏡。'], clue: '提示：看看圖片，爺爺做了什麼？', explain: '答案是「竟然跑完了馬拉松」：年紀很大卻跑完全程，讓人意外。' }
        ],
        conj: [
          { id: 'pt-mj-c1', full: '沒想到這次考試，他竟然考了滿分。', img: 'pt-full-score.png', sentence: '＿＿＿這次考試，他＿＿考了滿分。', options: ['沒想到……竟然……', '不僅……也……', '任憑……都……'], clue: '提示：說出讓人意外的結果。數數看有幾個空格。', explain: '答案是「沒想到……竟然……」：沒想到這次考試，他竟然考了滿分。' },
          { id: 'pt-mj-c2', full: '沒想到外表普通的盒子，裡面竟然是寶石。', img: 'pt-gem-box.png', sentence: '＿＿＿外表普通的盒子，裡面＿＿是寶石。', options: ['沒想到……竟然……', '不僅……也……', '任憑……都……'], clue: '提示：說出讓人意外的結果。數數看有幾個空格。', explain: '答案是「沒想到……竟然……」：沒想到外表普通的盒子，裡面竟然是寶石。' }
        ],
        half: [
          { id: 'pt-mj-h1', front: '沒想到這隻小狗，', clue: '提示：小狗做了什麼讓人意外的事？記得要說「竟然」。', model: '竟然會自己開冰箱。' },
          { id: 'pt-mj-h2', front: '沒想到平常很安靜的他，', clue: '提示：他做了什麼讓人意外的事？記得要說「竟然」。', model: '竟然在臺上大聲唱歌。' }
        ],
        whole: [
          { id: 'pt-mj-w1', clue: '提示：用「沒想到」、「竟然」說出讓你意外的事。想想看：最近有什麼事讓你嚇一跳？', model: '沒想到下雪了，竟然是我人生第一次看到雪。' }
        ] },
      { key: 'bujinye', id: 'bj', title: '不僅……也……', img: 'bujinye.png',
        meaning: '用「不僅」、「也」，先說一件事，再說還有另一件事。',
        examples: ['運動不僅讓身體健康，也讓心情變好。'],
        match: [
          { id: 'pt-bj-m1', img: 'pt-kind-sister.png', front: '姊姊不僅會照顧弟弟，', options: ['也會幫媽媽做家事。', '卻不會照顧弟弟。', '所以很懶。'], clue: '提示：看看圖片，姊姊還會做什麼？', explain: '答案是「也會幫媽媽做家事」：照顧弟弟之外，還會做家事。' },
          { id: 'pt-bj-m2', img: 'pt-gift-tangerines.png', front: '這些水果不僅很甜，', options: ['也代表了滿滿的愛。', '卻酸得吃不下去。', '所以都不能吃。'], clue: '提示：看看圖片，水果除了好吃，還有什麼意義？', explain: '答案是「也代表了滿滿的愛」：除了甜，還有心意。' },
          { id: 'pt-bj-m3', img: 'pt-reading.png', front: '讀書不僅能增加知識，', options: ['也能讓人更快樂。', '卻沒有用。', '所以很無聊。'], clue: '提示：看看圖片，讀書的人表情怎麼樣？', explain: '答案是「也能讓人更快樂」：增加知識之外，還能快樂。' }
        ],
        conj: [
          { id: 'pt-bj-c1', full: '他不僅很會畫畫，也很會唱歌。', img: 'pt-draw-sing.png', sentence: '他＿＿很會畫畫，＿很會唱歌。', options: ['不僅……也……', '沒想到……竟然……', '任憑……都……'], clue: '提示：先說一件事，再說還有另一件事。數數看有幾個空格。', explain: '答案是「不僅……也……」：他不僅很會畫畫，也很會唱歌。' },
          { id: 'pt-bj-c2', full: '這座公園不僅很大，也很乾淨。', img: 'pt-park-people.png', sentence: '這座公園＿＿很大，＿很乾淨。', options: ['不僅……也……', '沒想到……竟然……', '任憑……都……'], clue: '提示：先說一件事，再說還有另一件事。數數看有幾個空格。', explain: '答案是「不僅……也……」：這座公園不僅很大，也很乾淨。' }
        ],
        half: [
          { id: 'pt-bj-h1', front: '多喝水不僅對身體好，', clue: '提示：多喝水還有什麼好處？記得要說「也」。', model: '也能讓皮膚變好。' },
          { id: 'pt-bj-h2', front: '我的好朋友不僅很幽默，', clue: '提示：他還有什麼優點？記得要說「也」。', model: '也很樂於助人。' }
        ],
        whole: [
          { id: 'pt-bj-w1', clue: '提示：用「不僅」、「也」先說一件事，再說另一件事。想想看：你家附近有什麼好地方？', model: '我家附近的圖書館不僅書很多，也有舒服的座位。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'sense', name: '摹寫', meaning: '把看到、聽到、聞到、吃到、摸到的感覺，仔細的寫出來，讓人好像也感受到。', example: '課文寫木鞋踩地的聲音、火車的喊聲，也寫鮮豔的水果顏色，讓人好像聽到、看到一樣。',
          show: { sentence: '鮮橘色的果實在灰色的天空下飛過。', mark: ['鮮橘色', '灰色'] },
          yesno: [
            { id: 'rh-se-y1', sentence: '火車轟隆轟隆的開過鐵橋。', answer: true, mark: ['轟隆轟隆'], clue: '提示：這句話有沒有寫出聽到的聲音？', explain: '是摹寫：寫出火車的聲音。' },
            { id: 'rh-se-y2', sentence: '火車開過鐵橋。', answer: false, clue: '提示：這句話有沒有寫出看到、聽到的感覺？', explain: '不是摹寫：這句話只是說火車開過。' }
          ],
          pick: [
            { id: 'rh-se-p1', mark: ['喀啦喀啦'], options: ['木鞋踩在地上喀啦喀啦響。', '他穿著木鞋。'], clue: '提示：哪一句寫出了聽到的聲音？', explain: '「喀啦喀啦」是摹寫：寫出聽到的聲音。' },
            { id: 'rh-se-p2', mark: ['紅通通'], options: ['她的臉頰凍得紅通通。', '她站在窗邊。'], clue: '提示：哪一句寫出了看到的顏色？', explain: '「紅通通」是摹寫：寫出看到的顏色。' },
            { id: 'rh-se-p3', mark: ['刺骨'], options: ['刺骨的寒風吹進車廂。', '窗戶打開了。', '車上有乘客。'], clue: '提示：哪一句寫出了身體感覺到的冷？', explain: '「刺骨」是摹寫：寫出皮膚感覺到的冷。' },
            { id: 'rh-se-p4', mark: ['濃濃的黑煙'], options: ['濃濃的黑煙湧進車窗。', '火車進了山洞。', '他關上窗。'], clue: '提示：哪一句寫出了看到的樣子？', explain: '「濃濃的黑煙」是摹寫：寫出看到的樣子。' },
            { id: 'rh-se-p5', mark: ['酸甜'], options: ['橘子吃起來酸甜多汁。', '我買了水果。', '袋子放在桌上。', '它是圓形的。'], clue: '提示：哪一句寫出了吃到的味道？', explain: '「酸甜」是摹寫：寫出吃到的味道。' },
            { id: 'rh-se-p6', mark: ['嗚—嗚—'], options: ['火車嗚—嗚—的鳴笛。', '火車要開了。', '月臺上有人。', '我買了車票。'], clue: '提示：哪一句寫出了聽到的聲音？', explain: '「嗚—嗚—」是摹寫：寫出聽到的聲音。' }
          ] },
        { key: 'personify', name: '擬人', meaning: '把東西或動物當成人來寫，讓它們會說話、會笑、會做人做的事。', example: '課文說舊圍巾有氣無力的掛著、火車發出喊聲，把東西寫得像人一樣有精神、會叫。',
          show: { sentence: '路燈睜開眼睛，看著回家的人。', mark: ['睜開眼睛'] },
          yesno: [
            { id: 'rh-pe-y1', sentence: '老舊的火車喘著氣爬上山坡。', answer: true, mark: ['喘著氣'], clue: '提示：這句話有沒有把火車寫得像人一樣會喘氣？', explain: '是擬人：火車像人一樣會喘氣。' },
            { id: 'rh-pe-y2', sentence: '火車開上山坡。', answer: false, clue: '提示：這句話裡的火車，有沒有做人做的事？', explain: '不是擬人：這句話只是說火車上山。' }
          ],
          pick: [
            { id: 'rh-pe-p1', mark: ['打了個哈欠'], options: ['窗外的天空打了個哈欠。', '窗外天快黑了。'], clue: '提示：哪一句的天空像人一樣會打哈欠？', explain: '「天空打了個哈欠」是擬人。' },
            { id: 'rh-pe-p2', mark: ['躲進'], options: ['太陽害羞的躲進雲裡。', '太陽被雲遮住。'], clue: '提示：哪一句的太陽像人一樣會害羞？', explain: '「太陽害羞的躲進雲裡」是擬人。' },
            { id: 'rh-pe-p3', mark: ['向我揮手'], options: ['路邊的小樹向我揮手。', '路邊有小樹。', '風吹過來。'], clue: '提示：哪一句的小樹像人一樣會揮手？', explain: '「小樹向我揮手」是擬人。' },
            { id: 'rh-pe-p4', mark: ['無精打采'], options: ['舊書包無精打采的掛在椅背上。', '書包掛在椅背上。', '書包是藍色的。'], clue: '提示：哪一句的書包像人一樣沒精神？', explain: '「書包無精打采」是擬人。' },
            { id: 'rh-pe-p5', mark: ['大聲歡呼'], options: ['雪花在空中大聲歡呼。', '天空下雪了。', '雪是白的。', '地上積雪。'], clue: '提示：哪一句的雪花像人一樣會歡呼？', explain: '「雪花大聲歡呼」是擬人。' },
            { id: 'rh-pe-p6', mark: ['唱著歌'], options: ['小溪一路唱著歌流向大海。', '小溪流向大海。', '溪水很清。', '河邊有石頭。'], clue: '提示：哪一句的小溪像人一樣會唱歌？', explain: '「小溪唱著歌」是擬人。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '寒風呼呼的吹過月臺。', answer: '摹寫', mark: ['呼呼'], clue: '提示：這句話有沒有寫出聽到的聲音？', explain: '答案是「摹寫」：寫出風的聲音。' },
        { id: 'rh2', sentence: '天空灰濛濛的，好像要下雪了。', answer: '摹寫', mark: ['灰濛濛'], clue: '提示：這句話有沒有寫出看到的顏色？', explain: '答案是「摹寫」：寫出看到的顏色。' },
        { id: 'rh3', sentence: '老鬧鐘每天準時叫我起床。', answer: '擬人', mark: ['叫我起床'], clue: '提示：這句話有沒有把鬧鐘寫得像人？', explain: '答案是「擬人」：鬧鐘像人一樣會叫人。' },
        { id: 'rh4', sentence: '月亮偷偷的從窗外看著我。', answer: '擬人', mark: ['偷偷的'], clue: '提示：這句話的月亮有沒有像人一樣的動作？', explain: '答案是「擬人」：月亮像人一樣會偷看。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L12 = d; }
})(this);
