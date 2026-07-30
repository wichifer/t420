// src/modules/clientes/components/ClienteFormFields.tsx

import {
  FormRow,
  FormSection,
  RHFTextField,
    RHFSwitchField,
 
} from "@/components/form";


interface Props {
  readonly?: boolean;
}


export function ClienteFormFields({
  readonly = false,
}: Props) {

  return (

    <div className="space-y-8">

      <FormSection
        title="Datos del Cliente"
        description="Información principal del cliente."
      >

        <FormRow>

          <RHFTextField
            name="nombre"
            label="Nombre"
            placeholder="Nombre"
            disabled={readonly}
          />


          <RHFTextField
            name="apellido"
            label="Apellido"
            placeholder="Apellido"
            disabled={readonly}
          />

        </FormRow>


        <FormRow columns={1}>

          <RHFTextField
            name="razon_social"
            label="Razón Social"
            placeholder="Empresa o comercio"
            disabled={readonly}
          />

        </FormRow>


        <FormRow>

          <RHFTextField
            name="documento"
            label="Documento"
            placeholder="DNI"
            disabled={readonly}
          />


          <RHFTextField
            name="cuit"
            label="CUIT"
            placeholder="20301234567"
            disabled={readonly}
          />

        </FormRow>


        <FormRow>

          <RHFTextField
            name="telefono"
            label="Teléfono"
            placeholder="Teléfono"
            disabled={readonly}
          />


          <RHFTextField
            name="email"
            label="Email"
            type="email"
            placeholder="cliente@email.com"
            disabled={readonly}
          />

        </FormRow>


        <FormRow columns={1}>

          <RHFTextField
            name="direccion"
            label="Dirección"
            placeholder="Dirección"
            disabled={readonly}
          />

        </FormRow>


<RHFSwitchField
  name="es_consumidor_final"
  label="Consumidor Final"
  disabled={readonly}
/>


      </FormSection>


    </div>

  );

}