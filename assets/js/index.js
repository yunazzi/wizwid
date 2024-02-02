gsap.to('.sc-visual',{
    scrollTrigger:{
        trigger:'.sc-visual',
        start:'0% 0%',
        end:'100% 0%',
        scrub:1,
    },
    opacity:0.2
})


//header와 main-content 스크롤이벤트

let lastScrollTop = 0;
//window.scroll위에 있어야 초기값이 0으로 잡히는거지, 안에 있으면 스크롤 할떄마다 0이 되어버림
// 그래서 위에있어야함

$(window).scroll(function(){

    const curr=$(this).scrollTop();
    const contentOffset = $('.content-wrapper').offset().top;

    if(curr > 30){
        $('.header').addClass('fix');
    }else{
        $('.header').removeClass('fix');
    }
    if (curr >= contentOffset-45) {
        $('.header').addClass('hide')
    } else {
        $('.header').removeClass('hide')
    }

    if (curr > contentOffset) {

        if (curr > lastScrollTop) {
            //둘다 참 둘다 없어야됨
            $('.header,.main-content').removeClass('down')
        } else {
            $('.header,.main-content').addClass('down')
        }
    } else {
        $('.header').removeClass('down')
    }


    //nav-fix
    if(curr > lastScrollTop){
        $('.nav-bar').removeClass('show')
    }else{
        $('.nav-bar').addClass('show')
    }

    //go-top
    if(curr<=30){
        $('.btn-gotop').css({opacity : 0})
    }else if(curr > lastScrollTop){
        $('.btn-gotop').css({opacity : 1})
        $('.btn-gotop').removeClass('show')
    }else{
        $('.btn-gotop').addClass('show')
    }

    lastScrollTop = curr;
})
$('.btn-gotop').click(function(){
    window.scrollTo({top:0,behavior:'smooth'})
})


var swiper = new Swiper('.main-slide',{
    autoplay:{
        delay:3000,
        disalbeOnInteraction:false
    },
    pagination:{
        el:'.pagination',
        type: 'progressbar'
    },
    loop:true
})

var swiper2 = new Swiper('.new-product-slide',{
    slidesPerView:'auto',
    spaceBetween:5,
    freeMode:true,
    freeModeSticky:false
})

var swiper3 = new Swiper('.benefit-slide',{
    autoplay:{
        delay:3000,
        disableOnInteraction: false
    },
    pagination:{
        el:'.pagination',
        type: 'progressbar'
    },
    loop:true
})

var swiper4 = new Swiper('.wish-slide',{
    slidesPerView:'auto',
    spaceBetween:5
})

var swiper5 = new Swiper('.lookbook-slide',{
    slidesPerView:'auto',
    autoplay:{
        delay:3000,
        disableOnInteraction: false
    },
    loop:true
})

var swiper6 = new Swiper('.keyword-slide',{
    slidesPerView:'auto',
    spaceBetween:15,
    pagination:{
        el:'.pagination',
        type: 'progressbar',
        clickable: true
    }
})
//loop가 되기 때문에 first-child를 잡으면 안됨 -> first-child가 슬라이드 될때마다 바뀜

var swiper7 = new Swiper('.flash-slide',{
    slidesPerView:'auto',
    spaceBetween:5,
})

$('.area2 .btn-refresh').click(function(){
    $(this).css({transition:'all 1s ease 0s',transform:'rotate(360deg)'})
})

var swiper8 = new Swiper('.area3-slide',{
    slidesPerView:'auto'
})

$('.addr-area strong').click(function(){

    if ($('.addr-area').hasClass('on')) {
        $('.addr-area').removeClass('on')
        $('.info-area').removeClass('on')
    } else {
        $('.addr-area').addClass('on')
        $('.info-area').addClass('on')
    }
})


var brand1 = new Swiper('.sc-brand .brand-tab.swiper',{
    slidesPerView:'auto',
    spaceBetween:10,
})
var brand2 = new Swiper('.sc-brand .area1.swiper',{
on:{
    "slideChange":()=>{
        $('.sc-brand .brand-tab .swiper-slide').eq(brand2.realIndex).addClass('on').siblings().removeClass('on')
        brand1.slideTo(brand2.realIndex)
    }
}
})
$('.sc-brand .brand-tab .swiper-slide').click(function(){
    $(this).addClass('on').siblings().removeClass('on')
    brand2.slideTo($(this).index())
})


// like 이미지 변경

const img = ['https://mb.wizwid.com/resources/images/common/ico_like_01.svg','https://mb.wizwid.com/resources/images/common/ico_like_02.svg']
let currIndex = 0;

$('.like').click(function(){
    if ($(this).hasClass('change')) {
        $(this).removeClass('change')
    } else {
        $(this).addClass('change')
    }
})


var edit1 = new Swiper('.sc-editorial .editorial-tab',{
    slidesPerView:'auto',
    spaceBetween:30,
})
var edit2 = new Swiper('.sc-editorial .editorial-area',{
    on:{
        "slideChange":()=>{
            $('.sc-editorial .editorial-tab .swiper-slide').eq(edit2.realIndex).addClass('on').siblings().removeClass('on')
            edit1.slideTo(edit2.realIndex)
        }
    }
})
$('.sc-editorial .editorial-tab .swiper-slide').click(function(){
    $(this).addClass('on').siblings().removeClass('on')
    edit2.slideTo($(this).index())
})




//디데이 계산하기

function diffDay(set,frame) {
    setInterval(() => {
        const setTime = new Date(set);
        const todayTime = new Date();
        const diff = setTime - todayTime;
        const diffDay = String(Math.floor(diff / (1000*60*60*24)));
        const diffHour =String( Math.floor((diff / (1000*60*60)) % 24)).padStart(2,"0");
        const diffMin = String(Math.floor((diff / (1000*60)) % 60)).padStart(2,"0");
        const diffSec = String(Math.floor(diff / 1000 % 60)).padStart(2,"0");
        $(frame).html(`${diffHour}시간 ${diffMin}분 ${diffSec}초`);
    }, 1000);
}

    $('.sc-flash .time').each(function(){ 
        diffDay($(this).data('set'),$(this))
    }) 




//json 데이터 처리

    fetch('./assets/data/product.json')
    .then((res)=>res.json())
    .then(json=>{
        // console.log(json); 객체
        data=json.items;//배열

        console.log(data);

        let html=``;

        data.forEach(element => {
            html+=`<li class="swiper-slide">
            <a href=""></a>
            <div class="img-area">
                <img src="${element.thumb}" alt>
                <button class="like"> <span class="blind">찜하기</span> </button>
            </div>
            <div class="product-area">
                <div class="brand">${element.brand}</div>
                <div class="p-name">${element.name}</div>
                <div class="price">
                    <div class="price-curr">${numFormat(element.price.curr)}</div>
                    <div class="price-sale">${element.price.sale}%</div>
                </div>
            </div>
        </li>`;
        });//반복문끝

        $('#wishDataList').html(html)
    })

    function numFormat(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    }