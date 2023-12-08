interface AlbumCopyrightsProps {
  copyrights: SpotifyApi.CopyrightObject[];
}

const AlbumCopyrights: React.FC<AlbumCopyrightsProps> = ({ copyrights }) => {
  if (!copyrights) return null;

  const symbols = {
    C: "©",
    P: "℗",
  };

  return (
    <ul>
      {copyrights.map((copyright, i) => (
        <li key={i}>
          <span className="block text-xs">
            {symbols[copyright.type]} {copyright.text}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default AlbumCopyrights;
