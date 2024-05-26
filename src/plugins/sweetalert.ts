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
  export async function avisoDeletarArea(): Promise<SweetAlertResult> {
    return Swal.fire({
      title: "Deletar área",
      text: "Esta ação não pode ser revertida",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar",
      cancelButtonText: "Cancelar",
    });
  }

  export async function avisoDeletarRedZone(): Promise<SweetAlertResult> {
    return Swal.fire({
      title: "Deletar Redzone",
      text: "Esta ação não pode ser revertida",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar",
      cancelButtonText: "Cancelar",
    });
  }


  export async function avisoVoltar(): Promise<SweetAlertResult> {
    return Swal.fire({
      title: "Deseja voltar para a tela de Listagem",
      text: "Esta ação não pode ser revertida",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, voltar",
      cancelButtonText: "Cancelar",
    });
  }
  
  export async function avisoLogout(): Promise<SweetAlertResult> {
    return Swal.fire({
      title: "Deseja Sair",
      text: "Esta ação não pode ser revertida",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, sair",
      cancelButtonText: "Cancelar",
    });
  }
  