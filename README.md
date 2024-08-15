# NYT Connections Archive

> A clone of the popular New York Times Connections puzzle with a complete archive of puzzles updated daily.

[Live Site](https://connections-archive.vercel.app/)

## Tech

- Frontend / Backend: Next.js
- Language: TypeScript
- Database: MongoDB
- Daily data fetching: cron / Python
- Libraries of note:
  - Animations: [Framer Motion](https://www.framer.com/motion/)
  - Local storage: [usehooks-ts](https://usehooks-ts.com/)
  - Icons: [Feather Icons](https://feathericons.com/)
  - Misc: [Moment.js](https://momentjs.com/), [Lodash](https://lodash.com/)

## Discoveries / Takeaways 

### Deepening understanding and comfortability with TypeScript

  - This was my third experience working with TypeScript. As the app grew, I found myself comfortably working with the language and assigning types beyond the normal "string", "number", etc. The project dealt with a number of complex structures for the pieces of game logic, so having more confidence helped in working with these bits of data. There is _always_ more to learn, but I'm happy that I'm improving. 

### Worked with new APIs (Navigator and Storage Web APIs)

- Navigator API - I wanted to allow users to share their game results (the main point of playing the game for my group of friends) and I had never used the navigator API before. It was so easy to implement after finding out about it. That is a theme that I find often in my projects; I'll have a feature I want to add, but I'll make a mountain out of it and be scared to attempt it.. just to find that it was really a mole hill once broken into smaller chunks.
- Storage API - Another major feature of having an archive of the puzzles was the ability to save your progress. I want users to be able to look back at their different games. This was a major challenge as I would write a custom hook to use local storage, but run into issues with my generic typing. In the end, I utilized a library to help get this over the line, but wrestling with the local storage was a learning experience.

### Adding polish with Framer Motion

- Continuing with the theme of demystifying problems, I was incredibly excited to utilize Framer Motion in this project. I knew it would be a fun surprise for my friends when the grid items shifted, or elements faded out of the screen. This was something I was intimidated by. However, the animations were MUCH easier to add than I expected. Framer Motion is an incredible library that I can't wait to explore more. 





