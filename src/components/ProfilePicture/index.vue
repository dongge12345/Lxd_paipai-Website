<template>
    <img src="@/assets/images/namei.png" alt="">
</template>

<script>
export default {
    name:'ProfilePicture'
}
</script>

<style scoped lang="css">
    img{
        --w:60px;
        --wNum:100;
        --b:5px;
        --s:0.8;
        --p:40px;
        --pNum:40;
        transform:scale(var(--s));
        transition:all 1s;
        width:var(--w);
        box-sizing: content-box;
        padding-top:var(--p);
        border-radius: 0 0 10000px 10000px;
        --offset:calc(var(--w) / 2 / var(--s) - var(--w) / 2 - var(--b) / var(--s));
        --circle:radial-gradient(
            circle closest-side,
            rgb(91, 227, 102) calc(97% - var(--b) / var(--s)),
            rgb(242,192,86) calc(100% - var(--b) / var(--s)),
            rgb(242,192,86) calc(100% - 1px),
            transparent calc(100% * 0.99)
        ) content-box no-repeat center / calc(100% / var(--s)) 100%;
        /* calc((var(--w) - 2* var(--b)) / var(--s)) */
        /* calc((var(--w) + var(--p)) / var(--s)) */
        /* calc(var(--offset) * -1) */
        /* calc(100% * (2 * var(--pNum) + var(--wNum)) / (2 * (var(--pNum) + var(--wNum)))) */
        --rec:linear-gradient(pink 0 0)
            no-repeat
            center calc(var(--offset) * -1 + 1px) / 
            calc((var(--w) - 2 * var(--b) - 1px) / var(--s)) 50%;
        /* background: var(--rec); */
        background:var(--circle);
        outline:calc(var(--b) / var(--s)) solid rgb(242,192,86);
        outline-offset: var(--offset);
        -webkit-mask:var(--circle),var(--rec);
    }

    img:hover{
        --s:1.7
    }
</style>