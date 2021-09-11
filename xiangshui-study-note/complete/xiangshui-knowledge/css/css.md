#css ##渐变
background-image: linear-gradient(yellow,black); 从顶部开始的线性渐变。起点是红色，慢慢过渡到蓝色：

从左边开始的线性渐变。起点是红色，慢慢过渡到黄色：
.grad1 {
height: 200px;
background-color: red; /_ 不支持线性的时候显示 _/
background-image: linear-gradient(to right, red , yellow);

    从左上角开始（到右下角）的线性渐变。起点是红色，慢慢过渡到黄色：

background-image: linear-gradient(to bottom right, red , yellow);
带有指定的角度的线性渐变：
background-image: linear-gradient(-90deg, red, yellow);
从左到右的线性渐变，带有透明度：
background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1)
形状为圆形的径向渐变：
background-image: radial-gradient(circle, red, yellow, green);

    note
    1.width:inherit,继承父元素的宽度。和width:100%的区别是，
         inherit时，子元素加padding，总宽度会算上padding。
         100%时，子元素加上padding，总宽度不会算上padding。
    2.z-index,加这个属性时，如果没有position，则无效

    3子元素都是float,父元素可以设置inline-block，来包裹所有子元素。待验证

translate 实现绝对居中效果。
translate 一直是我实现居中效果众多属性中最多的一个属性，我认为这个属性简单，使用方便，在此小记。
translate(X,Y)定义 2D 转换，其中 X 是定义 X 轴的值，Y 轴是定义 Y 轴的值。

position: absolute;
left: 50%;
top: 50%;
-webkit-transform: translate(-50%,-50%);
-moz-transform: translate(-50%,-50%);
transform:translate(-50%,-50%);

##  三栏布局
https://www.jianshu.com/p/7d7cf4f051ee


