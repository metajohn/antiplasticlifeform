module.exports = function(eleventyConfig) {

// The Master Link Translator: Converts Obsidian links into clean Web URLs
    eleventyConfig.addTransform("transform-obsidian-links", function(content) {
        // Only modify compiled HTML pages
        if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
            
            // 1. Fixes links that point directly to file names (e.g., posts/file.md -> /posts/file/)
            let updatedContent = content.replace(/href="posts\/([^"]+)\.md"/g, 'href="/posts/$1/"');
            
            // 2. Fixes links if they happen to start with a dot slash (e.g., ./posts/file.md -> /posts/file/)
            updatedContent = updatedContent.replace(/href="\.\/posts\/([^"]+)\.md"/g, 'href="/posts/$1/"');
            
            return updatedContent;
        }
        return content;
    });

    return {
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",

        dir: { 
            input: 'src', 
            output: '_site'
        }
    }; 
}
