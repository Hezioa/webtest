// 联系表单处理
// 获取表单和反馈元素
const form = document.getElementById('contactForm');
const feedback = document.getElementById('feedback');

// 表单提交事件处理
form.addEventListener('submit', function (e) {
    // 阻止默认表单提交行为
    e.preventDefault();

    // 获取表单数据
    const name = document.getElementById('name').value;
    
    // 表单验证：检查所有必填字段是否填写
    if (!name || !document.getElementById('email').value || !document.getElementById('message').value) {
        feedback.textContent = '请填写所有必填项！';
        feedback.className = 'mb-8 p-4 rounded-lg text-center block bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30';
        return;
    }

    // 使用fetch API提交表单数据
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            // 提交成功：显示成功消息，重置表单
            feedback.textContent = `感谢 ${name}！你的留言已发送，我会尽快回复～`;
            feedback.className = 'mb-8 p-4 rounded-lg text-center block bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30';
            form.reset();
            // 10秒后隐藏成功消息
            setTimeout(() => feedback.classList.add('hidden'), 10000);
        } else {
            // 提交失败：显示错误消息
            feedback.textContent = '发送失败，请稍后再试！';
            feedback.className = 'mb-8 p-4 rounded-lg text-center block bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30';
        }
    }).catch(error => {
        // 网络错误：显示网络错误消息
        feedback.textContent = '发送失败，请检查网络！';
        feedback.className = 'mb-8 p-4 rounded-lg text-center block bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30';
    });
});

// GSAP动画初始化
// 注册ScrollTrigger插件，用于滚动触发动画
gsap.registerPlugin(ScrollTrigger);

// 英雄区文本动画：页面加载时的淡入效果
gsap.to("#hero-text > *", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.3,
    ease: "back.out(1.2)"
});

// 导航栏滚动效果：根据滚动位置改变导航栏样式
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 80) {
        // 滚动超过80px：添加背景、缩小padding、添加阴影
        navbar.classList.add("bg-dark-950/95", "py-4", "shadow-lg", "shadow-gold-light/5");
        navbar.classList.remove("bg-transparent", "py-6");
    } else {
        // 滚动不足80px：恢复初始样式
        navbar.classList.add("bg-transparent", "py-6");
        navbar.classList.remove("bg-dark-950/95", "py-4", "shadow-lg", "shadow-gold-light/5");
    }
});

// 区块标题动画：当滚动到区块时的淡入和旋转效果
document.querySelectorAll(".section-title").forEach((section) => {
    gsap.from(section.parentElement, {
        opacity: 0,
        y: 40,
        rotate: -2,
        duration: 1,
        ease: "easeOut",
        scrollTrigger: {
            trigger: section.parentElement,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});

// 卡片动画：当滚动到works section时，卡片逐个淡入
// 使用stagger参数实现卡片的顺序动画效果
gsap.from(".card-glow", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: "easeOut",
    scrollTrigger: {
        trigger: "#works",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

// 页面section淡入淡出效果
// 为每个section添加滚动触发的淡入淡出动画
const sections = ["#works", "#skills", "#about", "#contact"];

sections.forEach(section => {
    gsap.fromTo(section, 
        // 初始状态：透明且向下偏移
        { opacity: 0, y: 50 },
        // 目标状态：完全不透明且无偏移
        { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            ease: "easeOut",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

