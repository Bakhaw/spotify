interface AlbumReleaseDateProps {
  releaseDate: string;
}

const AlbumReleaseDate: React.FC<AlbumReleaseDateProps> = ({ releaseDate }) => {
  if (!releaseDate) return null;

  const formattedReleaseDate = new Date(releaseDate).toLocaleDateString(
    undefined,
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return <div className="text-sm">{formattedReleaseDate}</div>;
};

export default AlbumReleaseDate;
