# Gallery folder

Drop your real photos and videos here, then list them in `manifest.json` so they show up on the homepage.

Photos and videos appear in **separate tabs** ("Photos" / "Videos") on the homepage — you don't need to
do anything to make this work, it's automatic based on each item's `"type"` in the manifest. The Photos
tab auto-advances every few seconds like a slideshow; the Videos tab does not — videos only change when a
visitor clicks the arrows or dots, so nothing interrupts a video someone is watching.

## Adding an image
1. Put the file in `images/` (jpg or png work well; keep files under ~1–2MB each so the page loads fast).
2. Open `manifest.json` and add a line like:
   ```json
   { "type": "image", "src": "/assets/gallery/images/your-file.jpg", "caption": "Your caption here" }
   ```

## Adding a video
1. Put the file in `videos/` (mp4/H.264 is the most widely supported format across browsers).
2. Add a line like:
   ```json
   { "type": "video", "src": "/assets/gallery/videos/your-file.mp4", "caption": "Your caption here" }
   ```
   Videos show playback controls (play/pause, volume, scrub bar) so visitors can watch at their own pace.

3. If a video doesn't play for some visitors, it's usually the file's encoding, not the site — export
   again with a standard/baseline H.264 profile (most phone cameras and editors like iMovie, Premiere,
   CapCut, and HandBrake do this by default). For maximum compatibility, you can also list a WebM version
   as a fallback:
   ```json
   { "type": "video", "sources": [
       { "src": "/assets/gallery/videos/your-file.mp4", "type": "video/mp4" },
       { "src": "/assets/gallery/videos/your-file.webm", "type": "video/webm" }
     ], "caption": "Your caption here" }
   ```
   The browser will pick whichever format it supports.

## Notes
- Order in `manifest.json` is the order items appear within their tab — reorder the lines to reorder either the Photos or Videos tab.
- The five images currently in `images/` are placeholder brand illustrations, not real photos — swap them out for actual photos of your seeds, outlets and process whenever you're ready, and remove their lines from `manifest.json` (or just overwrite the files, keeping the same names).
- If there are no videos listed yet, the Videos tab still shows and simply says "No videos yet" — it won't disappear or error out.
- There's no need to touch any other file — the gallery on the homepage reads `manifest.json` automatically.
