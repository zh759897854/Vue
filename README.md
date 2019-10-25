# Vue
Vue学习实践之路

uni-app 微信小程序保存二维码
```
const fsm = uni.getFileSystemManager();
                const FILE_BASE_NAME = 'tmp_base64src'; //自定义文件名

                const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(that.url) || [];
                if (!format) {
                    return (new Error('ERROR_BASE64SRC_PARSE'));
                }
                const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
                const buffer = uni.base64ToArrayBuffer(bodyData);
                fsm.writeFile({
                    filePath,
                    data: buffer,
                    encoding: 'binary',
                    success() {
                        console.log(filePath,'===');
                        //获取到临时保存路径
                        uni.saveImageToPhotosAlbum({
                            filePath: filePath,
                            success: function() {
                                uni.showToast({
                                    title: "保存成功",
                                    icon: "none"
                                });
                                that.hideQRBox();
                            },
                            fail: function() {
                                uni.showToast({
                                    title: "保存失败，请稍后重试",
                                    icon: "none"
                                });
                            }
                        });
                    },
                    fail() {
                        return (new Error('ERROR_BASE64SRC_WRITE'));
                    },
                });
   ```
