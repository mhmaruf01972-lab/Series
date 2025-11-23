document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.getElementById('inputBox');
    const out1000 = document.getElementById('out1000');
    const out615 = document.getElementById('out615');
    
    const count1000 = document.getElementById('count1000');
    const count615 = document.getElementById('count615');
    const totalCount = document.getElementById('totalCount');

    const btnSeparate = document.getElementById('btnSeparate');
    const btnCopy1000 = document.getElementById('copy1000');
    const btnCopy615 = document.getElementById('copy615');

    // --- SEPARATE FUNCTION ---
    btnSeparate.addEventListener('click', () => {
        const text = inputBox.value.trim();
        if (!text) return;

        const lines = text.split('\n');
        let list1000 = [];
        let list615 = [];

        lines.forEach(line => {
            const cleanLine = line.trim();
            if (!cleanLine) return;

            // আমরা লাইনের শুরু থেকে নম্বরটি চেক করব
            // অথবা যদি ফরম্যাটেড ডাটা হয় (UID | Pass), তাহলেও প্রথম অংশ ধরব
            const uidMatch = cleanLine.match(/^(\d+)/);

            if (uidMatch && uidMatch[1]) {
                const uid = uidMatch[1];

                if (uid.startsWith('1000')) {
                    list1000.push(cleanLine);
                } else if (uid.startsWith('615')) {
                    list615.push(cleanLine);
                } 
                // অন্য কিছু হলে ইগনোর করবে (বা চাইলে আলাদা করতে পারেন)
            }
        });

        // আউটপুট সেট করা
        out1000.value = list1000.join('\n');
        out615.value = list615.join('\n');

        // কাউন্টার আপডেট
        count1000.innerText = list1000.length;
        count615.innerText = list615.length;
        totalCount.innerText = `${lines.length} lines total`;
    });

    // --- COPY FUNCTION 1000 ---
    btnCopy1000.addEventListener('click', () => {
        if (!out1000.value) return;
        out1000.select();
        navigator.clipboard.writeText(out1000.value).then(() => {
            btnCopy1000.innerText = "COPIED! ✅";
            setTimeout(() => btnCopy1000.innerText = "COPY 1000 LIST", 2000);
        });
    });

    // --- COPY FUNCTION 615 ---
    btnCopy615.addEventListener('click', () => {
        if (!out615.value) return;
        out615.select();
        navigator.clipboard.writeText(out615.value).then(() => {
            btnCopy615.innerText = "COPIED! ✅";
            setTimeout(() => btnCopy615.innerText = "COPY 615 LIST", 2000);
        });
    });
});
