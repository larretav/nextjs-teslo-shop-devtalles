import { notFound } from "next/navigation";

type Props = {
  params: { id: string }
}

export default function CategoryIdPage({ params }: Props) {

  const { id } = params;

  // if (id === 'kids')
  //   notFound();


  return (
    <div>
      <h1>Category: {id}</h1>
    </div>
  );
}