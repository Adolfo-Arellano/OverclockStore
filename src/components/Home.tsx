import React from 'react'
import Banner from './Banner'
import BenefitsBar from './BenefitsBar'
import FeatureRow from './FeatureRow'
import Categories from './Categories'
import ProductsPreview from './ProductsPreview'
import { db } from '../data/db';

const Home = ({ addToCart }) => {
  const destacados = Array.isArray(db) ? db.slice(0, 4) : [];

  return (
    <>
      <Banner />
      <BenefitsBar />
      <FeatureRow
        eyebrow="HEADSETS PRO"
        title="Audio inmersivo para cada partida"
        desc="Drivers de alta fidelidad, micrófonos con cancelación de ruido y comodidad de larga duración."
        image="/img/Headset Gaming.png"
      />
      <FeatureRow
        reverse
        eyebrow="TECLADOS MECÁNICOS"
        title="Precisión low-profile y RGB dinámico"
        desc="Switches calibrados, construcción de aluminio y perfiles compactos para maximizar tu espacio."
        image="/img/Teclado Gaming.png"
      />
      <FeatureRow
        eyebrow="MICRÓFONOS"
        title="Tu voz, clara y profesional"
        desc="Capta tu voz con calidad de estudio y mantén tu setup minimalista."
        image="/img/Microfone.png"
      />
      <Categories />
      <ProductsPreview pCards={destacados} addToCart={addToCart} />
    </>
  )
}

export default Home