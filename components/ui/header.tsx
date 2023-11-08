interface IHeadingProps {
  title: string;
  description: string;
}

const Heading = ({ title, description }: IHeadingProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default Heading;
