// Site-wide ambient background: three soft light blobs drifting slowly.
// Pure CSS animation (transform only), fixed behind all content.
export const Aurora = () => (
  <div className="aurora" aria-hidden="true">
    <span className="aurora-blob aurora-a"></span>
    <span className="aurora-blob aurora-b"></span>
    <span className="aurora-blob aurora-c"></span>
  </div>
);
