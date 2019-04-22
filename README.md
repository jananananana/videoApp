# Instructions
- Run `python -m SimpleHTTPServer 8000` in local directory.
- Open browser to: http://localhost:8000/

# Arturo Take Home Assignment

## Create a minimal mobile vertical video player 

The player should fetch a list of videos and play them fullscreen. Videos should loop until the user presses the right half of the screen to advance to the next video, or the left half of the screen to go to the previous video. The list of videos should themselves loop, so that when the user watches the last video, clicking next will play the first video in the list.

Each video can have multiple captions. A caption can also be a link to another URL.

**Note** On mobile video, the volume is disabled unless the user interacts with the player to enable it. You will have to include a mute toggle and default it to off in order to allow the user to hear sound.

Make an AJAX call to this fake API endpoint:
https://demo.arturo.video/data/videos.json

The response is an array of objects in the following format:

```
{
    "video": url,
    "captions":
    [
        {
            "text": string,
            "x": int 0-99 percent of screen width,
            "y": int 0-99 percent of screen height,
            "size": small|medium|large,
            "color": hexcode,
            "background-color": hexcode, (optional)
            "font": standard font name,
            "href": url (optional)
        }
    ]
}
```
