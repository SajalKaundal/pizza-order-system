import DessertCard from '@/app/components/Cards/DessertCard'

export default function Page(){
  const products = [
    {
      image:
        "https://assets.prebuiltui.com/images/components/card/card-lamp-image.png",
      name: "Cylindrical Modern Table Lamp",
      description: "this is a pizza",
      variants: [
        {
          size: "Small",
          price: 199,
        },
        { size: "Medium", price: 299 },
        { size: "Large", price: 399 },
      ],
    },
    {
      image:
        "https://assets.prebuiltui.com/images/components/card/card-watch-image.png",
      name: "Modern Smart Watch for Men/women",
      price: "$48.00",
      oldPrice: "$59.00",
    },
    {
      image:
        "https://assets.prebuiltui.com/images/components/card/card-bag-image.png",
      name: "Luxury and modern ladies bag",
      price: "$24.00",
      oldPrice: "$59.00",
    },
    {
      image:
        "https://assets.prebuiltui.com/images/components/card/card-speaker-image.png",
      name: "Modern Smart AI Speaker",
      price: "$29.00",
      oldPrice: "$59.00",
    },
  ];
  return(<div className="h-140 overflow-x-hidden scrollbar-thin">
    <section className="bg-white flex py-16">
      <div className="flex flex-wrap items-stretch justify-center gap-5">
        {products.map((item, index) => (
    <DessertCard key={index}/>))}
    </div>
    </section>
  </div>)
}