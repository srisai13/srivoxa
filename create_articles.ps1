$content = Get-Content -Raw index.html

# We need the header up to <main class="hero">
$topPart = $content -replace '(?s)<main class="hero">.*', ''
$topPart = $topPart -replace 'href="#', 'href="index.html#'

# We need the footer from <footer class="main-footer">
$footerPart = $content -replace '(?s).*?(<footer class="main-footer">)', '$1'
$footerPart = $footerPart -replace 'href="#', 'href="index.html#'

$articles = @(
    @{
        filename = "article-future-web.html"
        title = "The Future of Web Development"
        date = "Oct 12, 2026"
        img = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
        body = @"
            <p>The web development landscape is evolving at a breakneck pace. From AI-driven code generation to advanced frameworks that blur the line between frontend and backend, the future is incredibly exciting.</p>
            <h3 style="margin-top: 30px; margin-bottom: 15px;">1. AI-Driven Development</h3>
            <p>Artificial intelligence is no longer just a buzzword. Tools like GitHub Copilot and ChatGPT are assisting developers in writing cleaner code faster. In the future, we can expect AI to handle routine boilerplate code, allowing developers to focus on complex architecture and user experience.</p>
            <h3 style="margin-top: 30px; margin-bottom: 15px;">2. WebAssembly (Wasm)</h3>
            <p>WebAssembly is bringing near-native performance to the web browser. It allows languages like C++, Rust, and Go to run on the web at high speeds, which is revolutionizing browser-based games, video editing, and complex simulations.</p>
            <h3 style="margin-top: 30px; margin-bottom: 15px;">3. Serverless Architectures</h3>
            <p>The shift towards serverless means developers don't have to worry about server management. Functions as a Service (FaaS) allow for automatic scaling and reduced costs, making application deployment more efficient.</p>
            <p style="margin-top: 20px;">Stay tuned as we continue to explore these exciting developments in our upcoming projects!</p>
"@
    },
    @{
        filename = "article-ui-ux.html"
        title = "Why UI/UX Matters More Than Ever"
        date = "Sep 28, 2026"
        img = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
        body = @"
            <p>In today's crowded digital marketplace, a functional application is no longer enough. The user interface (UI) and user experience (UX) are often the primary differentiators between a successful product and a forgotten one.</p>
            <h3 style="margin-top: 30px; margin-bottom: 15px;">First Impressions Count</h3>
            <p>Users judge a website within milliseconds. A clean, modern UI builds trust instantly. If your site looks outdated or is difficult to navigate, users will bounce to a competitor before even reading your value proposition.</p>
            <h3 style="margin-top: 30px; margin-bottom: 15px;">Accessibility is Non-Negotiable</h3>
            <p>Great UX means designing for everyone. This includes high contrast text, screen reader compatibility, and keyboard navigation. Not only is this ethically correct, but it also expands your potential user base and improves SEO.</p>
            <h3 style="margin-top: 30px; margin-bottom: 15px;">Micro-interactions</h3>
            <p>Subtle animations, hover effects, and loading transitions provide feedback to the user and make the application feel alive. These micro-interactions can significantly boost user engagement and satisfaction.</p>
"@
    },
    @{
        filename = "article-sap-hana.html"
        title = "Getting Started with SAP HANA"
        date = "Sep 15, 2026"
        img = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"
        body = @"
            <p>SAP HANA is a high-performance in-memory database that accelerates data-driven, real-time decision-making and actions. For enterprises dealing with massive amounts of data, it is a game-changer.</p>
            <h3 style="margin-top: 30px; margin-bottom: 15px;">In-Memory Computing</h3>
            <p>Unlike traditional databases that store data on hard drives, SAP HANA stores data in RAM. This allows for lightning-fast data retrieval and processing, enabling real-time analytics on transactional data.</p>
            <h3 style="margin-top: 30px; margin-bottom: 15px;">Columnar Storage</h3>
            <p>By storing data in columns rather than rows, SAP HANA achieves high compression rates and speeds up aggregation queries, which is perfect for business intelligence and reporting.</p>
            <h3 style="margin-top: 30px; margin-bottom: 15px;">Integration and Deployment</h3>
            <p>SAP HANA can be deployed on-premise, in the cloud, or as a hybrid model. Its ability to integrate with various enterprise resource planning (ERP) tools makes it the backbone of modern enterprise architectures.</p>
"@
    }
)

foreach ($article in $articles) {
    $html = $topPart + @"
    <main class="section" style="padding-top: 150px; min-height: 80vh;">
        <div class="section-content" style="max-width: 800px; margin: 0 auto; text-align: left;">
            <a href="index.html" class="blog-link" style="display: inline-block; margin-bottom: 20px;">&larr; Back to Home</a>
            <span class="blog-date" style="display: block; color: var(--accent-color); font-weight: 600; margin-bottom: 10px;">$($article.date)</span>
            <h1 class="hero-title" style="font-size: 2.5rem; margin-bottom: 30px;">$($article.title)</h1>
            <img src="$($article.img)" alt="$($article.title)" style="width: 100%; border-radius: 20px; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <div class="article-body" style="font-size: 1.1rem; line-height: 1.8; color: var(--text-color);">
                $($article.body)
            </div>
        </div>
    </main>
"@ + "`r`n" + $footerPart

    Set-Content -Path $article.filename -Value $html -Encoding UTF8
}
