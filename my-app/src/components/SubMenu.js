import React, { Component } from 'react'
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react'

export default class SubMenu extends Component {
  state = { activeItem: "Navegacion"};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  onItemClick = (e, { name }) => {
    // se llama al eventhandler recibido como parametro desde el componente App
    this.props.onLayerClick(name);

    this.props.onLastLayerClick(name);
  };

  onItemInteractionClick = (e, { name }) => {
    this.setState({ activeItem: name })

    this.props.onInteractionClick(name);
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu
        vertical
        style={{
          position: "absolute",
          zIndex: "99",
          top: "70px",
          left: "15px",
        }}
      >
        <Menu.Item>
          Interactuar
          <Menu.Menu>
            <Menu.Item
              name="Navegacion"
              active={activeItem === "Navegacion"}
              onClick={this.onItemInteractionClick}
            >
              Navegacion
            </Menu.Item>
            <Menu.Item
              name="Consulta"
              active={activeItem === "Consulta"}
              onClick={this.onItemInteractionClick}
            >
              Consulta
            </Menu.Item>
            <Menu.Item
              name="Distancias"
              active={activeItem === "Distancias"}
              onClick={this.onItemInteractionClick}
            >
              Medir Distancia
            </Menu.Item>
            <Menu.Item
              name="TrazarRuta"
              active={activeItem === "TrazarRuta"}
              onClick={this.onItemInteractionClick}
            >
              Trazar Ruta
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Dropdown item text="Inst. Publicas/Edificios">
          <Dropdown.Menu>
            <Dropdown.Item
              icon="hospital"
              text="Edificio de Salud"
              name="edificio_de_salud_IPS"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="taxi"
              text="Edificio de Seguridad"
              name="edificio_de_seguridad_IPS"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="building"
              text="Edificio Publico"
              name="edificio_publico_IPS"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="binoculars"
              text="Construcciones Turisticas"
              name="edif_construcciones_turisticas"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="volleyball ball"
              text="Deportes y Esparcimiento"
              name="edif_depor_y_esparcimiento"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="book"
              text="Educacion"
              name="edif_educacion"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="add"
              text="Religiosos"
              name="edif_religiosos"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="train"
              text="Ferroviarios"
              name="edificios_ferroviarios"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="building"
              text="Otras Edificaciones"
              name="otras_edificaciones"
              onClick={this.onItemClick}
            />
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Relieve">
          <Dropdown.Menu>
            <Dropdown.Item
              icon="map signs"
              text="Marcas y Señales"
              name="marcas_y_señales"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="chevron circle up"
              text="Puntos de Alturas"
              name="puntos_de_alturas_topograficas"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="stop circle outline"
              text="Puntos del Terreno"
              name="puntos_del_terreno"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="circle outline"
              text="Curvas de Nivel"
              name="curvas_de_nivel"
              onClick={this.onItemClick}
            />
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Hidrografia">
          <Dropdown.Menu>
            <Dropdown.Item
              icon="braille"
              text="Espejos de Agua"
              name="espejo_de_agua_hid"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="theme"
              text="Cursos de Agua"
              name="curso_de_agua_hid"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="dot circle"
              text="Isla"
              name="isla"
              onClick={this.onItemClick}
            />
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Obras y Actividades">
          <Dropdown.Menu>
            <Dropdown.Item
              icon="tree"
              text="Actividades Agropecuarias"
              name="actividades_agropecuarias"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="money bill alternate outline"
              text="Actividades Economicas"
              name="actividades_economicas"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="rss"
              text="obra_de_comunicación"
              name="edif_construcciones_turisticas"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="ship"
              text="Obra Portuaria"
              name="obra_portuaria"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="buromobelexperte"
              text="Muro Embalse"
              name="muro_embalse"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="bolt"
              text="Complejo de Energia"
              name="complejo_de_energia_ene"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="ship"
              text="Estructuras Portuarias"
              name="estructuras_portuarias"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="plane"
              text="Infraestructura Aeroportuaria"
              name="infraestructura_aeroportuaria_punto"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="bolt"
              text="Infraestructura Hidroelectrica"
              name="infraestructura_hidro"
              onClick={this.onItemClick}
            />
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Vegetacion">
          <Dropdown.Menu>
            <Dropdown.Item
              icon="tree"
              text="Vegetacion Arborea"
              name="veg_arborea"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="cloud"
              text="Vegetacion Arbustiva"
              name="veg_arbustiva"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="tencent weibo"
              text="Vegetacion Cultivos"
              name="veg_cultivos"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="tint"
              text="Vegetacion Hidrofila"
              name="veg_hidrofila"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="square outline"
              text="Vegetacion Suelo Desnudo"
              name="veg_suelo_desnudo"
              onClick={this.onItemClick}
            />
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Suelos">
          <Dropdown.Menu>
            <Dropdown.Item
              icon="snowflake outline"
              text="Suelo Congelado"
              name="sue_congelado"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="object ungroup"
              text="Suelo Consolidado"
              name="sue_consolidado"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="ship"
              text="Suelo Costero"
              name="sue_costero"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="servicestack"
              text="Suelo Hidromorfologico"
              name="sue_hidromorfologico"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="object ungroup outline"
              text="Suelo No Consolidado"
              name="sue_no_consolidado"
              onClick={this.onItemClick}
            />
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Limites Politicos">
          <Dropdown.Menu>
            <Dropdown.Item
              icon="pushed"
              text="Limite Politico Administrativo"
              name="limite_politico_administrativo_lim"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="expand"
              text="Localidades"
              name="localidades"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="slack hash"
              text="Provincias"
              name="provincias"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="users"
              text="Ejido"
              name="ejido"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="window minimize outline"
              text="Pais Limitrofe"
              name="pais_lim"
              onClick={this.onItemClick}
            />
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Transporte">
          <Dropdown.Menu>
            <Dropdown.Item
              icon="map signs"
              text="Señalizaciones"
              name="señalizaciones"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="road"
              text="Red Vial"
              name="red_vial"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="train"
              text="Red Ferroviaria"
              name="red_ferroviaria"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="xing"
              text="Vias Secundarias"
              name="vias_secundarias"
              onClick={this.onItemClick}
            />
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text="Otros">
          <Dropdown.Menu>
            <Dropdown.Item
              icon="bolt"
              text="Lineas de Conduccion Energeticas"
              name="lineas_de_conduccion_ene"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="mix"
              text="Puente Red Vial"
              name="puente_red_vial_puntos"
              onClick={this.onItemClick}
            />
            <Dropdown.Item
              icon="pallet"
              text="Salvado de Obstaculo"
              name="salvado_de_obstaculo"
              onClick={this.onItemClick}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
}
