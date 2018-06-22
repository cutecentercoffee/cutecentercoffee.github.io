$(function () {
    $('.js-loader').hide();
    
    // on submitting the form
    $('form').submit(function (event) {
        // prevent the default action of reloading the page
        event.preventDefault();
        $('.js-loader').show(500);

        var sendData = {};
        $(event.target.nodeName + ' :input').each(function () {
            sendData[this.name] = $(this).val();
        });
        var posting = $.ajax({
            type: 'POST',
            url: $(event.target.nodeName).prop('action'),
            data: sendData
        });

        posting.done(function (response) {
            console.log(response);
            $('.modal').modal('hide');
            $('#successModal').modal('show');
            $('.js-loader').hide();
        });
        posting.fail(function (response) {
            console.log(response);
            $('.modal').modal('hide');
            $('#errorModal').modal('show');
            $('.js-loader').hide();
        });
    });

    $('#memberModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('username');
        var url = button.data('profile');
        var modal = $(this);
        modal.find('.js-mModal__name').text(recipient);
        modal.find('.js-mModal__profile').attr('src', url);
    });

    $('.js-member-order__btn').click(function () {
        $('.js-loader').show();
        var sendData = {};
        sendData['NAME'] = $('.js-mModal__name').html();
        $('.js-coffee-type').each(function (i) {
            if ($(this).prop('checked'))
                sendData['COST'] = $(this).val();
        })

        var posting = $.ajax({
            type: 'POST',
            url: 'https://script.google.com/macros/s/AKfycbxkeNWZtsqj4NYbG36M9F1kus8nNyt1uT8AJ0nL_xrDURG-p0iI/exec',
            data: sendData
        });

        posting.done(function (response) {
            console.log(response);
            $('.modal').modal('hide');
            $('#successModal').modal('show');
            $('.js-loader').hide();
        });
        posting.fail(function (response) {
            console.log(response);
            $('.modal').modal('hide');
            $('#errorModal').modal('show');
            $('.js-loader').hide();
        });
    });

    $('.js-reset__btn').click(function () {
        location.reload();
    });

});