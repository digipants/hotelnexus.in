module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./src/wp-content');
    eleventyConfig.addPassthroughCopy('./src/wp-includes');

    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
};