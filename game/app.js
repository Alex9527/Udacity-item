/*
 * 创建一个包含所有卡片的数组



/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */


//洗牌函数来自于 http:stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// 重置卡牌
$('.restart').on('click',function() {
        var cardArray = [
        "fa-diamond","fa-diamond",
        "fa-paper-plane-o","fa-paper-plane-o",
        "fa-anchor","fa-anchor",
        "fa-bolt","fa-bolt",
        "fa-cube","fa-cube",
        "fa-leaf","fa-leaf",
        "fa-bicycle","fa-bicycle",
        "fa-bomb","fa-bomb"
        ];
        var newCardArray = shuffle(cardArray);   //洗牌
		$('.deck li').removeClass('open show match');  
    
        //将pic的class名分配给各个卡片
		$('.deck').find('i').each(function() {           
            var array1 = newCardArray.shift() //删除第一个元素数组并返回值
            $(this).removeClass().addClass('fa '+array1);
        })

        $('.moves').text(0);//重置计数器
        addStsrs()  //重置星级
    })

//  * 设置一张卡片的事件监听器。 如果该卡片被点击：
//  *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
//  *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
//  *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
//  *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
//  *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
//  *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
//  *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 

//翻牌函数
const turnOn = function(pic) {
    pic.addClass('open show')
    return pic.children().attr('class');
}
//传入翻牌数组信息
let openArray = [];
const creatOpenArray =function(card){    
    openArray.push(card);
    return openArray;
} 
// 比较数组，通过数组结果判断所有卡牌的状态，根据特定的class名进行更新
const compare = function(a) {
    if (a.length === 1) {
             return
    }   else if (a.length === 2 && a[0] === a[1]) {
            a.length = 0;
            $("li[class ~= 'open']").removeClass('open show').addClass('match')
            return true;
    }   else if (a.length === 2 && a[0] !== a[1]) {
            a.length = 0;
            $("li[class ~= 'open']").removeClass('open show')
            return false;
    }   else {
            a.length = 0;
            $("li[class ~= 'open']").removeClass('open show match')
    }
}
//增加计步器
var addsteps = function() {
    a = parseInt($('.moves').text())
    a++
    $('.moves').text(a)  
}
//删减星级
function deleteStsrs() {
    $('.stars li:last').remove();
}
//增加星级

function addStsrs() {
    let $li = $('<li><i class="fa fa-star"></i></li>')
    let num = $('.stars li').length;
    if(num === 3) { 
        return
    } else if (num === 2) {
        $($li).insertAfter('.stars li:last')
    } else if (num === 1) {
        $($li).insertAfter('.stars li:last')
        $($li).insertAfter('.stars li:last')
    }
    
}


//根据计步器判断星级
function starsLevel() {
    let a = parseInt($('.moves').text())
    if(a===30) {
        deleteStsrs();
    }
    if(a===50 ) {
        deleteStsrs();
    } 
}

//匹配完成后弹出窗口
// function congratulation() {
//     let match = $(".card[class~='match']");
//     console.log(match.length)
//     if (match.length  === 14) {
//         alert('123');
//     }
    

// }


//仅对closecard卡牌监听
$('.deck').on('click',"li[class='card']",function() {
    turnOn($(this));                    
    creatOpenArray(turnOn($(this)));
    setTimeout('compare(openArray)',500);      //为了视觉上有打开的效果不得不设置延迟，否则第二张牌翻错，打开和关闭瞬间发生，根本看不见打开的是什么牌。
    addsteps();
    starsLevel()
    

    
})











