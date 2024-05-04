import Swal, { type SweetAlertResult } from 'sweetalert2';

export async function avisoEditar(): Promise<SweetAlertResult> {
  return Swal.fire({
    title: "Editar usuário",
    text: "Esta ação não pode ser revertida",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, editar",
    cancelButtonText: "Cancelar",
  });
}


export async function avisoDeletar(): Promise<SweetAlertResult> {
    return Swal.fire({
      title: "Deletar usuário",
      text: "Esta ação não pode ser revertida",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar",
      cancelButtonText: "Cancelar",
    });
  }
  