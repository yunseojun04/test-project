const recipes = [
{
    id:1,
    name:"오므라이스",
    difficulty:"쉬움",
    time:20,
    image:"images/omelette.jpg",
    ingredients:["계란","양파","당근","밥","케첩"],
    nutrition:{
        protein:22,
        carb:58,
        fat:13,
        kcal:480
    },
    steps:[
        "양파와 당근을 잘게 썬다.",
        "채소를 볶는다.",
        "밥과 케첩을 넣고 볶는다.",
        "계란을 부쳐 밥 위에 올린다."
    ]
},

{
    id:2,
    name:"김치볶음밥",
    difficulty:"쉬움",
    time:15,
    image:"images/kimchi.jpg",
    ingredients:["김치","밥","계란","대파"],
    nutrition:{
        protein:18,
        carb:65,
        fat:15,
        kcal:520
    },
    steps:[
        "김치를 볶는다.",
        "밥을 넣고 볶는다.",
        "계란후라이를 올린다."
    ]
},

{
    id:3,
    name:"카레",
    difficulty:"쉬움",
    time:30,
    image:"images/curry.jpg",
    ingredients:["감자","양파","당근","카레","돼지고기"],
    nutrition:{
        protein:24,
        carb:70,
        fat:16,
        kcal:620
    },
    steps:[
        "채소를 썬다.",
        "고기를 볶는다.",
        "채소를 넣고 익힌다.",
        "카레를 넣고 끓인다."
    ]
},

{
    id:4,
    name:"닭갈비",
    difficulty:"보통",
    time:35,
    image:"images/chicken.jpg",
    ingredients:["닭고기","양파","고추장","감자","양배추"],
    nutrition:{
        protein:39,
        carb:35,
        fat:17,
        kcal:560
    },
    steps:[
        "닭을 볶는다.",
        "양념을 넣는다.",
        "채소를 넣고 볶는다."
    ]
},

{
    id:5,
    name:"불고기",
    difficulty:"보통",
    time:30,
    image:"images/bulgogi.jpg",
    ingredients:["소고기","양파","간장","버섯"],
    nutrition:{
        protein:36,
        carb:22,
        fat:20,
        kcal:510
    },
    steps:[
        "고기를 양념한다.",
        "채소와 함께 볶는다."
    ]
},

{
    id:6,
    name:"비빔밥",
    difficulty:"보통",
    time:25,
    image:"images/bibimbap.jpg",
    ingredients:["밥","계란","시금치","당근","고추장"],
    nutrition:{
        protein:21,
        carb:64,
        fat:12,
        kcal:520
    },
    steps:[
        "나물을 준비한다.",
        "밥 위에 올린다.",
        "고추장을 넣고 비빈다."
    ]
},

{
    id:7,
    name:"된장찌개",
    difficulty:"쉬움",
    time:25,
    image:"images/doenjang.jpg",
    ingredients:["된장","두부","애호박","양파"],
    nutrition:{
        protein:19,
        carb:18,
        fat:9,
        kcal:260
    },
    steps:[
        "육수를 끓인다.",
        "된장을 푼다.",
        "채소와 두부를 넣는다."
    ]
},

{
    id:8,
    name:"순두부찌개",
    difficulty:"보통",
    time:25,
    image:"images/softtofu.jpg",
    ingredients:["순두부","계란","고춧가루","대파"],
    nutrition:{
        protein:24,
        carb:14,
        fat:14,
        kcal:310
    },
    steps:[
        "양념을 볶는다.",
        "물을 붓고 끓인다.",
        "순두부와 계란을 넣는다."
    ]
},

{
    id:9,
    name:"토마토 파스타",
    difficulty:"보통",
    time:25,
    image:"images/pasta.jpg",
    ingredients:["파스타","토마토","양파","마늘"],
    nutrition:{
        protein:17,
        carb:73,
        fat:11,
        kcal:540
    },
    steps:[
        "면을 삶는다.",
        "소스를 만든다.",
        "면과 함께 볶는다."
    ]
},

{
    id:10,
    name:"크림 리조또",
    difficulty:"어려움",
    time:45,
    image:"images/risotto.jpg",
    ingredients:["쌀","우유","양파","버섯","치즈"],
    nutrition:{
        protein:18,
        carb:62,
        fat:24,
        kcal:610
    },
    steps:[
        "양파를 볶는다.",
        "쌀을 볶는다.",
        "우유를 조금씩 넣는다.",
        "치즈를 넣는다."
    ]
},

{
    id:11,
    name:"스테이크",
    difficulty:"어려움",
    time:40,
    image:"images/steak.jpg",
    ingredients:["소고기","버터","마늘","후추"],
    nutrition:{
        protein:45,
        carb:4,
        fat:28,
        kcal:560
    },
    steps:[
        "고기를 시즈닝한다.",
        "팬에 굽는다.",
        "버터를 끼얹는다."
    ]
},

{
    id:12,
    name:"닭가슴살 샐러드",
    difficulty:"쉬움",
    time:15,
    image:"images/salad.jpg",
    ingredients:["닭가슴살","양상추","토마토","오이"],
    nutrition:{
        protein:38,
        carb:12,
        fat:8,
        kcal:290
    },
    steps:[
        "채소를 씻는다.",
        "닭가슴살을 굽는다.",
        "드레싱과 함께 섞는다."
    ]
},

{
    id:13,
    name:"볶음우동",
    difficulty:"보통",
    time:25,
    image:"images/udon.jpg",
    ingredients:["우동면","양배추","양파","간장"],
    nutrition:{
        protein:15,
        carb:68,
        fat:12,
        kcal:510
    },
    steps:[
        "채소를 볶는다.",
        "면을 넣는다.",
        "양념과 함께 볶는다."
    ]
},

{
    id:14,
    name:"감바스",
    difficulty:"어려움",
    time:25,
    image:"images/gambas.jpg",
    ingredients:["새우","마늘","올리브오일","바게트"],
    nutrition:{
        protein:29,
        carb:20,
        fat:22,
        kcal:430
    },
    steps:[
        "마늘을 볶는다.",
        "새우를 익힌다.",
        "바게트와 함께 먹는다."
    ]
},

{
    id:15,
    name:"계란말이",
    difficulty:"쉬움",
    time:10,
    image:"images/eggroll.jpg",
    ingredients:["계란","당근","대파"],
    nutrition:{
        protein:17,
        carb:6,
        fat:12,
        kcal:210
    },
    steps:[
        "계란을 푼다.",
        "채소를 넣는다.",
        "돌돌 말아 익힌다."
    ]
}
];