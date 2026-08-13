import { useState } from "react";
import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import {
  useCreateRepairNote,
  useRepairNotes,
} from "../hooks";

type Props = {
  repairRequestId: string;
};

export default function RepairNotesSection({
  repairRequestId,
}: Props) {
  const [note, setNote] = useState("");

  const {
    data: notes,
    isLoading,
    isError,
  } = useRepairNotes(repairRequestId);

  const createNote = useCreateRepairNote(
    repairRequestId
  );

  const handleAddNote = () => {
    const trimmedNote = note.trim();

    if (!trimmedNote) {
      return;
    }

    createNote.mutate(
      {
        note: trimmedNote,
      },
      {
        onSuccess: () => {
          setNote("");
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Repair Notes
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Existing Notes */}
        <div className="space-y-3">
          {isLoading && (
            <p className="text-sm text-muted-foreground">
              Loading repair notes...
            </p>
          )}

          {isError && (
            <p className="text-sm text-destructive">
              Failed to load repair notes.
            </p>
          )}

          {!isLoading &&
            !isError &&
            notes?.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No repair notes yet.
              </p>
            )}

          {notes?.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border bg-muted/30 p-4"
            >
              <p className="whitespace-pre-wrap text-sm">
                {item.note}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Add Note */}
        <div className="space-y-3 border-t pt-4">
          <Textarea
            placeholder="Write a repair note..."
            value={note}
            onChange={(event) =>
              setNote(event.target.value)
            }
            disabled={createNote.isPending}
            rows={4}
          />

          <Button
            onClick={handleAddNote}
            disabled={
              !note.trim() ||
              createNote.isPending
            }
          >
            {createNote.isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="mr-2 size-4" />
                Add Note
              </>
            )}
          </Button>

          {createNote.isError && (
            <p className="text-sm text-destructive">
              Failed to add repair note.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}