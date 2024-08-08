let boxes = $(".box");
let turn = true;
let count = 0;
let win1 = 0;
let win2 = 0;
let tied=0;
const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
$(document).ready(function() {
    $('#heading').hide();
    $('#play').click(function() {
        first = $('#first').val();
        second = $('#second').val();
        if (first === second) {
            alert("Please enter different names for both players");
        } else if (first !== "" && second !== "") {
            $('#open').fadeOut(1000);
            $('#heading').text(`${first}'s turn [O]`);
            $('#win_count').text(`${first}: ${win1}   vs   ${second}: ${win2}  |   Tied:${tied}`);
            $('.container').fadeIn(1500);
            $('#heading').fadeIn(1500);
        } else {
            alert("Please enter names for both players");
        }
    });
    function winner() {
        let c = 0;
        for (let pattern of win) {
            let p1 = boxes[pattern[0]].innerText;
            let p2 = boxes[pattern[1]].innerText;
            let p3 = boxes[pattern[2]].innerText;

            if (p1 !== "" && p2 !== "" && p3 !== "") {
                if (p1 === p2 && p2 === p3) {
                    $('#heading').css('background-color', '#AA4A44');
                    $('#heading').css('color', '#D8D4D5')
                    $('.box').each(function() {
                        $(this).prop('disabled', true);
                    });
                    if (p1 === "O") {
                        $('#heading').text(`WINNER: ${first}`);
                        win1=win1+1;
                    } else {
                        $('#heading').text(`WINNER: ${second}`);
                        win2=win2+1;
                    }
                    
                    c = 1;
                    break;
                }
            }
        }
        if (count === 9 && c === 0) {
            tied=tied+1;
            $('#heading').css('background-color', '#AA4A44');
            $('#heading').text("Game tied");
        }
        $('#win_count').text(`${first}: ${win1}   vs   ${second}: ${win2}  |   Tied:${tied}`);
    }
    $('.box').click(function() {
        if (!$(this).text()) {
            if (turn) {
                $(this).text("O").prop('disabled', true);
                $('#heading').text(`${second}'s turn [X]`);
            } else {
                $(this).text("X").prop('disabled', true);
                $('#heading').text(`${first}'s turn [O]`);
            }
            count=count+1;
            turn= !turn;
            winner();
        }
    });
    $('#new').click(function() {
        $('#open').fadeIn(1000);
        $('.container').fadeOut(500);
        turn = true;
        count = 0;
        setTimeout(function(){
            $('#heading').css('background-color', '#AEB096');
            $('#heading').css('color', '#1E1F1F');
            $('#heading').text(`${first}'s turn [O]`);
            $('.box').each(function() {
                $(this).text("").prop('disabled', false);
            });
        }, 500);
        win1=0;
        win2=0;
        tied=0;
    });
    $('#rematch').click(function() {
        $('.box').each(function() {
            $(this).text("").prop('disabled', false);
        });
        turn = true;
        count = 0;
        $('#heading').css('background-color', '#AEB096');
        $('#heading').css('color', '#1E1F1F');
        $('#heading').text(`${first}'s turn [O]`);
    });
    $('#reset').click(function(){
        $('#first').val("");
        $('#second').val("");
    });
});
