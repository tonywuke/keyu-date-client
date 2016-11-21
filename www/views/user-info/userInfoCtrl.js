/**
 * Created by Tonywuke on 16/十一月/21.
 */
angular.module('app', [])



  .controller('userInfoCtrl', ['$scope', '$stateParams', '$http','$state','$rootScope','$ionicActionSheet',
    '$cordovaImagePicker','$cordovaCamera','$cordovaFileTransfer',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams,$http,$state,$rootScope,$ionicActionSheet,
              $cordovaImagePicker,$cordovaCamera,$cordovaFileTransfer) {
      $scope.user = {phonenumber:$stateParams.phonenumber};

      $http.get($rootScope.urlAddress+'/users/get-user-info',{params: $scope.user} )
        .success(function (data, status, headers, config) {
          console.log(data);
          $scope.user=data;
        });

      $scope.saveUserInfo= function(){
        $http.post($rootScope.urlAddress+'/users/save-user-info',$scope.user)
          .success(function (data, status, headers, config) {
            console.log(data);
            $state.go('tabs.minePage');
          });
      }

      $scope.uploadHeadImg= function(){
        $ionicActionSheet.show({
          buttons: [
            { text: '拍照' },
            { text: '从相册上传' }
          ],
          cancelText: '取消',
          cancel: function() {
            return true;
          },
          buttonClicked: function(index) {
            switch (index){
              case 0:
                takePhoto();
                break;
              case 1:
                pickImage();
                break;
              default:
                break;
            }
            return true;
          }
        });
      }


      //image picker
      var pickImage = function () {

        var options = {
          //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
          quality: 100,                                            //相片质量0-100
          destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
          sourceType: 0,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
          allowEdit: false,                                        //在选择之前允许修改截图
          encodingType: Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
          mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
          cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false                                   //保存进手机相册
        };
        $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.headImgSrc=imageData;
          upImage(imageData);
        }, function (err) {

        });
      }


      var takePhoto = function () {
        var options = {
          //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
          quality: 100,                                            //相片质量0-100
          destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
          sourceType: Camera.PictureSourceType.CAMERA,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
          allowEdit: false,                                        //在选择之前允许修改截图
          encodingType: Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
          mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
          cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false                                   //保存进手机相册
        };
        $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.headImgSrc=imageData;
          upImage(imageData);
        }, function (err) {

        });

      }

      //图片上传upImage（图片路径）
      //http://ngcordova.com/docs/plugins/fileTransfer/  资料地址
      var upImage = function (imageUrl) {
        document.addEventListener('deviceready', function () {
          var url = $rootScope.urlAddress+'/files/upload';
          var options = new FileUploadOptions();
          var params = {
            phonenumber: '1111',
            type: 'headImg'
          };
          options.params = params;

          $cordovaFileTransfer.upload(url, imageUrl, options)
            .then(function (result) {
              console.log(result);
              alert(JSON.stringify(result.response));
              alert("success");
              alert(result.message);
            }, function (err) {
              alert(JSON.stringify(err));
              alert(err.message);
              alert("fail");
            }, function (progress) {
              console.log(progress);
              // constant progress updates
            });

        }, false);
      }

    }])

