// src/modules/empresas/components/EmpresaForm.tsx
import { useEffect } from "react";
import {
  useForm,
  FormProvider,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormSection,
  FormRow,
  RHFTextField,
} from "@/components/form";


import {
  empresaCreateSchema,
  empresaUpdateSchema,
  type EmpresaCreateFormValues,
  type EmpresaUpdateFormValues,
} from "../schemas";


import { useCreateEmpresa } from "../hooks/useCreateEmpresa";
import { useUpdateEmpresa } from "../hooks/useUpdateEmpresa";
import { useEmpresaById } from "../hooks/useEmpresaById";



interface Props {
  id?: number;
  readonly?: boolean;
}


export function EmpresaForm({
  id,
  readonly,
}: Props) {

  const isEdit = !!id;


  const createEmpresa = useCreateEmpresa();
  const updateEmpresa = useUpdateEmpresa();


  const {
    data: empresa,
  } = useEmpresaById(id);



const methods = useForm<
  EmpresaCreateFormValues | EmpresaUpdateFormValues
>({
  resolver: zodResolver(
    isEdit
      ? empresaUpdateSchema
      : empresaCreateSchema
  ),

    defaultValues: {

      razon_social: "",
      cuit: "",
      email: "",
      telefono: "",
      direccion: "",

      nombre: "",
      apellido: "",
      usuario_email: "",
      password: "",
    },
  });



  const {
    reset,
    handleSubmit,
  } = methods;



useEffect(() => {
  console.log("EDIT ID:", id);
  console.log("EMPRESA CARGADA:", empresa);

  if (empresa && isEdit) {
    reset({
      razon_social: empresa.razon_social,
      cuit: empresa.cuit,
      email: empresa.email ?? "",
      telefono: empresa.telefono ?? "",
      direccion: empresa.direccion ?? "",

      nombre: "",
      apellido: "",
      usuario_email: "",
      password: "",
    });
  }

}, [
  empresa,
  isEdit,
  reset,
  id,
]);



const onSubmit = async (
  values:
    | EmpresaCreateFormValues
    | EmpresaUpdateFormValues
) => {

    console.log(
      "SUBMIT EMPRESA",
      values
    );


    if (readonly) return;



if (isEdit && id) {

  const updateData = {
    razon_social: values.razon_social,
    cuit: values.cuit,
    email: values.email,
    telefono: values.telefono,
    direccion: values.direccion,
  };


  await updateEmpresa.mutateAsync({
    id,
    data: updateData,
  });

} else {

  await createEmpresa.mutateAsync(
    values as EmpresaCreateFormValues
  );

}

  };



  return (

    <FormProvider {...methods}>

      <Form
        onSubmit={
          handleSubmit(
            onSubmit,
            (errors) => {
              console.log(
                "ERRORES RHF",
                errors
              );
            }
          )
        }
      >


        <FormSection
          title="Datos de la Empresa"
          description="Información principal de la empresa."
        >

          <FormRow>

            <RHFTextField
              name="razon_social"
              label="Razón Social"
              placeholder="Razón Social"
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
              name="email"
              label="Email"
              type="email"
              placeholder="empresa@email.com"
              disabled={readonly}
            />


            <RHFTextField
              name="telefono"
              label="Teléfono"
              placeholder="3624..."
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


        </FormSection>


{!isEdit && (
        <FormSection
          title="Administrador"
          description="Se creará automáticamente el usuario administrador de la empresa."
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



          <FormRow>

            <RHFTextField
              name="usuario_email"
              label="Email de acceso"
              type="email"
              placeholder="admin@empresa.com"
              disabled={readonly}
            />


            <RHFTextField
              name="password"
              label="Contraseña"
              type="password"
              placeholder="********"
              disabled={readonly}
            />

          </FormRow>


        </FormSection>
)}


        {!readonly && (

          <div className="flex justify-end pt-6">

            <button
              type="submit"
              disabled={
                createEmpresa.isPending ||
                updateEmpresa.isPending
              }
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
            >
              {
                isEdit
                  ? "Actualizar Empresa"
                  : "Crear Empresa"
              }

            </button>

          </div>

        )}



      </Form>

    </FormProvider>

  );

}