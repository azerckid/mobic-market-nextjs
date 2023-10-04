npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install -D prettier prettier-plugin-tailwindcss

## vscode setting

Ctrl + Shipt + P > Open User Setting(Json)

{
...
"files.associations": {
"\*.css": "tailwindcss"
},
"editor.quickSuggestions": {
"strings": true
}
}
