
type AboutProps = {
  content: {
    title: string;
    experience: string;
    description: string;
  };
};

export default function About({ content }: AboutProps) {
  return (
    <section id="about">
      <h2>{content.title}</h2>
      <p>{content.experience}</p>
      <p>{content.description}</p>
    </section>
  );
}
