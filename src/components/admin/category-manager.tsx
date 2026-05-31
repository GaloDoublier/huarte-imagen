"use client";

import { useState, FormEvent } from "react";
import { Plus, Trash2, Loader2, AlertCircle } from "lucide-react";
import { createCategory, deleteCategory } from "@/actions/categories";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Category {
  id: string;
  name: string;
  slogan?: string | null;
  description?: string | null;
}

interface CategoryManagerProps {
  categories: Category[];
  onCategoryUpdate: () => Promise<void>;
}

export function CategoryManager({ categories, onCategoryUpdate }: CategoryManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Estados para el formulario completo
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlogan, setNewCatSlogan] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setErrorMsg(null);
      resetForm();
    }
  };

  const resetForm = () => {
    setNewCatName("");
    setNewCatSlogan("");
    setNewCatDesc("");
  };

  const handleAddCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setErrorMsg(null);
    setIsAdding(true);
    
    // Le pasamos todos los datos al Server Action
    const result = await createCategory({ 
      name: newCatName,
      slogan: newCatSlogan,
      description: newCatDesc
    });
    
    if (result.success) {
      resetForm();
      await onCategoryUpdate();
    } else {
      setErrorMsg(result.error || "Error al crear la categoría.");
    }
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    setErrorMsg(null);
    setDeletingId(id);
    const result = await deleteCategory(id);
    
    if (result.success) {
      await onCategoryUpdate();
    } else {
      setErrorMsg(result.error || "Error al eliminar la categoría.");
    }
    setDeletingId(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="icon" className="shrink-0" title="Gestionar Categorías">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Gestionar Categorías</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 pr-2 py-4">
          
          {errorMsg && (
            <Alert variant="destructive" className="py-2 px-3">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="ml-2 text-sm">
                {errorMsg}
              </AlertDescription>
            </Alert>
          )}

          {/* Formulario de creación completo */}
          <form onSubmit={handleAddCategory} className="space-y-3 p-4 bg-secondary/20 rounded-lg border border-border/50">
            <h4 className="text-sm font-medium text-foreground">Crear Nueva Categoría</h4>
            
            <div className="space-y-2">
              <Input
                placeholder="Nombre * (ej: Maquillaje)"
                value={newCatName}
                onChange={(e) => {
                  setNewCatName(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                disabled={isAdding}
                className="bg-background"
              />
              <Input
                placeholder="Slogan (ej: Realza tu belleza)"
                value={newCatSlogan}
                onChange={(e) => setNewCatSlogan(e.target.value)}
                disabled={isAdding}
                className="bg-background"
              />
              <Textarea
                placeholder="Descripción para mostrar en la web..."
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                disabled={isAdding}
                rows={2}
                className="bg-background resize-none text-sm"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isAdding || !newCatName.trim()}>
              {isAdding ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Agregar Categoría"
              )}
            </Button>
          </form>

          {/* Lista de categorías existentes */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground mb-3">Categorías Existentes</h4>
            {categories.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4 border rounded-md border-dashed">
                No hay categorías cargadas
              </p>
            ) : (
              categories.map((cat) => (
                <div key={cat.id} className="flex items-start justify-between p-3 border rounded-md bg-background">
                  <div className="flex flex-col gap-1 pr-4">
                    <span className="text-sm font-semibold">{cat.name}</span>
                    {cat.slogan && (
                      <span className="text-xs text-muted-foreground italic">"{cat.slogan}"</span>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 shrink-0"
                    onClick={() => handleDelete(cat.id)}
                    disabled={deletingId === cat.id}
                  >
                    {deletingId === cat.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}