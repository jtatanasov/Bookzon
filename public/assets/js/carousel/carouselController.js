(function () {
    'use strict'
    const LAST_BOOKS_NUMBER = 15;
    const BOOKS_ON_SLIDE = 3;
    mainApp.controller('CarouselController', CarouselController);

    function CarouselController(BooksService) {
        var vm = this;

        vm.myInterval = 3000;
        vm.noWrapSlides = false;
        vm.active = 0;
        var latestBooks = [];
        var slides = vm.slides = [];
        var currIndex = 0;

        vm.addSlide = function () {
            // var newWidth = 600 + slides.length + 1;
            // slides.push({
            //     id: currIndex++,
            //     image: 'assets/images/icons/edit.png',
            //     image2: 'assets/images/icons/cart.png',
            //     image3: 'assets/images/icons/orders.png'
            // })
        }

        vm.randomize = function () {
            var indexes = generateIndexesArray();
            assignNewIndexesToSlides(indexes);
        };

        function generateSlides(books) {
            for(var i = 0; i <= LAST_BOOKS_NUMBER - BOOKS_ON_SLIDE; i += BOOKS_ON_SLIDE) {
                var tmpSlide = books.slice(i, i + BOOKS_ON_SLIDE);
                var slide = {
                    id: currIndex++,
                    bookId1: tmpSlide[0]._id,
                    image1: tmpSlide[0].volumeInfo.imageLinks.smallThumbnail,
                    title1: tmpSlide[0].volumeInfo.title,
                    bookId2: tmpSlide[1]._id,
                    image2: tmpSlide[1].volumeInfo.imageLinks.smallThumbnail,
                    title2: tmpSlide[1].volumeInfo.title,
                    bookId3: tmpSlide[2]._id,
                    image3: tmpSlide[2].volumeInfo.imageLinks.smallThumbnail,
                    title3: tmpSlide[2].volumeInfo.title,
                }
                slides.push(slide);
                
            } 
        }

        function assignNewIndexesToSlides(indexes) {
            for (var i = 0, l = slides.length; i < l; i++) {
                slides[i].id = indexes.pop();
            }
        }

        function generateIndexesArray() {
            var indexes = [];
            for (var i = 0; i < currIndex; ++i) {
                indexes[i] = i;
            }
            return shuffle(indexes);
        }

        // http://stackoverflow.com/questions/962802#962890
        function shuffle(array) {
            var tmp, current, top = array.length;

            if (top) {
                while (--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = array[current];
                    array[current] = array[top];
                    array[top] = tmp;
                }
            }

            return array;
        }

        BooksService.getLastBooks()
            .then(resp => {
                latestBooks = resp.data;
                generateSlides(latestBooks);
            })
            .catch(err => {
                console.log(err);
            })
    };
})();