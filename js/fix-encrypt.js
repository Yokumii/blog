(function() {
    // 当DOM内容加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
      console.log('添加密码框回车事件监听');
      
      function fixPasswordInput() {
        // 找到密码输入框
        const passwordInput = document.getElementById('hbePass');
        if (!passwordInput) return false;
        
        // 已经修复过，跳过
        if (passwordInput.getAttribute('data-fixed')) return true;
        
        // 标记已修复
        passwordInput.setAttribute('data-fixed', 'true');
        
        // 创建表单元素
        if (!passwordInput.closest('form')) {
          const form = document.createElement('form');
          form.onsubmit = function(e) {
            e.preventDefault();
            return false;
          };
          passwordInput.parentNode.insertBefore(form, passwordInput);
          form.appendChild(passwordInput);
        }
        
        // 在密码框上直接添加回车事件监听
        passwordInput.addEventListener('keydown', function(event) {
          if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            
            // 手动调用mainElement上的keydown事件
            const mainElement = document.getElementById('hexo-blog-encrypt');
            if (mainElement) {
              // 创建一个虚假的回车keydown事件
              const enterEvent = new KeyboardEvent('keydown', {
                key: 'Enter',
                keyCode: 13,
                bubbles: true,
                cancelable: true
              });
              mainElement.dispatchEvent(enterEvent);
            }
          }
        });
        
        return true;
      }
      
      // 首次尝试修复
      fixPasswordInput();
      
      // 使用MutationObserver监听DOM变化
      const observer = new MutationObserver(function() {
        fixPasswordInput();
      });
      
      observer.observe(document.body, { 
        childList: true,  // 监听子节点变化
        subtree: true     // 监听整个子树
      });
    });
  })();