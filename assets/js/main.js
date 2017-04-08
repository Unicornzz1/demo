var Cropper = (function() {
	
  	var $size = 1200;
  	var $uploadCrop;
  	var $uploadedImageOrientation = 0;
  	var $profileFrame = '1';
	
  	function readFile(input) {
		if (input.files && input.files[0]) {
			$('.upload-msg').css('display', 'block');
			var reader = new FileReader();
			reader.onload = function (e) {
				$('.upload-msg').css('display', 'none');
				$('.section-create').addClass('visible');
				$('.crop-wrapper').addClass('visible');
				$('.create-option').addClass('visible');
				$('.btn-create').addClass('visible');
				$uploadCrop.croppie('bind', {
					url: e.target.result,
					zoom: 0
				}).then(function() {
					console.log('jQuery bind complete');
				});
				$('html, body').animate({ scrollTop: $("#create-wrapper").offset().top }, 500);
			}
			reader.readAsDataURL(input.files[0]);
		} else {
		
		}
	}

	function showResult() {
	  	$uploadCrop.croppie('result', {
			type: 'canvas',
			size: { width: $size, height: $size },
			format: 'png'
	  	}).then(function (resp) {
			popupResult({
		  		src: resp
			});
	  	});
	}

	function popupResult(result) {
		$('.create-msg').css('display', 'block');
		var cnv = document.getElementById("result-canvas");
		var ctx = cnv.getContext("2d");
		var image = new Image();
		image.src = result.src;
		image.onload = function() {
		  	var imageOverlay = new Image();
		  	if ($profileFrame == '1')
				//imageOverlay.src = 'file:///Users/Surasak/Desktop/application/assets/images/0.png';
				imageOverlay.src = 'http://www.surasak.ece.engr.tu.ac.th/demo/assets/images/0.png';
		  	else
				//imageOverlay.src = 'file:///Users/Surasak/Desktop/application/assets/images/1.png';
				imageOverlay.src = 'http://www.surasak.ece.engr.tu.ac.th/demo/assets/images/1.png';
		  	imageOverlay.onload = function() {
				ctx.fillStyle = 'white';
				ctx.fillRect(0, 0, $size, $size);
				ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
				ctx.drawImage(imageOverlay, 0, 0, imageOverlay.width, imageOverlay.height, 0, 0, imageOverlay.width, imageOverlay.height);
				var imageUrl = cnv.toDataURL("image/jpeg");
				var a = document.getElementById("download");
				a.href = imageUrl;
				
				var a_href = $('#download').attr('href');
				var url_convert = a_href.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
				$('#download').attr('href',url_convert);
				$('#download').attr("download", "test.jpg")
				
				$('.result-container').addClass('visible');
				$('.result-img').html('<img src="' + imageUrl + '" download="test.jpg">');
				$('html, body').animate({ scrollTop: $("#result-wrapper").offset().top }, 500);
				$('.create-msg').css('display', 'none');
		  	};
		};
	}

  	$uploadCrop = $('.crop-wrapper').croppie({
      	enableExif: true,
      	viewport: {
          	width: 280,
          	height: 280,
          	type: 'square'
      	},
      	boundary: {
          	width: 300,
          	height: 300
      	}
  	});
  
  	$('#upload').on('change', function () {
    	readFile(this);
  	});
  
  	$('.btn-create').on('click', function () { showResult(); });

	$('input[type=radio][name=profile-frame]').change(function() {
		$profileFrame = this.value;
    	if ($profileFrame == '2') {
      		$('#profile-frame-design-1').css('display', 'none');
      		$('#profile-frame-design-2').css('display', 'inline-block');
    	} else {
      		$('#profile-frame-design-1').css('display', 'inline-block');
      	$('#profile-frame-design-2').css('display', 'none');
    	}
  	});
	
  	$profileFrame = $('input[type=radio][name=profile-frame]').val();
	
})();

$('.scrollToTop').click(function () {
	$('html, body').animate({ scrollTop: $("#browse-wrapper").offset().top }, 500);
    return false;
});
