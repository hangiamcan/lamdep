$( document ).ready(function() {
    getClientIp();
    valProof();
    valPopup();

    $('#dat-mua').click(function(e) {
        submitForm();
        //gửi request  form

        return false;
    });

    $('#dat-mua-2').click(function(e) {
        submitForm2();
        //gửi request popup form

        return false;
    });



    function getInfo(data){
        $.post( "https://powerman.vn/listener/index.php", data)
			.done(function( res ) {
			    alert("Đặt hàng thành công, cảm ơn bạn!");
                $('#loading').remove();
			    window.location.replace("http://powerman.vn/plus/thankyou.html")
			})
			.fail(function() {
			    alert( "Đặt hàng thất bại, mời bạn thử lại hoặc gọi hotline" );
			});
    }

    function checkPhoneNumber(phone) {
        var flag = false;
        phone = phone.replace('(+84)', '0');
        phone = phone.replace('+84', '0');
        phone = phone.replace('0084', '0');
        phone = phone.replace(/ /g, '');
        if (phone != '') {
            var firstNumber = phone.substring(0, 2);
            if ((firstNumber == '09' || firstNumber == '08' || firstNumber == '03' || firstNumber == '05' || firstNumber == '07') && phone.length == 10) {
                if (phone.match(/^\d{10}/)) {
                    flag = true;
                }
            }
        }
        return flag;
    }

    function getClientIp(){
        var ip;
        $.ajaxSetup({async: true});
        client_ip = $.getJSON("https://api.ipify.org/?format=json", function(e) {
            ip = e.ip;
            $('<input>').attr({
                type: 'hidden',
                id: 'client_ip',
                name: 'client_ip',
                value: ip
            }).appendTo('.form-order');
        });
    }

    function submitForm(){
        name = $("input[name=name]").val();
        phone = $("input[name=phone]").val();
        if(phone != '' && name != ''){
        //validate phone number input
            if (!checkPhoneNumber(phone)) {
                alert("Sai định dạng số điện thoại");
               
            } else {
                $('#dat-mua').append(' <i id=\'loading\' class="fa fa-spinner fa-spin"></i>');  
                $('#dat-mua').attr('disabled','disabled'); //Set the value  
                var ip = $("input[name=client_ip]").val();
                var url_string = window.location.href;
                var url = new URL(url_string);
                var utm_source = url.searchParams.get("utm_source");
                var utm_campaign = url.searchParams.get("utm_campaign");
                var click_id = url.searchParams.get("click_id");

                source = 'powerman.vn';
                product = 'plus';
                data = {
                      phone : phone,
                      name : name,
                      source : source,
                      utm_source : utm_source,
                      utm_campaign: utm_campaign,
                      product : product,
                      click_id: click_id,
                      ip : ip
                  };
                getInfo(data);
                //$('#loading').remove(); 
            }
         
        }else{
            alert("Vui lòng điền đủ tên và số điện thoại");
        }        
    }

    function submitForm2(){
        name = $("input[name=name2]").val();
        phone = $("input[name=phone2]").val();
        if(phone != '' && name != ''){
        //validate phone number input
            if (!checkPhoneNumber(phone)) {
                alert("Sai định dạng số điện thoại");
               
            } else {
                $('#dat-mua-2').append(' <i id=\'loading\' class="fa fa-spinner fa-spin"></i>');  
                $('#dat-mua-2').attr('disabled','disabled'); //Set the value  
                var ip = $("input[name=client_ip]").val();
                var url_string = window.location.href;
                var url = new URL(url_string);
                var utm_source = url.searchParams.get("utm_source");
                var utm_campaign = url.searchParams.get("utm_campaign");
                var click_id = url.searchParams.get("click_id");

                source = 'powerman.vn';
                product = 'plus';
                data = {
                      phone : phone,
                      name : name,
                      source : source,
                      utm_source : utm_source,
                      utm_campaign: utm_campaign,
                      product : product,
                      click_id: click_id,
                      ip : ip
                  };
                getInfo(data);
            }
         
        }else{
            alert("Vui lòng điền đủ tên và số điện thoại");
        }        
    }
    
    function valPopup() {
        setTimeout(function() {
            $('.cookie-popup-wrap').fadeIn(600);
        }, 30000);
        $('#closepopup').click(function(e) {
            e.preventDefault();
            $('.cookie-popup-wrap').fadeOut(200);
            valPopup();
        });
        $('body').click(function(e) {
            var a = e.target;
            if ($(a).parents('.cookie-popup-wrap').length === 0) {
                $('.cookie-popup-wrap').fadeOut(600);
            }
        });
    }

    function valProof() {
        var currentNumber = Math.floor(Math.random() * (72 - 20 + 1)) + 20;
        var places = ['Hà Nội', 'Nghệ An', 'Hồ Chí Minh', 'Vũng Tàu', 'Nha Trang', 'Cà Mau', 'Hà Giang', 'Hải Phòng', 'Quảng Ninh', 'Thanh Hóa', 'Ninh Bình'];
        var proofWrapper = $('<div id="scpf" style="transition:all 2s ease 0s;position:fixed;z-index:99999;border-radius:30px;bottom:5px;left:20px;width:300px;height:65px;background-color:white"></div>');
        var proofLeft = $('<div style="position:absolute;float:left;width:65px;height:65px;"></div>');
        var proofRight = $('<div style="position:relative;float:left;margin-left:75px;margin-top:15px;width:200px;"></div>');
        var proofName = ['Hưng', 'Long', 'Dũng', 'Hùng', 'Quyết', 'Sơn', 'Tiến', 'Kiên', 'Đạt', 'Minh', 'Huy', 'Nam', 'Hải', 'Tùng'];
        var proofNumb = ['1', '2', '3', '4', '5', '6'];

         function proof() {
            var halogen = $('<img style="width:100%" src="./assets/image/lg.double-ring-spinner.gif"></img>')
            var text = $('<p id="proofcontent" style="color:#000;">Có <span id="people" style="color:#F44336;background-color:#FFEBEE;padding:1px 5px;">' + currentNumber + ' khách truy cập</span> đang xem trang.</p>')
            $(proofLeft).append(halogen);
            $(proofRight).append(text);
            $(proofWrapper).append(proofLeft);
            $(proofWrapper).append(proofRight);
            $('body').append(proofWrapper);

            function loopThis() {
                var delay = Math.floor(Math.random() * (20000 - 15000 + 1)) + 15000;
                setTimeout(function() {
                    var place = places[Math.floor(Math.random() * places.length)];
                    var name = proofName[Math.floor(Math.random() * proofName.length)];
                    var quantity = proofNumb[Math.floor(Math.random() * proofNumb.length)];
                    $('#proofcontent').html('Cám ơn anh <span style="color:#F44336;background-color:#FFEBEE;padding:1px 5px;">' + name + '</span> tại <span style="color:#F44336;background-color:#FFEBEE;padding:1px 5px;">' + place + '</span> đã đặt mua '+quantity+' hộp!');
                    $('#scpf').css("bottom", "5px");
                    setTimeout(function() {
                        $(proofRight).fadeOut("slow", function() {
                            currentNumber = currentNumber + (Math.floor(Math.random() * (5 - 1 + 1)) + 1) * (Math.random() > 0.3 ? 1 : -1);
                            $('#proofcontent').html('<p id="proofcontent" style="color:#000;"><span id="people" style="color:#F44336;background-color:#FFEBEE">' + currentNumber + ' người</span> đang xem trang</p>')
                            $(proofRight).fadeIn("slow", function() {
                                setTimeout(function() {
                                    $('#scpf').css('bottom', '-80px');
                                }, 3000);
                                loopThis();
                            });
                        });
                    }, 4000);
                }, delay);
            }
            setTimeout(function() {
                $('#scpf').css("bottom", "-80px");
                loopThis();
            }, 3000);
        }
        proof();
    }
  
  }
);
   