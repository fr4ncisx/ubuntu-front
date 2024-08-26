import MicroentrepreneurshipCard from "../reusable-components/MicroentrepreneurshipCard";

const microentrepreneurships = [
  {
    title: "EcoSenda",
    subtitle: "Finca agroecológica",
    category: "Agroecología/Orgánicos/Alimentación saludable",
    location: "Tunuyán, Mendoza, Argentina",
    description:
      "Promueven un modelo de agricultura sostenible, protegiendo el medio ambiente, el agua y las semillas autóctonas. Cultivan frutas, verduras, plantas medicinales y crean derivados. Editan también contenidos educativos, gestionan un banco de semillas y comercializan o intercambian excedentes.",
    additionalInfo:
      "Nació del sueño de restaurar la salud y adoptar un estilo de vida ideal. Este proyecto familiar creció fundamentado en la permacultura, biodinámica y agroecología, comprometiéndose con la soberanía alimentaria, el bienestar, el regreso al campo, la venta directa y la dignidad de la vida campesina.",
    images: [
      "https://services.meteored.com/img/article/como-puedes-cultivar-tomates-en-el-huerto-con-estos-trucos-y-consejos-el-exito-esta-asegurado-1714389761318_1024.jpeg",
      "https://img.freepik.com/foto-gratis/tantas-verduras-campo_181624-18619.jpg?w=1380&t=st=1720303616~exp=1720304216~hmac=e6d2b17c3155d22a6958e23d5fec24d65fd6d5ef3cc04520f040f6d91eee86a9",
      "https://img.freepik.com/foto-gratis/caja-madera-llena-verduras-frescas_329181-8749.jpg?t=st=1720304044~exp=1720307644~hmac=41943469e090fa0e04726928bef56df651052517622737a08e72fe922ae92d15&w=1380",
    ],
  },
  {
    title: "EcoSenda",
    subtitle: "Finca agroecológica",
    category: "Agroecología/Orgánicos/Alimentación saludable",
    location: "Tunuyán, Mendoza, Argentina",
    description:
      "Promueven un modelo de agricultura sostenible, protegiendo el medio ambiente, el agua y las semillas autóctonas. Cultivan frutas, verduras, plantas medicinales y crean derivados. Editan también contenidos educativos, gestionan un banco de semillas y comercializan o intercambian excedentes.",
    additionalInfo:
      "Nació del sueño de restaurar la salud y adoptar un estilo de vida ideal. Este proyecto familiar creció fundamentado en la permacultura, biodinámica y agroecología, comprometiéndose con la soberanía alimentaria, el bienestar, el regreso al campo, la venta directa y la dignidad de la vida campesina.",
    images: [
      "https://services.meteored.com/img/article/como-puedes-cultivar-tomates-en-el-huerto-con-estos-trucos-y-consejos-el-exito-esta-asegurado-1714389761318_1024.jpeg",
      "https://img.freepik.com/foto-gratis/tantas-verduras-campo_181624-18619.jpg?w=1380&t=st=1720303616~exp=1720304216~hmac=e6d2b17c3155d22a6958e23d5fec24d65fd6d5ef3cc04520f040f6d91eee86a9",
      "https://img.freepik.com/foto-gratis/caja-madera-llena-verduras-frescas_329181-8749.jpg?t=st=1720304044~exp=1720307644~hmac=41943469e090fa0e04726928bef56df651052517622737a08e72fe922ae92d15&w=1380",
    ],
  },
];

const MicroentrepreneurshipPagePrueba = () => {
  return (
    <div>
      {microentrepreneurships.map((micro, index) => (
        <MicroentrepreneurshipCard
          key={index}
          title={micro.title}
          subtitle={micro.subtitle}
          category={micro.category}
          location={micro.location}
          description={micro.description}
          additionalInfo={micro.additionalInfo}
          images={micro.images}
        />
      ))}
    </div>
  );
};

export default MicroentrepreneurshipPagePrueba;
