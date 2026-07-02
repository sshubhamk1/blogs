document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("pre").forEach(pre => {

        if (pre.parentElement.classList.contains("code-wrapper"))
            return;

        const wrapper = document.createElement("div");

        wrapper.className = "code-wrapper";

        const toolbar = document.createElement("div");

        toolbar.className = "code-toolbar";

        const language = document.createElement("div");

        language.className = "code-language";

        const cls = [...pre.classList].join(" ");

        let lang = "CODE";

        const match = cls.match(/language-(\w+)/);

        if (match)
            lang = match[1];

        language.textContent = lang;

        const button = document.createElement("button");

        button.className = "copy-btn";

        button.textContent = "📋 Copy";

        button.onclick = async () => {

            await navigator.clipboard.writeText(pre.innerText);

            button.textContent = "✓ Copied";

            setTimeout(() => {

                button.textContent = "📋 Copy";

            }, 2000);
        };

        toolbar.append(language);

        toolbar.append(button);

        pre.parentNode.insertBefore(wrapper, pre);

        wrapper.append(toolbar);

        wrapper.append(pre);

    });

});