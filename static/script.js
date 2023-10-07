
            // function to answer question 1
            function checkAns1(answer) {
                if (answer === 'JavaScript') {
                    document.querySelector('#result1').innerHTML = 'Correct answer! JavaScript is the most popular programming language in 2023.';
                    document.querySelector('#result1').style.color = 'green'
                } else {
                    document.querySelector('#result1').innerHTML = 'Wrong answer. Try again.';
                    document.querySelector('#result1').style.color = 'red'
                }
            }

            // function to answer question 2
            function checkAns2(answer) {
                if (answer === '70s') {
                    document.querySelector('#result2').innerHTML = "Correct answer! In the early 1970's along with Unix.";
                    document.querySelector('#result2').style.color = 'green'
                } else {
                    document.querySelector('#result2').innerHTML = 'Wrong answer. Try again.';
                    document.querySelector('#result2').style.color = 'red'
                }
            }